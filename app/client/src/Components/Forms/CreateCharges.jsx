import React, { useEffect, useState } from 'react';
import {
    Modal,
    Input,
    Form,
    Select,
    InputNumber,
    DatePicker,
    Button,
    Row,
    Col,
    Switch,
    Table,
} from 'antd';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { add_Charges, get_Charges } from '../../App/Slice/chargesSlice';
import Swal from 'sweetalert2'; // SweetAlert2 import
import Compact from 'antd/es/space/Compact';
import { PlusOutlined } from '@ant-design/icons';
import AddCharges from './AddCharges';
import { getChargeTypes } from '../../App/Slice/chargesTypeSlice';

const { Option } = Select;

const CreateCharges = ({ isOpen, onClose, onSubmit, title, installment, selectedRowKeys }) => {
    const [form] = Form.useForm();
    const [installmentType, setInstallmentType] = useState(null);
    const [paymentSchedule, setPaymentSchedule] = useState([]);
    const [isInstallmentEnabled, setIsInstallmentEnabled] = useState(false);
    const [loading, setLoading] = useState(false); // Loading state for submit 
    const dispatch = useDispatch();
    const { membership } = useSelector(state => state.Membership);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { chargeTypes } = useSelector(state => state.ChargreType)
    // Function to open modal
    const openModal = () => {
        setIsModalVisible(true);
    };

    // Function to close modal
    const closeModal = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        if (isOpen) {
            form.resetFields();
            setInstallmentType(null); // Reset installment type
            setPaymentSchedule([]); // Reset payment schedule
            setIsInstallmentEnabled(false); // Reset installment toggle
            setLoading(false); // Reset loading state
            if (installment !== false) {
                dispatch(get_Charges(membership._id));
            }
        }
        dispatch(getChargeTypes())
    }, [isOpen, form]);

    const handleOk = () => {
        setLoading(true); // Set loading to true when submitting
        form
            .validateFields()
            .then((values) => {
                values.paymentSchedule = paymentSchedule;
                values.isInstallmentEnabled = isInstallmentEnabled;
                values.membershipId = selectedRowKeys ? selectedRowKeys : [membership._id];

                console.log('Field Values:', values); // Log field values on submit
                dispatch(add_Charges(values))
                    .then(() => {
                        // Success SweetAlert
                        Swal.fire({
                            icon: 'success',
                            title: 'Success!',
                            text: 'Charges and payment schedule created successfully!',
                            confirmButtonText: 'OK'
                        });
                        form.resetFields(); // Reset the form fields
                        setPaymentSchedule([]); // Clear payment schedule
                    })
                    .catch(() => {
                        // Error SweetAlert
                        Swal.fire({
                            icon: 'error',
                            title: 'Error!',
                            text: 'Failed to create charges. Please try again.',
                            confirmButtonText: 'OK'
                        });
                    })
                    .finally(() => {
                        setLoading(false); // Reset loading after submission
                    });
            })
            .catch((errorInfo) => {
                console.log('Validation Failed:', errorInfo);
                setLoading(false); // Reset loading if validation fails
            });
    };

    const handleInstallmentChange = (value) => {
        setInstallmentType(value);
    };

    const handleCalculateSchedule = (values) => {
        const totalAmount = values.chargesAmount;
        values.downpayment = 0;
        const downpayment = values.downpayment ? values.downpayment : 0;
        const installments = values.numberOfPayments;
        const installmentAmount = (totalAmount - downpayment) / installments;
        const schedule = [];

        for (let i = 0; i < installments; i++) {
            let paymentDate = dayjs(values.installmentDate);
            if (installmentType === 'monthly') {
                paymentDate = paymentDate.add(i, 'month');
            } else if (installmentType === 'quarterly') {
                paymentDate = paymentDate.add(i * 3, 'month');
            } else if (installmentType === 'yearly') {
                paymentDate = paymentDate.add(i, 'year');
            } else if (installmentType === 'bi-monthly') {
                paymentDate = paymentDate.add(i * 2, 'month');
            } else if (installmentType === 'semi-annually') {
                paymentDate = paymentDate.add(i * 6, 'month');
            }

            schedule.push({
                installmentNumber: i + 1,
                amount: installmentAmount,
                dueDate: paymentDate.format('YYYY-MM-DD'),
            });
        }

        setPaymentSchedule(schedule);
    };

    return (<>


        <AddCharges
            openModal={isModalVisible} // Pass the modal visibility state
            closeModal={closeModal} />
        <Modal
            title={title}
            open={isOpen}
            onOk={handleOk}
            onCancel={onClose}
            footer={null}
            width={800}
            centered={installment !== false ? false : true}
            zIndex={1000}
        >
            <Form
                form={form}
                layout="vertical"
                onFieldsChange={() => setPaymentSchedule([])}
                onFinish={handleCalculateSchedule}
            >
                <Row gutter={16}>
                    {/* Charge Name */}
                    <Col span={installment !== false ? 12 : 24}>
                        <Compact style={{ width: "100%" }}>
                            <Form.Item
                                label="Charge Name"
                                name="chargeName"
                                rules={[{ required: true, message: 'Please input the charge name!' }]}
                                style={{ width: "100%" }}
                            >
                                <Select style={{ width: "100%" }}>
                                    {chargeTypes && chargeTypes.map((dta, i) => {
                                        return <Option key={i} value={dta.chargeName}>{dta.chargeName}</Option>
                                    })}
                                </Select>
                            </Form.Item>
                            <Form.Item label=" ">
                                <Button onClick={openModal}><PlusOutlined /></Button>
                            </Form.Item>
                        </Compact>
                    </Col>
                    {/* Charges Amount */}
                    <Col span={installment !== false ? 12 : 24}>
                        <Form.Item
                            label="Charges Amount"
                            name="chargesAmount"
                            rules={[{ required: true, message: 'Please input the charges amount!' }]}
                        >
                            <InputNumber placeholder="Enter amount" style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>


                <Row gutter={16}>
                    {/* Installment Toggle */}
                    <Col span={12}>
                        <Form.Item label="Enable Installment">
                            <Switch checked={isInstallmentEnabled} onChange={setIsInstallmentEnabled} />
                        </Form.Item>
                    </Col>
                </Row>


                {/* Installment Type */}
                {isInstallmentEnabled && (
                    <>
                        <Row gutter={16}>
                            {/* <Col span={12}>
                                <Form.Item
                                    label="Downpayment"
                                    name="downpayment"
                                    rules={[
                                        { required: true, message: 'Please input the downpayment amount!' },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                const chargesAmount = getFieldValue('chargesAmount');
                                                if (value <= chargesAmount) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('Downpayment cannot be greater than charges amount!'));
                                            },
                                        }),
                                    ]}
                                >
                                    <InputNumber placeholder="Enter downpayment amount" style={{ width: '100%' }} />
                                </Form.Item>
                            </Col> */}
                            <Col span={12}>
                                <Form.Item
                                    label="Installment Type"
                                    name="installmentType"
                                    rules={[{ required: true, message: 'Please select the installment type!' }]}
                                >
                                    <Select placeholder="Select Installment Type" onChange={handleInstallmentChange}>
                                        <Option value="monthly">Monthly</Option>
                                        <Option value="quarterly">Quarterly</Option>
                                        <Option value="yearly">Yearly</Option>
                                        <Option value="bi-monthly">Bi-Monthly</Option>
                                        <Option value="semi-annually">Semi-Annually</Option>
                                    </Select>
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item
                                    label="Number of Payments"
                                    name="numberOfPayments"
                                    rules={[{ required: true, message: 'Please input the number of payments!' }]}
                                >
                                    <InputNumber placeholder="Enter number of payments" style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item
                                    label="Installment Date"
                                    name="installmentDate"
                                    rules={[{ required: true, message: 'Please select the installment date!' }]}
                                >
                                    <DatePicker style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="After Date Fine Per Day"
                                    name="fine"
                                    rules={[{ required: true, message: 'Please select the installment date!' }]}
                                >
                                    <InputNumber min={0} style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </>
                )}

                {/* Calculate Schedule Button */}
                {isInstallmentEnabled && installmentType && (
                    <Row gutter={16}>
                        <Col span={12}>
                            <Button type="primary" htmlType="submit">
                                Calculate Schedule
                            </Button>
                        </Col>
                    </Row>
                )}
            </Form>

            {/* Payment Schedule Table */}
            {paymentSchedule.length > 0 && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Payment Schedule</h3>
                    <Table
                        dataSource={paymentSchedule}
                        columns={[
                            {
                                title: 'Installment Number',
                                dataIndex: 'installmentNumber',
                                key: 'installmentNumber',
                            },
                            {
                                title: 'Amount',
                                dataIndex: 'amount',
                                key: 'amount',
                                render: (text) => `${text.toFixed(2)}`,
                            },
                            {
                                title: 'Due Date',
                                dataIndex: 'dueDate',
                                key: 'dueDate',
                            },
                        ]}
                        rowKey="installmentNumber"
                    />
                </div>
            )}

            {/* Submit Button with loading state */}
            <Row justify="end" gutter={16}>
                <Col>
                    <Button
                        type="primary"
                        onClick={handleOk}
                        loading={loading}
                        disabled={isInstallmentEnabled && paymentSchedule.length === 0} // Disable if loading or schedule is empty
                        style={{ marginTop: '20px' }}
                    >
                        Submit
                    </Button>
                </Col>
            </Row>
        </Modal>
    </>

    );
};

export default CreateCharges;
