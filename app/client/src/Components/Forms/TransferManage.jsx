import React from 'react';
import { Modal, Button, Form, Input, Select, Row, Col, Checkbox, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { toTitleCase } from '../../utils/helper';
import { CloseOutlined } from '@ant-design/icons';
import { FetchTransferFile, tracktransferMembership } from '../../App/Slice/transferSlice';
import Swal from 'sweetalert2'
import { get_MemberShip } from '../../App/Slice/membershipSlice';

const TransferManage = ({ account, selectedMembership, visible, onClose }) => {
    const [form] = Form.useForm();
    const { owners, loading } = useSelector(state => state.Owner);
    const { membership } = useSelector(state => state.Membership);
    const dispatch = useDispatch();

    // Define the status options
    let statusOptions = [];

    if (account === 'account') {
        statusOptions = [
            { label: 'Under Review by Accounts' },
            { label: 'Approved by Accounts' },
            { label: 'Rejected by Accounts' },
        ];
    } else if (account === 'managment') {
        statusOptions = [
            // { label: 'Under Review by Manager' },
            { label: 'Approved by Manager' },
            { label: 'Rejected by Manager' },
        ];
    } else if (account === 'admin') {
        statusOptions = [
            { label: 'Rejected by Admin' },
            { label: 'Transfer Completed' },
            // { label: 'Closed' },
            // { label: 'Open' },
        ];
    }

    const handleFinish = async (values) => {
        try {
            // Log form values for debugging
            console.log('Form values:', values);

            // Attach the selected membership ID to the form values
            values.membershipId = selectedMembership;
            let status;
            status = await dispatch(tracktransferMembership(values));
            // Check if the request was successful (fulfilled)
            if (status.meta.requestStatus === 'fulfilled') {
                dispatch(get_MemberShip());
                dispatch(FetchTransferFile());
                Swal.fire({
                    title: 'Success!',
                    text: status.payload.message,
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            } else {
                // If the request failed
                Swal.fire({
                    title: 'Error!',
                    text: status.payload,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }

            // Optionally, close the modal after submission (if needed)
            onClose();
        } catch (error) {
            // Catch any errors and show a general error message
            console.error('Error during transfer request:', error);
            Swal.fire({
                title: 'Error!',
                text: 'An unexpected error occurred. Please try again later.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };
    return (
        <Modal
            title="Transfer Status"
            open={visible}
            onCancel={onClose}
            footer={null}
            width={500}
            centered
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish} // Add onFinish handler
                style={{ height: "150px" }}
            >
                <Form.Item
                    name="status" // Name for the status field
                    label="Status"
                    rules={[{ required: true, message: 'Please select a status' }]} // Validation rule
                >
                    <Select placeholder="Select a status" style={{ height: "43px" }}>
                        {statusOptions.map(option => (
                            <Select.Option key={option.label} value={option.label}>
                                {option.label}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <br />
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Save Changes
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default TransferManage;
