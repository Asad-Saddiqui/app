import React, { useEffect, useState } from 'react';
import { Header } from 'antd/es/layout/layout';
import Cookies from 'js-cookie';

import {
    AlignLeftOutlined, UserOutlined, ProjectOutlined,
    SettingOutlined, MenuOutlined, EditOutlined, EllipsisOutlined,
    TableOutlined,
    DashboardTwoTone
} from '@ant-design/icons';
import { Avatar, Dropdown, Typography, Button, Drawer, Space, Divider, List, Card, Switch } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const { Title } = Typography;

const meetingData = {
    title: "Team Meeting",
    date: "August 31, 2024",
    time: "10:00 AM - 11:00 AM",
    attendees: ["Alice Johnson", "Bob Smith", "Charlie Davis"],
    agenda: [
        "Project Updates",
        "Budget Review",
        "Next Steps"
    ],
    notes: "Discuss the upcoming project milestones and review the budget for the next quarter."
};

const MainHeader = ({ Dashboarname }) => {
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [roles, setRoles] = useState(null)
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove('roles');
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        navigate('/login');
    };


    useEffect(() => {
        const roles = JSON.parse(localStorage.getItem('userDetails'))
        if (roles?.roles) {
            setRoles(roles.roles)
        }
    }, [])

    const handleDrawerOpen = () => setDrawerVisible(true);
    const handleDrawerClose = () => setDrawerVisible(false);

    const imageDimensions = { width: '300px', height: '120px' };
    const projects = [
        { name: 'Project Alpha', description: 'An innovative project focused on AI.', link: '#project-alpha' },
        { name: 'Project Beta', description: 'A new platform for collaborative work.', link: '#project-beta' },
        { name: 'Project Gamma', description: 'Enhancing user experience through advanced UX design.', link: '#project-gamma' },
    ];
    const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: "rgba(0, 123, 141, 0.4)",
        zIndex: 1
    };

    const metaStyle = {
        position: 'absolute',
        top: '10px',
        left: '10px',
        zIndex: 2,
        padding: '10px',
        borderRadius: '5px'
    };

    const customMetaContent = (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar size={50} src="https://api.dicebear.com/7.x/miniavs/svg?seed=3" />
            <div style={{ marginLeft: "10px" }}>
                <div style={{ color: '#47707b', fontWeight: 'bold', fontSize: "20px" }}>John Doe</div>
                <div style={{ color: 'Black' }}>Web Developer</div>
            </div>
        </div>
    );

    const customMetaSettings = (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ marginLeft: "10px" }}>
                <div style={{ color: '#48007b', fontWeight: 'bold', fontSize: "20px" }}>Settings</div>
                <div style={{ color: 'Black' }}>App Related Settings</div>
            </div>
        </div>
    );

    const customMetaProject = (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ marginLeft: "10px" }}>
                <div style={{ color: '#47007b', fontWeight: 'bold', fontSize: "20px" }}>New Projects</div>
                <div style={{ color: 'Black' }}>Explore New Projects</div>
            </div>
        </div>
    );

    const projectsMenu = (
        <Card
            style={{ width: "300px", position: 'relative' }}
            cover={
                <div style={{ position: 'relative' }}>
                    <img
                        alt="Projects"
                        src="https://images.unsplash.com/photo-1498855926480-d98e83099315?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8fA%3D%3D"
                        style={{ ...imageDimensions, opacity: 0.3 }}
                    />
                    <div style={overlayStyle} />
                    <div style={metaStyle}>
                        {customMetaProject}
                    </div>
                </div>
            }
        >
            <List
                dataSource={projects}
                renderItem={item => (
                    <List.Item>
                        <a href={item.link} style={{ flex: 1 }}>
                            <Title level={5}>{item.name}</Title>
                            <p>{item.description}</p>
                        </a>
                    </List.Item>
                )}
            />
            <Button type="link" style={{ display: 'block', marginTop: '10px' }}>See All Projects</Button>
        </Card>
    );

    const ProfileMenu = (
        <Card
            style={{ width: "300px", position: 'relative' }}
            cover={
                <div style={{ position: 'relative' }}>
                    <img
                        alt="Profile"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        style={{ ...imageDimensions, opacity: 0.3 }}
                    />
                    <div style={overlayStyle} />
                    <div style={metaStyle}>
                        {customMetaContent}
                    </div>
                </div>
            }
        //    add  new project list here
        >
            <div style={{ marginTop: '10px' }}>
                <Button type="link" icon={<EditOutlined />}>Edit Profile</Button>
                <Button type="link" icon={<SettingOutlined />} onClick={() => navigate('/account-settings')}>
                    Account Settings
                </Button>

                {roles && roles.includes('ADMIN') && (
                    <Button type="link" icon={<UserOutlined />} onClick={() => navigate('/Admin')}>
                        Admin
                    </Button>
                )}

                {roles && roles.includes('DATA_ENTRY') && (
                    <Button type="link" icon={<TableOutlined />} onClick={() => navigate('/Data_entry')}>
                        Data_entry
                    </Button>
                )}

                {roles && roles.includes('MANAGER') && (
                    <Button type="link" icon={<DashboardTwoTone />} onClick={() => navigate('/Management')}>
                        Management
                    </Button>
                )}

                {roles && roles.includes('ACCOUNTANT') && (
                    <Button type="link" icon={<SettingOutlined />} onClick={() => navigate('/accountant')}>
                        Accounts
                    </Button>
                )}

                <Button type="link" danger onClick={handleLogout} icon={<EllipsisOutlined />}>
                    Logout
                </Button>
            </div>
        </Card>
    );

    const settingsMenu = (
        <Card
            style={{ width: "300px", position: 'relative' }}
            cover={
                <div style={{ position: 'relative' }}>
                    <img
                        alt="Settings"
                        src="https://images.unsplash.com/photo-1429277096327-11ee3b761c93?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MjB8fHxlbnwwfHx8fHw%3D"
                        style={{ ...imageDimensions, opacity: 0.3 }}
                    />
                    <div style={overlayStyle} />
                    <div style={metaStyle}>
                        {customMetaSettings}
                    </div>
                </div>
            }
        //    add setting app related
        >

            <div style={{ marginTop: '10px' }}>
                <Title level={5}>App Settings</Title>
                <Divider />
                <Space direction="vertical" style={{ width: '100%' }}>
                    <div>
                        <span>Dark Mode</span>
                        <Switch style={{ marginLeft: '10px' }} />
                    </div>
                    <div>
                        <span>Enable Notifications</span>
                        <Switch style={{ marginLeft: '10px' }} />
                    </div>
                    <div>
                        <span>Auto Save</span>
                        <Switch style={{ marginLeft: '10px' }} />
                    </div>
                </Space>
            </div>
        </Card>
    );

    return (
        <>
            <Header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: '#f0f2f5',
                    padding: '10px',
                    borderBottom: '1px solid #e8e8e8'
                }}
                className='app-header'
            >
                <Space style={{ width: '200px', height: '64px', alignItems: 'center' }}>
                    <Title level={4} style={{ letterSpacing: '2px', margin: 0 }}>ICHS {Dashboarname} </Title>
                </Space>
                <Space style={{ width: `calc(100% - 200px)`, justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Dropdown overlay={projectsMenu} placement="bottomRight" trigger={['click']} overlayStyle={{ minWidth: '300px' }}>
                        <Space>
                            <Button icon={<ProjectOutlined />} type="text" style={{ color: '#1890ff' }}>Projects</Button>
                        </Space>
                    </Dropdown>
                    {/* <Dropdown overlay={settingsMenu} placement="bottomRight" trigger={['click']} overlayStyle={{ minWidth: '300px' }}>
                        <Space>
                            <Button icon={<SettingOutlined />} type="text" style={{ color: '#1890ff' }}>Settings</Button> </Space>
                    </Dropdown> */}
                    <Dropdown overlay={ProfileMenu} placement="bottomRight" trigger={['click']} overlayStyle={{ minWidth: '300px' }}>
                        <Space>
                            <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#87d068', color: '#fff' }} />
                            <span style={{ color: '#000' }}>Profile</span>
                        </Space>
                    </Dropdown>
                    <Button icon={<MenuOutlined />} onClick={handleDrawerOpen} type="text" style={{ color: '#1890ff' }} />
                </Space>
            </Header>

            <Drawer
                title="Meeting Details"
                placement="right"
                onClose={handleDrawerClose}
                visible={drawerVisible}
                width={400}
                bodyStyle={{ padding: '16px' }}
                headerStyle={{ background: '#1890ff', color: '#fff' }}
            >
                <Title level={5}>{meetingData.title}</Title>
                <Divider />
                <p><strong>Date:</strong> {meetingData.date}</p>
                <p><strong>Time:</strong> {meetingData.time}</p>
                <p><strong>Attendees:</strong></p>
                <List
                    dataSource={meetingData.attendees}
                    renderItem={(item) => (
                        <List.Item>{item}</List.Item>
                    )}
                />
                <p><strong>Agenda:</strong></p>
                <List
                    dataSource={meetingData.agenda}
                    renderItem={(item) => (
                        <List.Item>{item}</List.Item>
                    )}
                />
                <p><strong>Notes:</strong></p>
                <p>{meetingData.notes}</p>
            </Drawer>
        </>
    );
};

export default MainHeader;
