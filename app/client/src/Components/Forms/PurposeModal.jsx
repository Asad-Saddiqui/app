import React from 'react';
import { Modal, Form, Select, Button } from 'antd';

const { Option } = Select;

const PurposeModal = ({ visible, onClose }) => {
    const handleSubmit = (values) => {
        console.log('Selected Purpose:', values);
        onClose();
    };

    return (
        <Modal
            title="Select Purpose"
            visible={visible}
            onCancel={onClose}
            footer={null}
            centered
        >
            <Form onFinish={handleSubmit}>
                <Form.Item name="purpose" rules={[{ required: true, message: 'Please select a purpose!' }]}>
                    <Select placeholder="Select Purpose">
                        <Option value="sell">Sell</Option>
                        <Option value="rent">Rent</Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default PurposeModal;
