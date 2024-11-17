import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Col, Flex, Row, Space, Tabs, Tag, Typography, Modal, Form } from 'antd';
import UpdateMemberShip from '../Forms/UpdateMemberShip';
import { useDispatch } from 'react-redux'
import { get_phases } from '../../App/Slice/phaseSlice';
import { get_Owners } from '../../App/Slice/ownerSlice';
function MemberShipTabOneDetails() {
    const { membership } = useSelector(state => state.Membership);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const dispatch = useDispatch()
    const showModal = () => {
        dispatch(get_phases());
        dispatch(get_Owners());
        setIsModalVisible(true);
    };

    const handleOk = () => {
        // Add your logic for when the modal is confirmed
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Flex justify='space-between'>
                <div className='haedingborder'>
                    Membership Details
                </div>
                <Button type='primary' onClick={showModal} ghost>Edit</Button>
            </Flex>
            <Row gutter={16}>
                <Col xl={6} sm={24} md={2} lg={6}>
                    <Typography.Text>Old Member Ship</Typography.Text>
                    <br />
                    <Typography.Text type='secondary'>{membership?.oldMembershipId}</Typography.Text>
                </Col>
                <Col xl={6} sm={24} md={2} lg={6}>
                    <Typography.Text>New Member Ship</Typography.Text>
                    <br />
                    <Typography.Text type='secondary'>{membership?.newMembershipId}</Typography.Text>
                </Col>
                <Col xl={6} sm={24} md={2} lg={6}>
                    <Typography.Text>Phase</Typography.Text>
                    <br />
                    <Typography.Text type='secondary'>{membership?.phase?.phase_name}</Typography.Text>
                </Col>
                <Col xl={6} sm={24} md={2} lg={6}>
                    <Typography.Text>Block</Typography.Text>
                    <br />
                    <Typography.Text type='secondary'>{membership?.block?.block_name}</Typography.Text>
                </Col>
                <Col xl={6} sm={24} md={2} lg={6}>
                    <Typography.Text>Purpose</Typography.Text>
                    <br />
                    <Typography.Text type='secondary'>{membership?.purpose}</Typography.Text>
                </Col>
                <Col xl={6} sm={24} md={2} lg={6}>
                    <Typography.Text>Property</Typography.Text>
                    <br />
                    <Typography.Text type='secondary'>{membership?.property}</Typography.Text>
                </Col>
                <Col xl={6} sm={24} md={2} lg={6}>
                    <Typography.Text>Property Type</Typography.Text>
                    <br />
                    <Typography.Text type='secondary'>{membership?.propertyType}</Typography.Text>
                </Col>
                <Col xl={6} sm={24} md={2} lg={6}>
                    <Typography.Text>Status</Typography.Text>
                    <br />
                    <Typography.Text type='secondary'>{membership?.status}</Typography.Text>
                </Col>
            </Row>
            <div className='haedingborder'>
                Land Location and Price
            </div>
            <Row gutter={16}>
                <Col xl={6} sm={24} md={2} lg={6}>
                    <Typography.Text>Covered Area</Typography.Text>
                    <br />
                    <Typography.Text type='secondary'>{membership?.landSize + " " + membership?.landUnit}</Typography.Text>
                </Col>
                <Col xl={6} sm={24} md={2} lg={6}>
                    <Typography.Text>Land Cost</Typography.Text>
                    <br />
                    <Typography.Text type='secondary'>{membership?.cost}</Typography.Text>
                </Col>
                <Col xl={6} sm={24} md={2} lg={6}>
                    <Typography.Text>Discount in Price</Typography.Text>
                    <br />
                    <Typography.Text type='secondary'>{membership?.discountPkr}</Typography.Text>
                </Col>
                <Col xl={6} sm={24} md={2} lg={6}>
                    <Typography.Text>Discount in Percentage</Typography.Text>
                    <br />
                    <Typography.Text type='secondary'>{membership?.discountPer}</Typography.Text>
                </Col>
                <Col xl={6} sm={24} md={2} lg={6}>
                    <Typography.Text>Country</Typography.Text>
                    <br />
                    <Typography.Text type='secondary'>{membership?.country}</Typography.Text>
                </Col>
                <Col xl={6} sm={24} md={2} lg={6}>
                    <Typography.Text>Province</Typography.Text>
                    <br />
                    <Typography.Text type='secondary'>{membership?.province}</Typography.Text>
                </Col>
                <Col xl={6} sm={24} md={2} lg={6}>
                    <Typography.Text>City</Typography.Text>
                    <br />
                    <Typography.Text type='secondary'>{membership?.city}</Typography.Text>
                </Col>
                <Col xl={6} sm={24} md={2} lg={6}>
                    <Typography.Text>Location</Typography.Text>
                    <br />
                    <Typography.Text type='secondary'>{membership?.locationUrl}</Typography.Text>
                </Col>
                <Col xl={8} sm={24} md={2} lg={8}>
                    <Typography.Text>Address</Typography.Text>
                    <br />
                    <Typography.Text type='secondary'>{membership?.address}</Typography.Text>
                </Col>
            </Row>
            <div className='haedingborder'>
                Owner Details
            </div>
            <Row gutter={[16, 16]}>
                {membership?.owners?.map((item, index) => (
                    <Col key={index} span={24}>
                        <div
                            style={{
                                padding: "10px",
                                borderRadius: "4px",
                                backgroundColor: "#fafafa",
                            }}
                        >
                            <Row justify="space-between">
                                <Col>
                                    <Typography.Text strong>Owner Name: </Typography.Text>
                                    <Typography.Text>{item.owner.ownerName}</Typography.Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <Typography.Text strong>Family Name: </Typography.Text>
                                    <Typography.Text>{item.owner.familyName}</Typography.Text>
                                </Col>
                                <Col span={12}>
                                    <Typography.Text strong>Email: </Typography.Text>
                                    <Typography.Text>{item.owner.email}</Typography.Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <Typography.Text strong>Phone Number: </Typography.Text>
                                    <Typography.Text>{item.owner.phoneNumber}</Typography.Text>
                                </Col>
                                <Col span={12}>
                                    <Typography.Text strong>WhatsApp: </Typography.Text>
                                    <Typography.Text>{item.owner.whatsappNumber}</Typography.Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <Typography.Text strong>CNIC: </Typography.Text>
                                    <Typography.Text>{item.owner.cnic}</Typography.Text>
                                </Col>
                                <Col span={12}>
                                    <Typography.Text strong>Country: </Typography.Text>
                                    <Typography.Text>{item.owner.country}</Typography.Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <Typography.Text strong>Permanent Address: </Typography.Text>
                                    <Typography.Text>{item.owner.permanentAddress}</Typography.Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <Typography.Text strong>Share: </Typography.Text>
                                    <Typography.Text>{item.share}</Typography.Text>
                                </Col>
                                <Col span={12}>
                                    <Typography.Text strong>Date Added: </Typography.Text>
                                    <Typography.Text>{item.dateAdded}</Typography.Text>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                ))}
            </Row>
            <div className='haedingborder'>
                Nominee Details
            </div>
            <Row gutter={[16, 16]}>
                {membership?.nominees?.map((item, index) => (
                    <Col key={index} span={24}>
                        <div
                            style={{
                                padding: "10px",
                                borderRadius: "4px",
                                marginBottom: "16px",
                            }}
                        >
                            <Row justify="space-between">
                                <Col>
                                    <Typography.Text strong>Owner Name: </Typography.Text>
                                    <Typography.Text>{item.owner.ownerName}</Typography.Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <Typography.Text strong>Nominee Name: </Typography.Text>
                                    <Typography.Text>{item.nominee.ownerName}</Typography.Text>
                                </Col>
                                <Col span={12}>
                                    <Typography.Text strong>Relationship: </Typography.Text>
                                    <Typography.Text>{item.relationship}</Typography.Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <Typography.Text strong>Nominee Email: </Typography.Text>
                                    <Typography.Text>{item.nominee.email}</Typography.Text>
                                </Col>
                                <Col span={12}>
                                    <Typography.Text strong>Nominee Phone: </Typography.Text>
                                    <Typography.Text>{item.nominee.phoneNumber}</Typography.Text>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                ))}
            </Row>
            <Modal title="Edit Membership Details"
                destroyOnClose={true}
                style={{ top: "20px" }} zIndex={1000} footer={false} width={800} open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <UpdateMemberShip />
            </Modal>
        </>
    );
}

export default MemberShipTabOneDetails;
