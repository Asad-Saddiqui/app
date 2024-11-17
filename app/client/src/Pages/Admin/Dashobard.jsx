import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Divider, Flex, Row, Statistic, Tag, Typography } from 'antd'
import { Progress } from 'antd';
import React, { useEffect } from 'react'
import { get_Owners } from '../../App/Slice/ownerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { get_MemberShip } from '../../App/Slice/membershipSlice';

export default function Dashobard() {

    const dispatch = useDispatch()
    const { memberships } = useSelector(state => state.Membership);
    const { owners } = useSelector(state => state.Owner);

    useEffect(() => {
        dispatch(get_Owners());
        dispatch(get_MemberShip());

    }, [])
    const getPercentage = (files, sts) => {
        return Math.round((files?.filter(dta => dta.status === sts)?.length / files?.length) * 100)
    }
    return (
        <div>
            <Row gutter={[16, 16]}>
                <Col xl={6} xxl={6} lg={6} md={12} sm={12} xs={24} >
                    <Card
                        title={"File"}
                        bordered={false}
                        style={{
                            width: "100%",
                            textAlign: "center",

                            boxShadow: "0 0 20px 3px #96beee26"
                        }}
                    >
                        <Flex justify='space-between' align='center'>

                            <Typography.Text type='secondary'>Total</Typography.Text>
                            <Tag bordered={false} color='purple'>{memberships?.length}</Tag>
                        </Flex>
                    </Card>
                </Col>
                <Col xl={6} xxl={6} lg={6} md={12} sm={12} xs={24} >
                    <Card

                        bordered={false}
                        title="Members"
                        style={{
                            width: "100%",
                            textAlign: "center",
                            boxShadow: "0 0 20px 3px #96beee26"
                        }}
                    >
                        <Flex justify='space-between' align='center'>

                            <Typography.Text type='secondary'>Total</Typography.Text>
                            <Tag bordered={false} color='success'> {owners?.data?.length}</Tag>
                        </Flex>

                    </Card>
                </Col>
                <Col xl={6} xxl={6} lg={6} md={12} sm={12} xs={24} >
                    <Card

                        bordered={false}
                        title="Active Member"
                        style={{
                            width: "100%",
                            textAlign: "center",

                            boxShadow: "0 0 20px 3px #96beee26"
                        }}
                    >
                        <Flex justify='space-between' align='center'>

                            <Typography.Text type='secondary'>Total</Typography.Text>
                            <Tag bordered={false} color='blue'> {owners?.data?.filter(dta => dta.status === "Active")?.length}</Tag>
                        </Flex>
                    </Card>
                </Col>
                <Col xl={6} xxl={6} lg={6} md={12} sm={12} xs={24} >
                    <Card
                        title="Inactive Member"
                        bordered={false}
                        style={{
                            textAlign: "center",
                            width: "100%",
                            boxShadow: "0 0 20px 3px #96beee26"
                        }}
                    >
                        <Flex justify='space-between' align='center'>
                            <Typography.Text type='secondary'>Total</Typography.Text>
                            <Tag bordered={false} color='blue'> {owners?.data?.filter(dta => dta.status !== "Active")?.length}</Tag>
                        </Flex>
                    </Card>
                </Col>
                <Col xl={18} xxl={18} lg={18} md={24} sm={24} xs={24} >
                    <Card
                        bordered={false}
                        style={{
                            width: "100%",
                            textAlign: "center",
                            boxShadow: "0 0 20px 3px #96beee26"
                        }}
                    >
                        <Row gutter={[16, 16]}>
                            <Col xl={12} xxl={12} lg={12} md={12} sm={24} xs={24} >
                                <Typography.Title level={5}>File Status
                                </Typography.Title>
                                <Flex
                                    vertical
                                    gap="small"
                                    style={{
                                        width: "100%",
                                        textAlign: "start"
                                    }}
                                >
                                    <div>
                                        <div>Draft</div>
                                        <Progress percent={getPercentage(memberships, "Draft")} size="large" strokeColor="#f50" /> {/* Red */}
                                    </div>
                                    <div>
                                        <div>Pending</div>
                                        <Progress percent={getPercentage(memberships, "Pending")} size="large" strokeColor="#faad14" /> {/* Yellow */}
                                    </div>
                                    <div>
                                        <div>Open</div>
                                        <Progress percent={getPercentage(memberships, "Open")} size="large" strokeColor="#1890ff" /> {/* Blue */}
                                    </div>
                                    <div>
                                        <div>Open File</div>
                                        <Progress percent={getPercentage(memberships, "Open File")} size="large" strokeColor="#ff4d4f" /> {/* Red */}
                                    </div>

                                    <div>
                                        <div>Closed</div>
                                        <Progress percent={getPercentage(memberships, "Closed")} size="large" strokeColor="#87d068" /> {/* Light Green */}
                                    </div>
                                    <div>
                                        <div>Unpaid</div>
                                        <Progress percent={getPercentage(memberships, "Approved by Manager")} size="large" strokeColor="#52c41a" /> {/* Green */}
                                    </div>
                                </Flex>
                            </Col>

                            <Col xl={12} xxl={12} lg={12} md={12} sm={24} xs={24} >
                                <Typography.Title level={5}>Offers
                                </Typography.Title>
                                <Flex
                                    vertical
                                    gap="small"
                                    style={{
                                        width: "100%",
                                        textAlign: "start"
                                    }}
                                >
                                    <div>
                                        <div>Draft</div>
                                        <Progress percent={0} size="large" strokeColor="#f50" /> {/* Red */}
                                    </div>
                                    <div>
                                        <div>Pending</div>
                                        <Progress percent={0} size="large" strokeColor="#faad14" /> {/* Yellow */}
                                    </div>
                                    <div>
                                        <div>Sent</div>
                                        <Progress percent={0} size="large" strokeColor="#1890ff" /> {/* Blue */}
                                    </div>
                                    <div>
                                        <div>Declined</div>
                                        <Progress percent={0} size="large" strokeColor="#ff4d4f" /> {/* Red */}
                                    </div>
                                    <div>
                                        <div>Accepted</div>
                                        <Progress percent={0} size="large" strokeColor="#52c41a" /> {/* Green */}
                                    </div>
                                    <div>
                                        <div>Expired</div>
                                        <Progress percent={0} size="large" strokeColor="#d9d9d9" /> {/* Grey */}
                                    </div>
                                </Flex>
                            </Col>
                        </Row>


                    </Card>
                </Col>
                <Col xl={6} xxl={6} lg={6} md={24} sm={24} xs={24} >
                    <Card

                        bordered={false}
                        style={{
                            width: "100%",
                            textAlign: "center",
                            boxShadow: "0 0 20px 3px #96beee26"
                        }}
                    >
                        <Row gutter={[16, 16]}>
                            <Col span={24}>

                                <Typography.Title level={5}>Customers
                                </Typography.Title>
                                <Flex
                                    vertical
                                    gap="small"
                                    style={{
                                        width: '100%',
                                        marginTop: "30px",

                                        textAlign: "center",
                                        marginBottom: "25px"
                                    }}
                                >
                                    <Progress
                                        type="circle"
                                        percent={75}
                                        strokeColor="rgb(82, 196, 26)"
                                        strokeWidth={8}
                                        style={{
                                            // transform: 'rotate(-90deg)', // Rotate to start from the top
                                            transformOrigin: 'center',
                                        }}
                                        // Custom styles
                                        strokeLinecap="round" // Rounded ends of the stroke
                                        trailColor="#d9d9d9" // Color of the background track
                                    // width={100}
                                    />

                                </Flex>
                                <Typography.Text>New Customer This Month

                                </Typography.Text>
                                <Divider />
                                <Statistic
                                    title="Active Customer
"
                                    value={9.3}
                                    precision={2}
                                    valueStyle={{
                                        color: '#3f8600',
                                    }}
                                    prefix={<ArrowUpOutlined />}
                                    suffix="%"
                                />
                            </Col>
                        </Row>

                    </Card>
                </Col>

                <Col xl={12} xxl={12} lg={12} md={24} sm={24} xs={24} >
                    <Card
                        title="Invoices"
                        bordered={false}
                        style={{
                            width: "100%",
                            textAlign: "center",

                            boxShadow: "0 0 20px 3px #96beee26"
                        }}
                    >
                        <Flex justify='space-between' align='center'>

                            <Typography.Text type='secondary'>This Month</Typography.Text>
                            <Tag bordered={false} color='purple'> 550$</Tag>
                        </Flex>
                    </Card>
                </Col>
                <Col xl={12} xxl={12} lg={12} md={24} sm={24} xs={24} >
                    <Card

                        bordered={false}
                        title="Proforma Invoices"
                        style={{
                            width: "100%",
                            textAlign: "center",
                            boxShadow: "0 0 20px 3px #96beee26"
                        }}
                    >
                        <Flex justify='space-between' align='center'>

                            <Typography.Text type='secondary'>This Month</Typography.Text>
                            <Tag bordered={false} color='success'> 500$</Tag>
                        </Flex>

                    </Card>
                </Col>
            </Row>

        </div>
    )
}