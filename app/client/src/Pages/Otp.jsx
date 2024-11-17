import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import 'antd/dist/reset.css'; // Reset Ant Design styles
import './otp.css'; // Custom CSS for the component

const { Title } = Typography;

const OTPInput = ({ length, formatter, mask, ...props }) => {
  // Handle input formatting
  const handleChange = (e) => {
    let value = e.target.value;
    if (formatter) {
      value = formatter(value);
    }
    if (length) {
      value = value.slice(0, length);
    }
    e.target.value = value;
    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <Input
      maxLength={length}
      onChange={handleChange}
      {...props}
      addonBefore={mask && <span className="otp-mask">{mask}</span>}
    />
  );
};

const OTPForm = () => {
  const onFinish = (values) => {
    console.log('OTP Submitted:', values.otp);
  };

  return (
    <div className="otp-screen">
      <div className="otp-container">
        <Title level={2} className="otp-title">Enter OTP</Title>
        <Form
          name="otp-form"
          onFinish={onFinish}
          layout="vertical"
          className="otp-form"
        >
          <Form.Item
            label="6-digit OTP"
            name="otp"
            rules={[
              { required: true, message: 'Please input the 6-digit OTP!' },
              { len: 6, message: 'OTP must be exactly 6 digits' },
            ]}
          >
            <OTPInput
              length={6}
              formatter={(str) => str.toUpperCase()}
              placeholder="Enter OTP"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="otp-submit-button">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default OTPForm;
