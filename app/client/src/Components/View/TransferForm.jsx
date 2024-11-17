import { Card, Col, Flex, Image, Row, Typography } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux';
import dayjs from 'dayjs'
function TransferForm({ componentRef }) {
    const { application } = useSelector(state => state.transfer);
    let data = application?.transfer
    console.log('application', application
    )
    return (
        <Flex justify='center' style={{ height: "100%", display: "none", overflow: "auto", }}>
            <div ref={componentRef} style={{ width: "100%", }}>
                <div style={{
                    width: "100%",
                    minHeight: "100vh",
                    backgroundColor: "white",
                    border: "1px solid black",
                    boxSizing: 'border-box',
                    marginBottom: "5px"
                }}>
                    <div className='topImage'>
                        <p align="center" style={{}}>
                            <br />
                            <Typography.Title level={2} style={{ letterSpacing: "2px", color: "white", }}>
                                Islamabad Cooperative Housing Society
                            </Typography.Title>
                        </p>
                    </div>
                    <Flex align='center' justify='space-between' style={{ marginTop: "-30px" }}>
                        <Flex gap={4} style={{ marginLeft: "40px" }} vertical>
                            <Typography.Title level={3} >Transfer Form</Typography.Title>
                            <Flex gap={4}>
                                <Typography.Text>Regestration No </Typography.Text>
                                <Typography.Text underline>{data?.fileId?.newMembershipId} </Typography.Text>

                            </Flex>
                            <Flex gap={4}>
                                <Typography.Text>Date   </Typography.Text>
                                <Typography.Text underline>{data?.createdAt && dayjs(data?.createdAt).format('DD MMM YYYY')}</Typography.Text>

                            </Flex>



                        </Flex>
                        <Image src='https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?w=740&t=st=1727616041~exp=1727616641~hmac=35d63c58b353764fa92b98633b25b62e6168db6d4580476c2fcf5a38754308e2' style={{ marginRight: "40px", width: "100px", height: "100px" }} />
                    </Flex>
                    <div style={{ margin: "40px" }}>
                        <Typography.Paragraph>

                            I have purchased the fellowing file from
                            {data?.sellerName?.map((dta, i) => <> <Typography.Text underline> {dta?.owner?.ownerName + " / "} </Typography.Text> <Typography.Text underline>{dta?.owner?.familyName + " / "}</Typography.Text>  <Typography.Text underline>{dta?.owner?.cnic + " , "}</Typography.Text></>)} Aganist which full payment  has been made by me through banking instrument # _____________ Dated <Typography.Text underline>{data?.createdAt && dayjs(data?.createdAt).format('DD MMM YYYY')}</Typography.Text> amounting  to Rs  <Typography.Text underline>{data?.fileId?.cost && dayjs(data?.createdAt).format('DD MMM YYYY')}</Typography.Text> /-  I will pay  all the taxes application if this file is transferred to me please transferred the below file  to me. Please transfer the below mentioned file in my name.


                        </Typography.Paragraph>
                        <Typography.Title level={5} underline>Plot Details</Typography.Title>
                        <Typography.Paragraph>
                            Regestration  No   <Typography.Text underline>{data?.fileId?.newMembershipId}</Typography.Text>  Plot #    <Typography.Text underline>{data?.fileId?.plotNo} </Typography.Text>
                            Phase     <Typography.Text underline>{data?.fileId?.phase}</Typography.Text>  Block     <Typography.Text underline>{data?.fileId?.block}</Typography.Text>  Street     <Typography.Text underline>{data?.fileId?.address}</Typography.Text> area     <Typography.Text underline>{data?.fileId?.landSize}  {data?.fileId?.landUnit}</Typography.Text> Transfer #     <Typography.Text underline>  {data?.fileId?.transferCount}</Typography.Text>
                        </Typography.Paragraph>
                        <Typography.Title level={5} underline>Purchaser Details</Typography.Title>
                        <Typography.Paragraph>
                            Name {data?.purchasers?.map((dta, i) => <> <Typography.Text underline> {dta?.owner?.ownerName}  </Typography.Text></>)}
                            F/H  Name:  {data?.purchasers?.map((dta, i) => <><Typography.Text underline>{dta?.owner?.familyName}</Typography.Text></>)}
                            Cnic {data?.purchasers?.map((dta, i) => <><Typography.Text underline>{dta?.owner?.cnic}</Typography.Text></>)}
                            Phone  {data?.purchasers?.map((dta, i) => <><Typography.Text underline>{dta?.owner?.phoneNumber}</Typography.Text></>)}
                            Address  {data?.purchasers?.map((dta, i) => <><Typography.Text underline>{dta?.owner?.permanentAddress}</Typography.Text></>)}
                            Share  {data?.purchasers?.map((dta, i) => <><Typography.Text underline>{dta?.share}</Typography.Text></>)}
                        </Typography.Paragraph>
                        <Row>
                            <Col span={12}  >
                                <Typography.Title level={5}> Purchaser </Typography.Title>
                                <br />
                                <Typography.Text >{data?.purchasers?.map((dta, i) => <> <Typography.Text > {dta?.owner?.ownerName}  </Typography.Text></>)}</Typography.Text>
                                <br />
                                <Typography.Text >{data?.purchasers?.map((dta, i) => <> <Typography.Text > {dta?.owner?.familyName}  </Typography.Text></>)}</Typography.Text>
                                <br />
                                <Typography.Text >{data?.purchasers?.map((dta, i) => <> <Typography.Text > {dta?.owner?.cnic}  </Typography.Text></>)}</Typography.Text>

                            </Col>
                            <Col span={12}  >
                                <Typography.Title level={5}> Purchaser Witness</Typography.Title>
                                <br />
                                <Typography.Text style={{ textTransform: "capitalize" }}>{data?.purchaserWitness?.ownerName}</Typography.Text>
                                <br />
                                <Typography.Text style={{ textTransform: "capitalize" }} >{data?.purchaserWitness?.familyName}</Typography.Text>
                                <br />
                                <Typography.Text style={{ textTransform: "capitalize" }}>{data?.purchaserWitness?.cnic}</Typography.Text>
                            </Col>
                        </Row>
                        <Typography.Title level={5} underline>Decelarition by Seller</Typography.Title>
                        <Typography.Paragraph> I hereby confirm that i have sold the above plot to Mr. /Ms. {data?.purchasers?.map((dta, i) => <> <Typography.Text underline> {dta?.owner?.ownerName}  </Typography.Text></>)} against which  i have received full and final payment as mentioned above. If any taxes are due against me, I hereby undertake to pay the dame.
                        </Typography.Paragraph>


                        <Row>
                            <Col span={12}  >
                                <Typography.Title level={5}> Seller </Typography.Title>
                                <br />
                                <Typography.Text >{data?.sellerName?.map((dta, i) => <> <Typography.Text > {dta?.owner?.ownerName}  </Typography.Text></>)}</Typography.Text>
                                <br />
                                <Typography.Text >{data?.sellerName?.map((dta, i) => <> <Typography.Text > {dta?.owner?.familyName}  </Typography.Text></>)}</Typography.Text>
                                <br />
                                <Typography.Text >{data?.sellerName?.map((dta, i) => <> <Typography.Text > {dta?.owner?.cnic}  </Typography.Text></>)}</Typography.Text>

                            </Col>
                            <Col span={12}  >
                                <Typography.Title level={5}> Seller Witnss</Typography.Title>
                                <br />
                                <Typography.Text style={{ textTransform: "capitalize" }}>{data?.sellerWitness?.ownerName}</Typography.Text>
                                <br />
                                <Typography.Text style={{ textTransform: "capitalize" }} >{data?.sellerWitness?.familyName}</Typography.Text>
                                <br />
                                <Typography.Text style={{ textTransform: "capitalize" }}>{data?.sellerWitness?.cnic}</Typography.Text>
                            </Col>
                        </Row>
                    </div>

                </div>

            </div>
        </Flex >
    )
}

export default TransferForm