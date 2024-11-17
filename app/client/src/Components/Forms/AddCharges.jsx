import React from 'react';
import { Modal, Input, Form, Button, Flex } from 'antd';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2'; // Import SweetAlert2
import { createChargeType, getChargeTypes } from '../../App/Slice/chargesTypeSlice';
// import { createChargeType, getChargeTypes } from '../Slice/chargesTypeSlice';


const AddCharges = ({
    openModal,  // Controls if modal is open
    closeModal  // Function to close modal
}) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch(); // Hook to get the dispatch function

    // Handle form submission to create a new charge type
    const handleSubmit = async (values) => {
        try {
            // Dispatch action to create a charge type
            await dispatch(createChargeType({ chargeName: values.chargeName })).unwrap(); // Use unwrap to handle errors

            // Show success alert
            Swal.fire({
                title: 'Success!',
                text: 'Charge type added successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
            });

            // Fetch updated charge types after creation
            dispatch(getChargeTypes());
            // Reset the form and close the modal
            form.resetFields();
            closeModal();
        } catch (error) {
            // Show error alert
            Swal.fire({
                title: 'Error!',
                text: error.message || 'An error occurred while adding the charge type.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <Modal
            title="Add Charge Type"
            open={openModal} // Modal visibility
            onCancel={closeModal} // Function to close modal
            footer={null}  // Removes default footer buttons
            centered
            zIndex={1000}
        >
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                {/* Input for Charge Name */}
                <Form.Item label="Charge Type" name={"chargeName"} rules={[{ required: true, message: 'Please input the charge type' }]}>
                    <Input />
                </Form.Item>
                <Flex justify='end'>
                    <Button
                        type='primary'
                        htmlType='submit'

                    >
                        Add
                    </Button>
                </Flex>
            </Form>
        </Modal>
    );
};

export default AddCharges;
