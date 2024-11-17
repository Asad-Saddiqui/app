import {
    PlusOutlined, EditOutlined, DeleteOutlined,
    CheckCircleFilled, CloseCircleFilled,
    LockOutlined
} from '@ant-design/icons';
import {
    Button, Divider, Flex, Tag, Tooltip, Typography, Modal, Row, Col, Table, Drawer
} from 'antd';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import AddUser from '../../Components/Forms/AddUser';
import { get_user, get_user_by_id } from '../../App/Slice/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import AssignPermission from '../../Components/Permission/AssignPermission';

function Users() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const dispatch = useDispatch();
    const { users, loading } = useSelector(state => state.User);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const onClose = () => {
        setIsModalVisible(false);
    };
    // user._id
    const handlePermissionClick = (user) => {
        setSelectedUser(user); // Store selected user
        Swal.fire({
            title: 'Enter Password',
            input: 'password',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Submit',
            cancelButtonText: 'Cancel',
            preConfirm: (password) => {
                // Here you can check the password (e.g., call an API)
                if (!password) {
                    Swal.showValidationMessage('Please enter a password');
                }
                return password;
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const password = result.value;

                // Call your password verification API here
                const isPasswordValid = true;
                if (isPasswordValid) {
                    // Dispatch get_user_by_id if password is correct
                    dispatch(get_user_by_id(user._id));
                    setDrawerVisible(true);
                    Swal.fire({
                        icon: 'success',
                        title: 'Password Accepted',
                        text: 'You have access to permissions.',
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Invalid Password',
                        text: 'The password you entered is incorrect.',
                    });
                }
            }
        });
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'username',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Roles',
            dataIndex: 'roles',
            key: 'roles',
            render: (roles) => (
                <>
                    {roles.map(role => <Tag bordered={false} key={role} color='success'>{role}</Tag>)}
                </>
            )
        },
        {
            title: 'Verified',
            dataIndex: 'isVerified',
            key: 'verified',
            render: (verified) => (
                <Tooltip title={verified ? 'Verified' : 'Not Verified'}>
                    {verified ? (
                        <CheckCircleFilled style={{ color: 'green', fontSize: '18px' }} />
                    ) : (
                        <CloseCircleFilled style={{ color: 'red', fontSize: '18px' }} />
                    )}
                </Tooltip>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div>
                    <Tooltip title="Edit">
                        <Button
                            type="link"
                            icon={<EditOutlined style={{ fontSize: '18px' }} />}
                        />
                    </Tooltip>
                    <Tooltip title="Delete">
                        <Button
                            type="link"
                            icon={<DeleteOutlined style={{ fontSize: '18px' }} />}
                            danger
                        />
                    </Tooltip>
                    <Tooltip title="Permissions">
                        <Button
                            type="link"
                            icon={<LockOutlined style={{ fontSize: '18px', color: "black" }} />}
                            onClick={() => handlePermissionClick(record)} // Pass record to handler
                        />
                    </Tooltip>
                </div>
            ),
        },
    ];

    useEffect(() => {
        dispatch(get_user());
    }, [dispatch]);

    return (
        <>
            <AddUser isVisible={isModalVisible} onClose={onClose} />
            <Drawer
                title={`Permissions for ${selectedUser?.username}`}
                placement="bottom"
                closable={true}
                onClose={() => setDrawerVisible(false)}
                open={drawerVisible}
                width={800}
                height="90%"
            >
                <AssignPermission />


            </Drawer>
            <div style={{ backgroundColor: 'white', width: '100%', height: '100%', padding: '24px 24px' }}>
                <Flex justify="space-between" align="center">
                    <Typography.Title level={4}>Users</Typography.Title>
                    <Button
                        type="primary"
                        style={{ fontWeight: '800', letterSpacing: '2px', fontSize: '17px' }}
                        onClick={showModal}
                    >
                        <PlusOutlined /> Add User
                    </Button>
                </Flex>
                <Table
                    columns={columns}
                    dataSource={users}
                    loading={loading}
                    style={{ marginTop: '40px', fontSize: '22px' }}
                    pagination={{ pageSize: 5 }}
                />
            </div>
        </>
    );
}

export default Users;
