import { Modal, Form, Input, Row, Col, Button, DatePicker, message, Select } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { receive_Payment } from '../../App/Slice/chargesSlice';
import dayjs from 'dayjs'; // Import dayjs

export default function ReceivePaymentModal({ isOpen, onClose, currentPayment, setCurrentPayment }) {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    // Handle form submission
    const handleSubmit = async (values) => {
        try {
            // Prepare payment data to send
            const paymentData = {
                amount: values.amount,
                paidAmount: values.paidAmount,
                discount: values.discount,
                receivingDate: values.receivingDate.format('YYYY-MM-DD'), // Format date with dayjs
                // paymentMethod: currentPayment?.paymentMethod || '', // Include payment method if applicable
                cashType: values.cashType,
                bank: values.bank,

                refNo: values.refNo,

                paymentId: currentPayment._id
            };

            // Dispatch the payment action
            await dispatch(receive_Payment(paymentData)).unwrap();
            message.success('Payment submitted successfully!'); // Show success message
            onClose(); // Close the modal after submission
            // Reset current payment if necessary
            setCurrentPayment(null);
            form.resetFields(); // Reset form fields after submission
        } catch (error) {
            message.error(`Failed to submit payment: ${error}`); // Show error message
        }
    };

    useEffect(() => {
        if (currentPayment) {
            form.setFieldsValue({
                amount: Math.round(currentPayment.amount),
                paymentMethod: currentPayment.paymentMethod || '',
                paidAmount: currentPayment.paidAmount || '',
                discount: currentPayment.discount || '',
                receivingDate: currentPayment.receivingDate ? dayjs(currentPayment.receivingDate) : null, // Use dayjs for parsing date
            });
        }
    }, [currentPayment, form]);

    return (
        <Modal
            open={isOpen}
            onCancel={onClose}
            centered
            footer={false}
            width={700}
            zIndex={1000}
        >
            <h2>Receive Payment</h2>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="amount"
                            label="Payment Amount"
                            rules={[{ required: true, message: 'Please enter the payment amount!' }]}
                        >
                            <Input readOnly type="number" placeholder="Enter amount in PKR" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Receiving Date"
                            name="receivingDate"
                            rules={[{ required: true, message: 'Please select a receiving date' }]}
                            initialValue={dayjs()}
                        >
                            <DatePicker style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="paidAmount"
                            label="Paid Amount"
                            rules={[{ required: true, message: 'Please enter the paid amount!' }]}
                        >
                            <Input type="number" placeholder="Enter paid amount in PKR" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="cashType"
                            label="Cash Type"
                            rules={[{ required: true, message: 'Please Select The Type' }]}
                        >

                            <Select>

                                <Select.Option value={"Bank"}>Bank</Select.Option>
                                <Select.Option value={"Cash On Hand"}>Cash</Select.Option>
                                <Select.Option value={"Cheque"}>Cheque</Select.Option>
                                <Select.Option value={"Other"}>Other</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="bank"
                            label="Bank"
                        >
                            <Input type="text" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="refNo"
                            label="Ref NO"
                        >
                            <Input type="text" />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            name="discount"
                            label="Payment Discount (PKR)"
                        >
                            <Input type="number" placeholder="Enter discount amount in PKR" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row justify="end">
                    <Col>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit Payment
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}
