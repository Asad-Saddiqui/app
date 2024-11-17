import React, { useEffect, useRef, useState } from 'react';
import { Button, Typography, Tag, Space, Input, Flex } from 'antd';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
import { get_MemberShip, get_MemberShip_byId } from '../../App/Slice/membershipSlice';
import { get_Owners } from '../../App/Slice/ownerSlice';
import TransferModal from '../../Components/Forms/TransferModal';
import { FetchApplicationForm } from '../../App/Slice/transferSlice';
import TransferForm from '../../Components/View/TransferForm';
import ReactToPrint from 'react-to-print';

const PlotTransfer = () => {
    const { memberships, loading } = useSelector(state => state.Membership);
    const [dataSource, setDataSource] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [transferModalVisible, setTransferModalVisible] = useState(false);
    const [selectedMembership, setSelectedMembership] = useState(null);
    const [searchTerm, setSearchTerm] = useState(""); // State for search term
    const componentRef = useRef();
    const dispatch = useDispatch();

    const handleTransferClick = () => {
        dispatch(get_Owners());
        setTransferModalVisible(true);
    };

    useEffect(() => {
        dispatch(get_MemberShip());
    }, [dispatch]);

    useEffect(() => {
        if (memberships && memberships.length > 0) {
            const formattedData = memberships.map((membership, index) => ({
                id: membership._id,
                srNo: index + 1,
                newMembershipId: membership.newMembershipId,
                oldMembershipId: membership.oldMembershipId,
                phase: membership.phase.phase_name,
                block: membership.block.block_name,
                status: membership.status,
                landSize: membership.landSize,
                landUnit: membership.landUnit,
                cost: membership.cost,
                address: membership.address,
                plotNo: membership.plotNo,
                owner: membership.owners.map(owner => owner.owner.ownerName).join(", "),
                cnic: membership.owners.map(owner => owner.owner.cnic).join(", "),
                share: membership.owners.map(owner => owner.share).join(", "),
                transferCount: membership.transferCount,
                transferNo: membership.transferNo,

            }));
            setDataSource(formattedData);
            setFilteredData(formattedData); // Initialize filtered data
        }
    }, [memberships]);

    useEffect(() => {
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        const filtered = dataSource.filter(item =>
            Object.values(item).some(value =>
                value && value.toString().toLowerCase().includes(lowercasedSearchTerm)
            )
        );
        setFilteredData(filtered);
    }, [searchTerm, dataSource]);

    const statusColorMap = {
        'Draft': 'default',
        'Submitted to Manager': 'blue',
        'Under Review by Accounts': 'orange',
        'Approved by Accounts': 'green',
        'Rejected by Accounts': 'red',
        'Under Review by Manager': 'orange',
        'Approved by Manager': 'green',
        'Rejected by Manager': 'red',
        'Under Final Review by Admin': 'orange',
        'Rejected by Admin': 'red',
        'Transfer Completed': 'green',
        'Closed': 'purple',
        'Open': 'gold',
        'Pending': 'processing',

    };

    const columns = [
        { field: 'srNo', headerName: 'Sr. No', flex: 1, },
        { field: 'oldMembershipId', headerName: 'Old ID', flex: 1, },
        { field: 'newMembershipId', headerName: 'New ID', flex: 1, },
        { field: 'owner', headerName: 'Owner', flex: 1, },
        { field: 'cnic', headerName: 'CNIC', flex: 1, },
        { field: 'share', headerName: 'Share', flex: 1, },
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
            renderCell: (params) => (
                <Tag color={statusColorMap[params.value] || 'default'}>
                    {params.value}
                </Tag>
            ),
        },

        {
            field: 'print',
            headerName: 'Print',
            flex: 1,
            renderCell: (params) => (
                <Space>
                    <ReactToPrint
                        key="print"
                        onBeforeGetContent={() => {
                            // Fetch data or set the content state before printing
                            return new Promise((resolve) => {
                                dispatch(FetchApplicationForm({ id: params.row.transferCount, fileId: params.row.id })).then(() => {
                                    resolve(); // Ensures print waits until the data fetch is complete
                                });
                            });
                        }}
                        trigger={() => < Button type="primary"
                            disabled={params.row.status != 'Pending' ? true : false} > Print</Button>
                        }
                        content={() => componentRef.current}
                    />
                </Space >
            ),
        },
    ];

    return (
        <div style={{ height: 600, width: '100%' }}>
            <TransferForm componentRef={componentRef} />
            <TransferModal
                visible={transferModalVisible}
                setTransferModalVisible={setTransferModalVisible}
                selectedMembership={selectedMembership}
            />
            <Typography.Title level={4}>Plot Transfer Management</Typography.Title>
            <Flex justify='space-between'>
                <Input
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ marginBottom: 16, width: '300px' }}
                />
                <Button type='primary' onClick={handleTransferClick}>Transfer File</Button>


            </Flex>
            <DataGrid
                rows={filteredData}
                columns={columns}
                loading={loading.memberships}
                pageSize={50}
                rowsPerPageOptions={[10, 20, 200]}
            // autoHeight
            />
        </div>
    );
};

export default PlotTransfer;
