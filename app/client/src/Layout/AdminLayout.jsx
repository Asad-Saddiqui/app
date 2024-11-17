import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { ContainerOutlined, CreditCardOutlined, CustomerServiceOutlined, DashboardOutlined, FileOutlined, ReconciliationOutlined, SettingOutlined, ShopOutlined, TagOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import MainHeader from '../Components/MainLayout/MainHeader';
import { Link, Outlet } from 'react-router-dom';
import Cookies from "js-cookie";
const { Content, Sider } = Layout;


const AdminLayout = () => {
    
    const [collapsed, setCollapsed] = useState(false);
    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    useEffect(() => {
    
    }, [])

    const items = [
        {
            key: '',
            icon: <DashboardOutlined />,
            label: <Link to={''}>{'Dashboard'}</Link>,
        },
        {
            key: 'file',
            icon: <TagOutlined />,
            label: <Link to={'registration/plot-transfer'}>{'File Transfer'}</Link>,
        },
        // 
        {
            key: 'User',
            icon: <UserAddOutlined />,
            label: 'User',
            children: [
                {
                    key: 'User',
                    label: <Link to={'/admin/users'}>{'All Users'}</Link>,
                },
                // {
                //     key: 'add-product',
                //     label: <Link to={'/admin/products/add'}>{'Add Branch'}</Link>,
                // },
                // {
                //     key: 'categories',
                //     label: <Link to={'/admin/products/categories'}>{'Categories'}</Link>,
                // },
                // {
                //     key: 'tags',
                //     label: <Link to={'/admin/products/tags'}>{'Tags'}</Link>,
                // },
            ],
        },
        // {
        //     key: 'orders',
        //     icon: <ReconciliationOutlined />,
        //     label: 'Orders',
        //     children: [
        //         {
        //             key: 'all-orders',
        //             label: <Link to={'/admin/orders'}>{'All Orders'}</Link>,
        //         },
        //         {
        //             key: 'pending-orders',
        //             label: <Link to={'/admin/orders/pending'}>{'Pending Orders'}</Link>,
        //         },
        //         {
        //             key: 'completed-orders',
        //             label: <Link to={'/admin/orders/completed'}>{'Completed Orders'}</Link>,
        //         },
        //         {
        //             key: 'returns',
        //             label: <Link to={'/admin/orders/returns'}>{'Returns'}</Link>,
        //         },
        //     ],
        // },
        // {
        //     key: 'customers',
        //     icon: <UserOutlined />,
        //     label: <Link to={'/admin/customers'}>{'Customers'}</Link>,
        // },
        // {
        //     key: 'sales',
        //     icon: <CreditCardOutlined />,
        //     label: 'Sales',
        //     children: [
        //         {
        //             key: 'sales-report',
        //             label: <Link to={'/admin/sales/report'}>{'Sales Report'}</Link>,
        //         },
        //         {
        //             key: 'transactions',
        //             label: <Link to={'/admin/sales/transactions'}>{'Transactions'}</Link>,
        //         },
        //     ],
        // },


        // {
        //     key: 'inventory',
        //     icon: <ShopOutlined />,
        //     label: <Link to={'/admin/inventory'}>{'Inventory'}</Link>,
        // },
        // {
        //     key: 'reports',
        //     icon: <FileOutlined />,
        //     label: 'Reports',
        //     children: [
        //         {
        //             key: 'sales-report',
        //             label: <Link to={'/admin/reports/sales'}>{'Sales Report'}</Link>,
        //         },
        //         {
        //             key: 'inventory-report',
        //             label: <Link to={'/admin/reports/inventory'}>{'Inventory Report'}</Link>,
        //         },
        //         {
        //             key: 'customer-report',
        //             label: <Link to={'/admin/reports/customers'}>{'Customer Report'}</Link>,
        //         },
        //     ],
        // },
        // {
        //     key: 'settings',
        //     icon: <SettingOutlined />,
        //     label: <Link to={'/admin/settings'}>{'Settings'}</Link>,
        // },
        // {
        //     key: 'support',
        //     icon: <CustomerServiceOutlined />,
        //     label: <Link to={'/admin/support'}>{'Support'}</Link>,
        // },
    ];

    return (
        <Layout>
            <MainHeader onToggleSidebar={toggleSidebar} Dashboarname={"Admin"} />
            <Layout style={{ overflow: "hidden", height: `calc( 100vh - 64px )`, marginTop: '64px' }} className='admin_sidebar'>
                <Sider
                    width={200}
                    collapsible
                    collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)}
                    breakpoint="lg"
                    style={{
                        overflow: 'hidden',
                        height: `calc(100vh - 64px)`,
                        position: 'relative',
                    }}
                >
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['dashboard']}
                        style={{
                            borderRight: 0,
                            height: `calc(100vh - 128px)`,
                            overflow: 'auto',
                            paddingBottom: '20px',
                            paddingTop: '20px',
                        }}
                        items={items}
                    />
                </Sider>

                <Layout
                    style={{
                        overflowX: 'hidden',
                        overflowY: 'auto',
                        backgroundColor: 'transparent',
                    }}
                >
                    <Content
                        style={{
                            margin: 0,
                            minHeight: 'auto',
                            padding: '24px',
                            borderRadius: '6px',
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;
