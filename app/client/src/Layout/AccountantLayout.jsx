import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { ContainerOutlined, DashboardOutlined } from '@ant-design/icons';
import MainHeader from '../Components/MainLayout/MainHeader';
import { Link, Outlet } from 'react-router-dom';

const { Content, Sider } = Layout;

const AccountantLayout = () => {
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
            key: 'file',
            icon: <ContainerOutlined />,
            label: <Link to={'registration/plot-transfer'}>File Transfer</Link>,
        },
    ];

    return (
        <Layout>
            <MainHeader onToggleSidebar={toggleSidebar} Dashboarname={"Accountant"} />
            <Layout style={{ overflow: "hidden", height: `calc( 100vh - 64px )`, marginTop: '64px' }} className='managment_sidebar'>
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

export default AccountantLayout;
