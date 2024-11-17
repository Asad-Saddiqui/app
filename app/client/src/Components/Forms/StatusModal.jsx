import React, { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';

const StatusModal = ({ visible, onClose, addStatus }) => {
    const [form] = Form.useForm();

    const handleSubmit = async (values) => {
        addStatus(values.status);
        form.resetFields();
        onClose();
    };

    return (
        <Modal
            title="Add New Status"
            visible={visible}
            onCancel={onClose}
            footer={null}
        >
            <Form form={form} onFinish={handleSubmit}>
                <Form.Item
                    name="status"
                    label="Status"
                    rules={[{ required: true, message: 'Please input the status!' }]}
                >
                    <Input placeholder="Enter new status" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Add Status</Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default StatusModal;
