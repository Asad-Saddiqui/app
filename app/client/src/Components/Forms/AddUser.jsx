import React, { useState } from 'react';
import { Modal, Button, Input, Select, Form, Row, Col } from 'antd';
import { useDispatch } from 'react-redux';
import { add_user, get_user } from '../../App/Slice/userSlice'; // Assuming this action exists
import Swal from 'sweetalert2';


const { Option } = Select;

function AddUser({ isVisible, onClose }) {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false); // Loading state

    // Handle form submission
    const handleSubmit = async (values) => {
        setLoading(true); // Start loading
        try {
            const user = await dispatch(add_user(values)).unwrap(); // Use unwrap() to get the result directly
            console.log('user', user);

            // This means the add_user action was fulfilled
            Swal.fire({
                icon: 'success',
                title: 'User Added!',
                text: 'The user has been successfully added.',
            }).then(() => {
                dispatch(get_user());
                onClose();
            })

            // Fetch the updated list of users

            // Close modal on success
        } catch (error) {
            // This will catch any error from the dispatch
            console.log('error', error)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message || 'Failed to add user. Please try again.',
            });
        } finally {
            setLoading(false); // Stop loading
        }
    };


    return (
        <Modal
            title="Add User"
            open={isVisible}
            onCancel={onClose}
            centered
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Cancel
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    loading={loading} // Set loading state
                    onClick={() => form.submit()} // Trigger form submit programmatically
                >
                    Submit
                </Button>,
            ]}
        >
            <Form form={form} onFinish={handleSubmit} layout="vertical">
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please enter username' }]}
                        >
                            <Input placeholder="Enter username" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please enter email' }]}
                        >
                            <Input placeholder="Enter email" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please enter password', min: 6 }]}
                        >
                            <Input.Password placeholder="Enter password" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Roles"
                            name="roles"
                            rules={[{ required: true, message: 'Please select at least one role' }]}
                        >
                            <Select mode="multiple" placeholder="Select roles">
                                <Option value="ADMIN">Administrator</Option>
                                <Option value="ACCOUNTANT">Accountant</Option>
                                <Option value="DATA_ENTRY">Data Entry Specialist</Option>
                                <Option value="AGENT">Real Estate Agent</Option>
                                <Option value="MANAGER">Manager</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}

export default AddUser;
