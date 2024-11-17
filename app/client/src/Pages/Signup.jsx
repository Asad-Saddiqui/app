import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import 'antd/dist/reset.css'; // Reset Ant Design styles
import './SignupPage.css'; // Custom CSS for the signup page

const { Title, Text, Link } = Typography;

const Signup = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <Title level={2} className="signup-title">Sign Up</Title>
        <Form
          name="signup"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="signup-button">
              Sign Up
            </Button>
          </Form.Item>

          <Form.Item>
            <Text className="signup-text">Already have an account?</Text>
            <Link href="/login" className="signup-login-link"> Go to Login</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
