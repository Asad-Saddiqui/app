import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { ContainerOutlined, CreditCardOutlined, CustomerServiceOutlined, DashboardOutlined, FileOutlined, ReconciliationOutlined, SettingOutlined, ShopOutlined, TagOutlined, UserOutlined, UserSwitchOutlined } from '@ant-design/icons';
import MainHeader from '../Components/MainLayout/MainHeader';
import { Link, Outlet } from 'react-router-dom';

const { Content, Sider } = Layout;

const DataOperatoLayout = () => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    let items = []
    items = [
        {
            key: '',
            icon: <DashboardOutlined />,
            label: <Link to={''}>{'Dashboard'}</Link>,
        },
        {
            key: 'owners',
            icon: <UserSwitchOutlined />,
            label: <Link to={'Owner'}>{'Owner'}</Link>,
        },
        {
            key: 'Phase',
            icon: <ContainerOutlined />,
            label: <Link to={'/Data_entry/phase'}>{'All Phase'}</Link>,
        },
        {
            key: 'Block',
            icon: <ContainerOutlined />,
            label: <Link to={'/Data_entry/block'}>{'All Block'}</Link>,
        },
        {
            key: 'File',
            icon: <TagOutlined />,
            label: <Link to={'/Data_entry/registration/Plots'}>{'File'}</Link>,
        },
        {
            key: 'File Transfer',
            icon: <TagOutlined />,
            label: <Link to={'/Data_entry/registration/plot-transfer'}>{'File Transfer'}</Link>,
        },



    ];

    return (
        <Layout>
            <MainHeader onToggleSidebar={toggleSidebar} Dashboarname={"Data Entery"} />
            <Layout style={{ overflow: "hidden", height: `calc( 100vh - 64px )`, marginTop: '64px' }} className='data_entry_sidebar'>
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
                            color: "white"
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

export default DataOperatoLayout;
