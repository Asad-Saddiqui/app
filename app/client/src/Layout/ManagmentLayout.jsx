import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { ContainerOutlined, CreditCardOutlined, CustomerServiceOutlined, DashboardOutlined, FileOutlined, ReconciliationOutlined, SettingOutlined, ShopOutlined, TagOutlined, UserOutlined } from '@ant-design/icons';
import MainHeader from '../Components/MainLayout/MainHeader';
import { Link, Outlet } from 'react-router-dom';

const { Content, Sider } = Layout;

const ManagmentLayout = () => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    const items = [
        {
            key: '',
            icon: <DashboardOutlined />,
            label: <Link to={''}>{'Dashboard'}</Link>,
        },
        {
            key: 'products',
            icon: <ContainerOutlined />,
            label: 'Products',
            children: [
                {
                    key: 'all-products',
                    label: <Link to={'/admin/products'}>{'All Products'}</Link>,
                },
                {
                    key: 'add-product',
                    label: <Link to={'/admin/products/add'}>{'Add Product'}</Link>,
                },
                {
                    key: 'categories',
                    label: <Link to={'/admin/products/categories'}>{'Categories'}</Link>,
                },
                {
                    key: 'tags',
                    label: <Link to={'/admin/products/tags'}>{'Tags'}</Link>,
                },
            ],
        },
        {
            key: 'orders',
            icon: <ReconciliationOutlined />,
            label: 'Orders',
            children: [
                {
                    key: 'all-orders',
                    label: <Link to={'/admin/orders'}>{'All Orders'}</Link>,
                },
                {
                    key: 'pending-orders',
                    label: <Link to={'/admin/orders/pending'}>{'Pending Orders'}</Link>,
                },
                {
                    key: 'completed-orders',
                    label: <Link to={'/admin/orders/completed'}>{'Completed Orders'}</Link>,
                },
                {
                    key: 'returns',
                    label: <Link to={'/admin/orders/returns'}>{'Returns'}</Link>,
                },
            ],
        },
        {
            key: 'customers',
            icon: <UserOutlined />,
            label: <Link to={'/admin/customers'}>{'Customers'}</Link>,
        },
        {
            key: 'sales',
            icon: <CreditCardOutlined />,
            label: 'Sales',
            children: [
                {
                    key: 'sales-report',
                    label: <Link to={'/admin/sales/report'}>{'Sales Report'}</Link>,
                },
                {
                    key: 'transactions',
                    label: <Link to={'/admin/sales/transactions'}>{'Transactions'}</Link>,
                },
            ],
        },


    ];

    return (
        <Layout>
            <MainHeader onToggleSidebar={toggleSidebar} Dashboarname={"Managment"} />
            <Layout style={{ overflow: "hidden", height: `calc( 100vh - 64px )`, marginTop: '64px' }} className='managment_sidebar'>
                <Sider
                    width={200}
                    collapsible
                    collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)}
                    breakpoint="xl"
                    style={{
                        overflow: 'hidden',
                        height: `calc(100vh - 64px)`,
                        position: 'relative',
                        // backgroundColor: "#eb2f96"
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
                            minHeight: '100%',
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

export default ManagmentLayout;
