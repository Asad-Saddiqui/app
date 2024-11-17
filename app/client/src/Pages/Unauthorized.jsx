// src/Pages/Unauthorized.js
import React from 'react';
import { Result, Button, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <>
      <Flex justify='center' align='center' style={{ height: "100vh" }}>
        <Result
          status="403"
          title="403"
          subTitle="Sorry, you do not have permission to access this page."
          extra={
            <Button type="primary" onClick={() => navigate('/login')}>
              Back to Login
            </Button>
          }
        />
      </Flex>
    </>
  );
};

export default Unauthorized;
