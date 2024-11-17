import {
    PlusOutlined, EditOutlined, DeleteOutlined, EnvironmentOutlined
} from '@ant-design/icons';
import {
    Button, Divider, Input, Table, Tooltip, Typography, Spin, Flex
} from 'antd';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import AddPhase from '../../Components/Forms/AddPhase';
import { useDispatch, useSelector } from "react-redux";
import { add_Phase, delete_phase_by_id, get_phases } from '../../App/Slice/phaseSlice';
import { checkAccess } from '../../utils/helper';
import Cookies from "js-cookie";
function Branch() {
    const dispatch = useDispatch();
    const isAccessAdd = checkAccess(Cookies, "DataEntry", "Add")
    const isAccessDelete = checkAccess(Cookies, "DataEntry", "Delete")
    const isAccessEdit = checkAccess(Cookies, "DataEntry", "Edit")

    const { loading: phaseLoading, phases } = useSelector(state => state.Phase);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentBranch, setCurrentBranch] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPhases = async () => {
            setLoading(true);
            try {
                await dispatch(get_phases({ query: searchQuery })).unwrap();
            } catch (error) {
                console.error('Error fetching phases:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPhases();
    }, [dispatch, searchQuery]);

    const showModal = () => {
        setIsEditMode(false);
        setCurrentBranch(null);
        setIsModalVisible(true);
    };

    const showEditModal = (record) => {
        setIsEditMode(true);
        setCurrentBranch(record);
        setIsModalVisible(true);
    };

    const handleDelete = async (record) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    setLoading(true);
                    const response = await dispatch(delete_phase_by_id(record._id)).unwrap();
                    if (response.status === 200) {
                        await dispatch(get_phases({ query: searchQuery })).unwrap();
                        Swal.fire('Deleted!', 'Phase has been deleted.', 'success');
                    }
                } catch (error) {
                    Swal.fire({
                        title: 'Error!',
                        text: error.message || 'Failed to delete the phase. Please try again.',
                        icon: 'error',
                        confirmButtonText: 'Ok',
                    });
                } finally {
                    setLoading(false);
                }
            }
        });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value); // Update search query
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'phase_name',
            key: 'name',
        },
        {
            title: 'Location',
            dataIndex: 'phase_location',
            key: 'location',
            render: (text) => (
                <a href={`https://maps.google.com/?q=${text}`} target="_blank" rel="noopener noreferrer">
                    <EnvironmentOutlined /> {text}
                </a>
            ),
        },
        {
            title: (!isAccessEdit && !isAccessDelete ? "" : "Action"),
            key: 'action',
            render: (_, record) => (
                <div>
                    {isAccessEdit &&
                        <Tooltip title="Edit">
                            <Button
                                type="link"
                                icon={<EditOutlined style={{ fontSize: '18px' }} />}
                                onClick={() => showEditModal(record)}
                            />
                        </Tooltip>
                    }


                    {isAccessDelete &&
                        <Tooltip title="Delete">
                            <Button
                                type="link"
                                icon={<DeleteOutlined style={{ fontSize: '22px' }} />}
                                danger
                                onClick={() => handleDelete(record)}
                            />
                        </Tooltip>
                    }
                </div>
            ),
        },
    ];

    return (
        <div style={{ backgroundColor: 'white', width: '100%', height: '100%', padding: '24px 24px' }}>
            <Typography.Title level={4}>Phase</Typography.Title>
            <Divider />
            <Flex justify="space-between" align="center">
                <div style={{ width: '50%' }}>
                    <Input
                        placeholder="Search Phase"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        style={{ width: '300px', height: '48px' }}
                    />
                </div>
                {isAccessAdd &&
                    <div>
                        <Button
                            type="primary"
                            style={{ fontWeight: '800', letterSpacing: '2px', fontSize: '17px' }}
                            onClick={showModal}
                        >
                            <PlusOutlined /> Add Phase
                        </Button>
                    </div>
                }
            </Flex>

            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
                    <Spin size="large" />
                </div>
            ) : (
                <Table
                    columns={columns}
                    dataSource={phases}
                    style={{ marginTop: '40px', fontSize: '22px' }}
                    pagination={{ pageSize: 5 }}
                />
            )}

            {isModalVisible && (
                <AddPhase
                    isEditMode={isEditMode}
                    currentBranch={currentBranch}
                    onClose={handleCancel}
                    fetchPhases={async () => await dispatch(get_phases({ query: searchQuery })).unwrap()}
                />
            )}
        </div>
    );
}

export default Branch;
