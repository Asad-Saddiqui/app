import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

const PropertyTypeModal = ({ visible, onClose, selectedProperty, setPropertyOptions, propertyOptions }) => {
    const handleSubmit = (values) => {
        const data_ = propertyOptions?.find(dta => dta.label === selectedProperty);
        const dataRemaining = propertyOptions?.filter(dta => dta.label !== selectedProperty);

        if (data_) {
            const { data } = data_;
            let findValues = data.find(dta => dta?.label?.toLowerCase() === values.propertyType.toLowerCase());
            
            if (findValues) {
                // Property type already exists
                onClose();
                return; 
            } else {
                data.push({ label: values.propertyType, value: values.propertyType });
                const newData = {
                    label: selectedProperty,
                    data
                };
                setPropertyOptions([newData, ...dataRemaining]);
            }
        } else {
            const newData = {
                label: selectedProperty,
                data: [{
                    label: values.propertyType,
                    value: values.propertyType
                }]
            };
            setPropertyOptions([newData, ...dataRemaining]);
        }

        console.log('Property Type:', values.propertyType);
        onClose();
    };

    return (
        <Modal
            title="Select Property Type"
            open={visible}
            onCancel={onClose}
            footer={null}
            centered
        >
            <Form onFinish={handleSubmit}>
                <Form.Item 
                    name="propertyType" 
                    rules={[{ required: true, message: 'Please Enter a property type!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default PropertyTypeModal;
