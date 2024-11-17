import React, { useEffect } from 'react';
import { Button, Form, Input, Modal, Row, Col, Select } from 'antd';

const { Option } = Select;

const OwnerDetails = ({ visibleOwner, setVisibleOwner }) => {
    const [form] = Form.useForm();

    const handleFinish = (values) => {
        // Handle form submission logic
        console.log('Form values:', values);
        form.resetFields();
        setVisibleOwner(false);
    };

    useEffect(() => {
        if (visibleOwner) {
            form.resetFields(); // Reset fields when modal is opened
        }
    }, [visibleOwner, form]);

    return (
        <Modal
            title="Add Owner Details"
            open={visibleOwner}
            onCancel={() => setVisibleOwner(false)}
            footer={null}
            destroyOnClose
        >
            <Form form={form} layout="vertical" onFinish={handleFinish}>
                <Row gutter={8}>
                    <Col span={12}>
                        <Form.Item label="Owner Name" name="personName" rules={[{ required: true, message: 'Please enter owner name' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Father Name / Husband Name" name="fatherName">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Col span={12}>
                        <Form.Item label="CNIC" name="cnic" rules={[{ required: true, message: 'Please enter CNIC' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Country" name="country" rules={[{ required: true, message: 'Please select a country' }]}>
                            <Select placeholder="Select a country">
                                <Option value="Pakistan">Pakistan</Option>
                                <Option value="India">India</Option>
                                <Option value="Bangladesh">Bangladesh</Option>
                                <Option value="Sri Lanka">Sri Lanka</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Col span={12}>
                        <Form.Item label="Address" name="address">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="City" name="city">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item label="Contact Number" name="contactNumber" rules={[{ required: true, message: 'Please enter contact number' }]}>
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                        Add Owner
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default OwnerDetails;
