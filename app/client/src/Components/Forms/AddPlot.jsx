import React, { useEffect, useState } from 'react';
import { Button, Col, Drawer, Flex, Form, Input, Row, Select, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import MembershipDetails from '../Tabs/MembershipDetails';
import LandLocation from '../Tabs/LandLocation';
import FeatureAmenities from '../Tabs/FeatureAmmenities';
import ExtraInfoEditor from '../Tabs/ExtraInfoEditor';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import Compact from 'antd/es/space/Compact';
import OwnerModal from './OwnerModal';
import { add_MemberShip, get_MemberShip } from '../../App/Slice/membershipSlice';
import { useForm } from 'antd/es/form/Form';
import Swal from 'sweetalert2';

const { Option } = Select;

function AddMembership({ open, setOpen, editIndex = null }) {
    const [editorData, setEditorData] = useState('');
    const [btnloading, setbtnloading] = useState(false)
    const { owners, loading } = useSelector(state => state.Owner);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState(0);
    const [ownerModalVisible, setOwnerModalVisible] = useState(false);
    const [nominee, setnominee] = useState(false)
    const [propertyType, setPropertyType] = useState('');
    const onClose = () => {
        setOpen(false);
        form.resetFields();
    };

    const handleFinish = async (values) => {
        setbtnloading(true);

        // Set notes from editorData
        values.notes = editorData ? editorData : '';
        console.log('----------------------------------------------------------', values)
        try {
            // Dispatch the action
            const resultAction = await dispatch(add_MemberShip(values));

            // Check if the action was fulfilled
            if (resultAction.type.endsWith('fulfilled')) {
                // Show success message
                console.log('vaksjdnksjd--------------------kjsdkslues', values)

                setbtnloading(false)

                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Membership created successfully!',
                }).then(() => {
                    dispatch(get_MemberShip());

                    // form.resetFields();
                    // setEditorData('')
                });
            } else {
                // Handle errors if necessary
                setbtnloading(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                });
            }
        } catch (error) {
            // Catch any unexpected errors
            console.error('Error dispatching action:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to create membership. Please try again.',
            });
        } finally {
            setbtnloading(false); // Ensure loading state is reset
        }
    };

    useEffect(() => {
        if (open) {
            // Set default values for the form
            form.setFieldsValue({
                owners: [{ owner: '', share: '' }] // Default one owner field
            });
            setActiveTab(0); // Reset to the first tab when the drawer opens
        }
    }, [open, form]);

    const handleNext = () => {
        setActiveTab((prev) => Math.min(prev + 1, 3)); // Assuming there are 4 tabs
    };

    return (
        <Drawer
            title={editIndex !== null ? "Edit Membership" : "Add Membership"}
            width="80%"
            closable={false}
            onClose={onClose}
            open={open}
        >
            <OwnerModal visible={ownerModalVisible} onClose={() => setOwnerModalVisible(false)} nominee={nominee} />
            <Form layout="vertical" form={form} onFinish={handleFinish} style={{ height: "100%" }}>
                <div style={{ paddingLeft: "40px", height: "90%", overflowY: "auto", overflowX: "hidden" }}>
                    <Row gutter={8}>
                        <Col sm={24} md={24} lg={12} xl={12} xxl={12}>
                            <MembershipDetails propertyType={propertyType} setPropertyType={setPropertyType} />
                        </Col>
                        <Col sm={24} md={24} lg={12} xl={12} xxl={12}>
                            <LandLocation form={form} />
                        </Col>
                        <Col sm={24} md={24} lg={24} xl={24} xxl={24}>
                            {/* Owners Section */}
                            <Form.List name="owners">
                                {(fields, { add, remove }) => (
                                    <>
                                        {/* Add Owner Button */}
                                        <Row>
                                            <Col sm={22} md={22} lg={23} xl={23} xxl={23}>
                                                <Form.Item>
                                                    <Button
                                                        type="dashed"
                                                        onClick={() => add()}
                                                        block
                                                        icon={<PlusOutlined />}
                                                    >
                                                        Add Owner
                                                    </Button>
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        {/* Dynamic Owner Fields */}
                                        {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                                            <Row key={key} gutter={8} style={{ marginBottom: 8 }} align="middle">
                                                {/* Select Owner Field */}
                                                <Col sm={11} md={11} lg={11} xl={11} xxl={11}>

                                                    <Compact style={{ width: "100%" }}>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'owner']}
                                                            fieldKey={[fieldKey, 'owner']}
                                                            label="Select Owner"
                                                            rules={[{ required: true, message: 'Select owner!' }]}
                                                            style={{ width: "80%" }}
                                                        >
                                                            <Select
                                                                placeholder="Select Owner"
                                                                showSearch
                                                                optionFilterProp="children" // Allows searching based on the label content (name + CNIC)
                                                                filterOption={(input, option) =>
                                                                    option?.children.toLowerCase().includes(input.toLowerCase())
                                                                }
                                                            >
                                                                {owners && owners.data.map((dta) => {
                                                                    return (
                                                                        <Option key={dta._id} value={dta._id}>
                                                                            {dta.ownerName.charAt(0).toUpperCase() + dta.ownerName.slice(1).toLowerCase() + ` [ ${dta.cnic} ] `}
                                                                        </Option>
                                                                    );
                                                                })}
                                                            </Select>
                                                        </Form.Item>

                                                        <Form.Item label=" " style={{ width: "20%" }}>
                                                            <Button style={{ width: "100%" }} onClick={() => {
                                                                setnominee(false)
                                                                setOwnerModalVisible(true)
                                                            }}>
                                                                <PlusOutlined />
                                                            </Button>
                                                        </Form.Item>
                                                    </Compact>
                                                </Col>

                                                {/* Owner Share Field */}
                                                < Col sm={10} md={10} lg={10} xl={10} xxl={10} >
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'share']}
                                                        fieldKey={[fieldKey, 'share']}
                                                        label="Owner Share"
                                                        rules={[{ required: true, message: 'Please enter share!' }]}
                                                    >
                                                        <Input type='number' placeholder="Enter share" />
                                                    </Form.Item>
                                                </Col>

                                                {/* Remove Button (Conditional) */}
                                                <Col sm={2} md={2} lg={2} xl={2} xxl={2} style={{ textAlign: 'center' }}>
                                                    {index !== 0 && ( // Hide for the first row
                                                        <MinusCircleOutlined
                                                            onClick={() => remove(name)}
                                                            style={{ color: 'red', fontSize: '16px' }}
                                                        />
                                                    )}
                                                </Col>
                                            </Row>
                                        ))}
                                    </>
                                )}
                            </Form.List>
                        </Col>

                        {/* Nominee Section */}
                        <Col sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Form.List name="nominees">
                                {(fields, { add, remove }) => (
                                    <>
                                        {/* Add Nominee Button */}
                                        <Row>
                                            <Col sm={22} md={22} lg={23} xl={23} xxl={23}>
                                                <Form.Item>
                                                    <Button
                                                        type="dashed"
                                                        onClick={() => add()}
                                                        block
                                                        icon={<PlusOutlined />}
                                                    >
                                                        Add Nominee
                                                    </Button>
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        {/* Dynamic Nominee Fields */}
                                        {fields.map(({ key, name, fieldKey, ...restField }) => (
                                            <Row key={key} gutter={8} style={{ marginBottom: 8 }} align="middle">
                                                {/* Select Nominee Field */}
                                                <Col sm={7} md={7} lg={7} xl={7} xxl={7}>

                                                    <Compact style={{ width: "100%" }}>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'nominee']}
                                                            fieldKey={[fieldKey, 'nominee']}
                                                            label="Select Nominee"
                                                            rules={[{ required: true, message: 'Select nominee!' }]}
                                                            style={{ width: "80%" }}
                                                        >
                                                            <Select placeholder="Select Nominee">
                                                                {owners && owners.data.map((dta) => {
                                                                    if (dta.userType === 'Nominee') {
                                                                        return <Option key={dta._id} value={dta._id}>
                                                                            {dta.ownerName.charAt(0).toUpperCase() + dta.ownerName.slice(1).toLowerCase() + ` [ ${dta.cnic} ] `}
                                                                        </Option>
                                                                    }
                                                                })}
                                                            </Select>
                                                        </Form.Item>

                                                        <Form.Item label=" " style={{ width: "20%" }}>
                                                            <Button style={{ width: "100%" }} onClick={() => {
                                                                setnominee(true)
                                                                setOwnerModalVisible(true)
                                                            }}>
                                                                <PlusOutlined />
                                                            </Button>
                                                        </Form.Item>
                                                    </Compact>
                                                </Col>

                                                {/* Select Owner Field for Each Nominee */}
                                                < Col sm={7} md={7} lg={7} xl={7} xxl={7} >
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'owner']}
                                                        fieldKey={[fieldKey, 'owner']}
                                                        label="Select Owner"
                                                        rules={[{ required: true, message: 'Select owner!' }]}
                                                    >
                                                        <Select placeholder="Select Owner">
                                                            {owners && owners.data.map((dta) => {
                                                                // if (dta.userType === 'Owner') {
                                                                return <Option key={dta._id} value={dta._id}>
                                                                    {dta.ownerName.charAt(0).toUpperCase() + dta.ownerName.slice(1).toLowerCase() + ` [ ${dta.cnic} ] `}
                                                                </Option>
                                                                // }
                                                            })}
                                                        </Select>
                                                    </Form.Item>
                                                </Col>

                                                {/* Nominee Relationship Field */}
                                                <Col sm={7} md={7} lg={7} xl={7} xxl={7}>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'relationship']}
                                                        fieldKey={[fieldKey, 'relationship']}
                                                        label="Relationship"
                                                        rules={[{ required: true, message: 'Enter relationship!' }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>

                                                {/* Remove Button */}
                                                <Col sm={2} md={2} lg={2} xl={2} xxl={2} style={{ textAlign: 'center' }}>
                                                    <MinusCircleOutlined
                                                        onClick={() => remove(name)}
                                                        style={{ color: 'red', fontSize: '16px' }}
                                                    />
                                                </Col>
                                            </Row>
                                        ))}
                                    </>
                                )}
                            </Form.List>
                        </Col>

                        <Col sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <FeatureAmenities propertyType={propertyType} />
                        </Col>
                        <Col sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <ExtraInfoEditor editorData={editorData} setEditorData={setEditorData} />
                        </Col>
                    </Row>

                    {/* Submit Button */}
                    <Row justify="end">
                        <Col>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" loading={btnloading}>
                                    Add Membership
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
            </Form >
        </Drawer >
    );
}

export default AddMembership;
