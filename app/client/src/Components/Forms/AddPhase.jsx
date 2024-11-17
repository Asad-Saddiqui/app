import { Col, Form, Input, Row, Modal, Button, Spin } from 'antd';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { add_Phase, update_phase_by_id } from '../../App/Slice/phaseSlice';

function AddPhase({ isEditMode, currentBranch, onClose, fetchPhases }) {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    // Use effect to populate the form in edit mode
    React.useEffect(() => {
        if (isEditMode && currentBranch) {
            form.setFieldsValue(currentBranch);
        } else {
            form.resetFields();
        }
    }, [isEditMode, currentBranch, form]);

    const handleFinish = async (values) => {
        try {
            setLoading(true);
            if (isEditMode) {
                const updatedPhase = await dispatch(update_phase_by_id({ id: currentBranch._id, updateData: values })).unwrap();
                if (updatedPhase.status === 200) {
                    await fetchPhases();
                    Swal.fire('Success', 'Phase updated successfully!', 'success');
                }
            } else {
                const newPhase = await dispatch(add_Phase(values)).unwrap();
                console.log('newPhase', newPhase)
                if (newPhase.status === 200) {
                    await fetchPhases();
                    Swal.fire('Success', 'Phase added successfully!', 'success');
                } else {
                    Swal.fire('Error !', newPhase.payload, 'error');
                }
            }
            onClose();
        } catch (error) {
            console.error('Error:', error);
            Swal.fire('Error!', error || 'Failed to save the phase. Please try again.', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title={isEditMode ? 'Edit Phase' : 'Add Phase'}
            visible={true}
            onCancel={onClose}
            centered
            footer={false}
            zIndex={1000}
        >
            <Form form={form} layout="vertical" onFinish={handleFinish}>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="phase_name"
                            label="Phase Name"
                            rules={[{ required: true, message: 'Please enter the Phase name' }]}
                        >
                            <Input placeholder="Enter Phase name" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="phase_location"
                            label="Location"
                            rules={[{ required: true, message: 'Please enter the location' }]}
                        >
                            <Input placeholder="Enter location" />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <Button loading={loading} style={{ marginBottom: "-12px" }} type='primary' htmlType='submit'>
                        {isEditMode ? 'Update Phase' : 'Add Phase'}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default AddPhase;
