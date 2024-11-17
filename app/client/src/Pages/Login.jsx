import React from 'react';
import { Form, Input, Button, Checkbox, Typography, message } from 'antd';
import 'antd/dist/reset.css'; // Reset Ant Design styles
import './LoginPage.css'; // Custom CSS for the login page
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import js-cookie for setting cookies
import { baseurl } from '../utils/baseUrl'; // Base URL for your API

const { Title, Link } = Typography;

const Login = () => {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            const response = await fetch(`http://localhost:8001/api/auth/login/`, {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: values.username,
                    password: values.password,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                console.log('response', data)
                localStorage.setItem('userDetails', JSON.stringify(data.auth))

                if (data.auth.roles.includes('ADMIN')) {
                    navigate('/Admin');
                } else if (data.auth.roles.includes('ACCOUNTANT')) {
                    navigate('/Accountant');
                }
                else if (data.auth.roles.includes('DATA_ENTRY')) {
                    navigate('/Data_entry');
                } else if (data.auth.roles.includes('MANAGER')) {
                    navigate('/Management');
                }
            } else {
                message.error(data.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Login error:', error);
            message.error('Something went wrong. Please try again.');
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className="login-container">
            <div className="login-box">
                <Title level={2} className="login-title">Login</Title>
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout="vertical"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        initialValue={"admin@gmail.com"}
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input prefix={<UserOutlined />} />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        initialValue={"admin1234"}
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} />
                    </Form.Item>

                    <div className="login-links">
                        <Form.Item name="remember" valuePropName="checked">
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                        <Link href="/forgot-password" className="login-link">
                            Forgot Password?
                        </Link>
                    </div>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-button">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                <Link href="/signup" className="login-link">
                    Create an Account
                </Link>
            </div>
        </div>
    );
};

export default Login;
