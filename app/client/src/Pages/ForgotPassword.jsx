import React, { useState } from 'react';
import { Form, Input, Button, Typography } from 'antd';
import 'antd/dist/reset.css'; // Reset Ant Design styles
import './ForgotPassword.css'; // Custom CSS for the forgot password page
import { baseurl } from '../utils/baseUrl';
import { useNavigate } from 'react-router-dom'
const { Title, Text } = Typography;

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP
  const [resendDisabled, setResendDisabled] = useState(false);
  const [timer, setTimer] = useState(0); // Initialize timer
  const navigate = useNavigate()
  const handleEmailSubmit = async (values) => {
    try {
      console.log('Email:', values.email);

      const response = await fetch(baseurl + '/api/auth/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify({ email: values.email }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send OTP');
      }

      const data = await response.json();
      console.log('Response:', data);
      setStep(2);
    } catch (error) {
      console.error('Error sending OTP:', error.message);
    }
  };


  const handleOTPSubmit = async (values) => {
    try {
      console.log('Submitted Values:', values);

      const response = await fetch(baseurl + '/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify(values), // Send the values as JSON
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to reset password');
      }

      const data = await response.json();
      navigate('/login')
      console.log('Response:', data);

    } catch (error) {
      console.error('Error resetting password:', error.message);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        {step === 1 ? (
          <>
            <Title level={2} className="forgot-password-title">Forgot Password</Title>
            <Form
              name="forgot-password-email"
              onFinish={handleEmailSubmit}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                label="Email Address"
                name="email"
                rules={[
                  { required: true, message: 'Please input your email address!' },
                  { type: 'email', message: 'Please enter a valid email address!' },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="forgot-password-button">
                  Send OTP
                </Button>
              </Form.Item>
            </Form>
          </>
        ) : (
          <>
            <Title level={2} className="forgot-password-title">Enter OTP</Title>
            <Form
              name="forgot-password-otp"
              onFinish={handleOTPSubmit}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                label="6-digit OTP"
                name="otp"
                rules={[
                  { required: true, message: 'Please input the 6-digit OTP!' },
                  { len: 6, message: 'OTP must be exactly 6 digits' },
                ]}
              >
                <Input maxLength={6} />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: 'Please input the password!' },
                ]}
              >
                <Input type='password' />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="forgot-password-button">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
