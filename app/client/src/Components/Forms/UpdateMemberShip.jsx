import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Steps, theme, message, Select, Col, Row, Divider } from 'antd';
import { useForm } from 'antd/es/form/Form';
import MembershipDetails from '../Tabs/MembershipDetails';
import { useDispatch, useSelector } from 'react-redux';
import LandLocation from '../Tabs/LandLocation';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import Compact from 'antd/es/space/Compact';
import OwnerModal from './OwnerModal';
import FeatureAmenities from '../Tabs/FeatureAmmenities';
import ExtraInfoEditor from '../Tabs/ExtraInfoEditor';
import { get_MemberShip_byId, updateMembershipThunk } from '../../App/Slice/membershipSlice';
import Swal from 'sweetalert2';

const UpdateMembership = () => {
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);
    const [form] = useForm();
    const [propertyType, setPropertyType] = useState('');
    const { membership } = useSelector(state => state.Membership);
    const { owners, loading } = useSelector(state => state.Owner);
    const [editorData, setEditorData] = useState('');
    const [owners_, setOwners_] = useState([]);
    const [nominees, setNominees] = useState([]); // State for nominees
    const [ownerModalVisible, setOwnerModalVisible] = useState(false);
    const [nominee_, setnominee_] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (membership) {
            form.setFieldsValue({
                phase: membership.phase?._id,
                block: membership.block?.block_name,
                plotNo: membership.plotNo,
                purpose: membership?.purpose,
                property: membership?.property,
                propertyType: membership?.propertyType,
                landSize: membership?.landSize,
                landUnit: membership?.landUnit === 'Sq. Yds' ? "squareYard" : membership?.landUnit,
                D1: membership?.D1,
                D2: membership?.D2,
                cost: membership?.cost,
                discountpkr: membership?.discountpkr,
                discountPer: membership?.discountPer,
                country: membership?.country,
                province: membership?.province,
                city: membership?.city,
                locationUrl: membership?.locationUrl,
                address: membership?.address,
                features: membership?.features
            });
            form.setFieldsValue({
                nominees: membership?.nominees?.map(dta => {
                    return {
                        nominee: dta?.nominee?._id,
                        owner: dta?.owner?._id,
                        relationship: dta?.relationship
                    };
                })
            });
            setEditorData(membership?.notes);
            setOwners_(membership?.owners);
            setNominees(membership?.nominees || []);
        }
    }, [membership]);

    const steps = [
        {
            title: 'Details',
            content: (
                <MembershipDetails mode={true} propertyType={propertyType} setPropertyType={setPropertyType} />
            ),
        },
        {
            title: 'Loc & Price',
            content: (
                <LandLocation form={form} mode={true} />
            ),
        },
        {
            title: 'Nominee',
            content: (
                <Col sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Divider />
                    <Form.List name="nominees" initialValue={nominees}>
                        {(fields, { add, remove }) => (
                            <>
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
                                {fields.map(({ key, name, fieldKey, ...restField }) => (
                                    <Row key={key} gutter={8} style={{ marginBottom: 8 }} align="middle">
                                        <Col sm={7} md={7} lg={10} xl={10} xxl={10}>
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
                                                        {owners?.data.map(dta => {
                                                            if (dta.userType === 'Nominee') {
                                                                return (
                                                                    <Select.Option key={dta._id} value={dta._id}>
                                                                        {`${dta.ownerName.charAt(0).toUpperCase() + dta.ownerName.slice(1).toLowerCase()} [ ${dta.cnic} ]`}
                                                                    </Select.Option>
                                                                );
                                                            }
                                                            return null;
                                                        })}
                                                    </Select>
                                                </Form.Item>
                                                <Form.Item label=" " style={{ width: "20%" }}>
                                                    <Button style={{ width: "100%" }} onClick={() => {
                                                        setnominee_(false);
                                                        setOwnerModalVisible(true);
                                                    }}>
                                                        <PlusOutlined />
                                                    </Button>
                                                </Form.Item>
                                            </Compact>
                                        </Col>
                                        <Col sm={7} md={7} lg={9} xl={9} xxl={9}>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'owner']}
                                                fieldKey={[fieldKey, 'owner']}
                                                label="Select Owner"
                                                rules={[{ required: true, message: 'Select owner!' }]}
                                            >
                                                <Select placeholder="Select Owner">
                                                    {owners_ && owners_?.map(dta => (
                                                        <Select.Option key={dta?.owner?._id} value={dta?.owner._id}>
                                                            {`${dta.owner.ownerName.charAt(0).toUpperCase() + dta.owner.ownerName.slice(1).toLowerCase()} [ ${dta.owner.cnic} ]`}
                                                        </Select.Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col sm={7} md={7} lg={3} xl={3} xxl={3}>
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
            ),
        },
        {
            title: 'Final',
            content: (
                <ExtraInfoEditor editorData={editorData} setEditorData={setEditorData} />
            ),
        },
    ];

    const next = () => {
        form.validateFields()
            .then(async (data) => {
                setCurrent(current + 1);
                const res = await dispatch(updateMembershipThunk({ id: membership?._id, data }));
                if (res.type.endsWith("fulfilled")) {
                    message.success("Updated Successfully")
                    dispatch(get_MemberShip_byId(membership._id))
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Update failed!',
                        text: JSON.stringify(res.payload, null, 2),
                    });
                }
            })
            .catch(() => {
                message.error('Please fill in all required fields!');
            });
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const handleFinish = async (values) => {
        const res = await dispatch(updateMembershipThunk({ id: membership?._id, data: { notes: editorData } }));
        if (res.type.endsWith("fulfilled")) {
            dispatch(get_MemberShip_byId(membership._id))
            Swal.fire({
                icon: 'success',
                title: 'Successfully updated!',
                text: 'Final details have been updated.',
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Update failed!',
                text: JSON.stringify(res.payload, null, 2),

            });
        }
    };

    const items = steps.map(item => ({
        key: item.title,
        title: item.title,
    }));

    const contentStyle = {
        // Custom styles...
    };

    return (
        <>
            <OwnerModal visible={ownerModalVisible} onClose={() => setOwnerModalVisible(false)} nominee={nominee_} />
            <Form layout="vertical" form={form} onFinish={handleFinish}>
                <Steps current={current} items={items} />
                <div style={contentStyle}>{steps[current].content}</div>
                <div style={{ marginTop: 24 }}>
                    {current < steps.length - 1 && (
                        <Button type="primary" onClick={next}>
                            Next
                        </Button>
                    )}
                    {current > 0 && (
                        <Button style={{ margin: '0 8px' }} onClick={prev}>
                            Previous
                        </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button type="primary" htmlType="submit">
                            Finish
                        </Button>
                    )}
                </div>
            </Form>
        </>
    );
};

export default UpdateMembership;
