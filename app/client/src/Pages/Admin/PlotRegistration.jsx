import React, { useEffect, useState } from 'react';
import { Button, Drawer, Input, Table, Space, Dropdown, Menu, Typography, Tag, Badge, Tabs } from 'antd';
import { EditFilled, DeleteFilled, DownOutlined, MoreOutlined, EyeFilled } from '@ant-design/icons';
import AddPlot from '../../Components/Forms/AddPlot';
import { useDispatch, useSelector } from "react-redux";
import { get_phases } from '../../App/Slice/phaseSlice';
import { get_Owners } from '../../App/Slice/ownerSlice';
import { get_MemberShip, get_MemberShip_byId } from '../../App/Slice/membershipSlice';
import MemberShipPreview from '../../Components/Tabs/MemberShipPreview';
import PrintDataModal from '../../Components/View/PrintDataModal';
import { get_Charges } from '../../App/Slice/chargesSlice';
import CreateCharges from '../../Components/Forms/CreateCharges';
import TabPane from 'antd/es/tabs/TabPane';
import PlotAllocationTable from '../../Components/Tabs/ImportExcelMembership';


const App = () => {
    const { memberships, loading } = useSelector(state => state.Membership);
    const [open, setOpen] = useState(false);
    const [detailDrawer, setDetailDrawer] = useState(false);
    const [detailDrawer2, setDetailDrawer2] = useState(false);

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [printModalVisible, setPrintModalVisible] = useState(false); // State 
    const [printData, setPrintData] = useState([]); // State for the data to print
    const [isOpen, setIsOpen] = useState(false)

    const dispatch = useDispatch();

    const showDrawer = () => {
        dispatch(get_phases());
        dispatch(get_Owners());
        setOpen(true);
    };

    useEffect(() => {
        dispatch(get_MemberShip());
    }, [dispatch]);

    const actionsMenu = (record, index) => (
        <Menu>

            <Menu.Item key="view" onClick={() => {
                dispatch(get_MemberShip_byId(record._id))
                dispatch(get_Charges(record._id))
                setDetailDrawer(true)
            }}>
                <EyeFilled style={{ color: 'green' }} /> View Details
            </Menu.Item>
        </Menu>
    );
    const statusColorMap = {
        'Draft': 'default',
        'Submitted to Accounts': 'blue',
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
    };
    const columns = [
        {
            title: 'Old ID',
            dataIndex: 'oldMembershipId',
            key: 'oldMembershipId',
            // width: 100,
            fixed: 'left',
        },
        {
            title: 'New ID',
            dataIndex: 'newMembershipId',
            key: 'newMembershipId',
            // width: 100,
        },
        {
            title: 'Phase',
            dataIndex: 'phase',
            key: 'phase',
            // width: 100,
            render: (text, record) => record.phase.phase_name,
        },
        {
            title: 'Block',
            dataIndex: 'block',
            key: 'block',
            // width: 100,
            render: (text, record) => record.block.block_name,
        },
        // {
        //     title: 'Type',
        //     dataIndex: "purpose",
        //     key: 'purpose',
        //     width: 110,
        // },
        {
            title: 'Property',
            dataIndex: "property",
            key: 'property',
            width: 110,
            render: (text) => text?.charAt(0).toUpperCase() + text?.slice(1),
        },
        {
            title: 'Status',
            dataIndex: "status",
            key: 'status',
            fixed: 'right',
            render: (status) => (<>
                <Tag color={statusColorMap[status] || 'default'}>
                    {status}
                </Tag>

            </>),
        },
        {
            title: 'Actions',
            key: 'actions',
            fixed: 'right', // Fix this column to the right
            width: 100,
            render: (_, record, index) => (
                <Space size="middle">
                    <Dropdown overlay={actionsMenu(record, index)} placement='bottomRight' trigger={['click']}>
                        <Button type='text'>
                            <MoreOutlined style={{ fontWeight: "bold", fontSize: "15px" }} />
                        </Button>
                    </Dropdown>
                </Space>
            ),
        },
    ];

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedKeys, selectedRows) => {
            setSelectedRowKeys(selectedKeys);
            console.log('Selected row keys:', selectedKeys);
            console.log('Selected rows:', selectedRows);
        },
    };

    const onRowClick = (record) => {
        const key = record._id;
        const newSelectedRowKeys = selectedRowKeys.includes(key)
            ? selectedRowKeys.filter(k => k !== key) // Deselect if already selected
            : [...selectedRowKeys, key]; // Select if not selected
        setSelectedRowKeys(newSelectedRowKeys);
        console.log('Selected row keys after click:', newSelectedRowKeys);
    };

    return (
        <>
            <AddPlot open={open} setOpen={setOpen} />

            <Drawer
                width="90%"
                closable={false}
                onClose={() => setDetailDrawer(false)}
                open={detailDrawer}
            >
                <MemberShipPreview />
            </Drawer>
            <Drawer
                width="90%"
                closable={false}
                onClose={() => setDetailDrawer2(false)}
                open={detailDrawer2}
            >
                <Tabs>

                    <TabPane tab="Import Data" key={"1"}>
                        <PlotAllocationTable />
                    </TabPane>
                </Tabs>
            </Drawer >
            <CreateCharges isOpen={isOpen} onClose={() => setIsOpen(false)} title={"Apply  Charges"} installment={false} selectedRowKeys={selectedRowKeys} />

            <PrintDataModal
                visible={printModalVisible}
                onClose={() => setPrintModalVisible(false)}
                data={printData} // Pass the selected data for printing
            />

            <div style={{ backgroundColor: 'white', width: '100%', height: '100%', padding: '24px 24px' }}>
                <Typography.Title level={4}>Member  Ship</Typography.Title>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <div style={{ width: "400px" }}>
                        <Input type='text' placeholder='Search here...' />
                    </div>
                    <div>
                        <Space>
                            {/* <Button type="text" style={{ backgroundColor: "blue", color: "white" }} onClick={() => setDetailDrawer(true)}>
                                Export Data
                            </Button> */}


                            <Button type="text" disabled={selectedRowKeys.length < 1} style={{ backgroundColor: "blue", color: "white" }} onClick={() => {
                                const selectedData = memberships.filter(membership => selectedRowKeys.includes(membership._id));
                                setPrintModalVisible(true);
                                setPrintData(selectedData)
                            }} >
                                Print
                            </Button>
                            <Button type="text" style={{ backgroundColor: "blue", color: "white" }} onClick={() => setDetailDrawer2(true)}>
                                Import Data
                            </Button>
                            {memberships &&
                                <Button type="primary" disabled={selectedRowKeys.length < 1} style={{ backgroundColor: "blue", color: "white" }} onClick={() => setIsOpen(true)} >
                                    Create Charges
                                </Button>}
                            <Button type="primary" onClick={showDrawer}>
                                Add Membership
                            </Button>
                        </Space>
                    </div>
                </div>
                <Table
                    columns={columns}
                    dataSource={memberships}
                    rowKey="_id"
                    style={{ marginTop: 20 }}
                    loading={loading.memberships}
                    pagination={false}
                    scroll={{ x: 'max-content' }} // Set fixed height for scrolling
                    rowSelection={rowSelection}
                />
            </div >
        </>
    );
};

export default App;
