import React from 'react';
import { Modal, Form, Select, Button, Input } from 'antd';


const PropertyModal = ({ visible, setPropertyType_, onClose }) => {
    const handleSubmit = (values) => {
        setPropertyType_((prevState) => [...prevState, values.propertyType]);

        onClose();
    };

    return (
        <Modal
            title="Property Type"
            visible={visible}
            onCancel={onClose}
            footer={null}
            centered
        >
            <Form onFinish={handleSubmit}>
                <Form.Item name="propertyType" rules={[{ required: true, message: 'Please Enter a property!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default PropertyModal;
