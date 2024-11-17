import { Flex, Modal, Button, Drawer, Typography, Watermark, Avatar, Image, Divider, Tag } from 'antd';
import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import './printStyle.css'
const { Title, Paragraph } = Typography;
const PrintDataModal = ({ visible, onClose, data }) => {
    const ownersList = data.map(property => {
        return property.owners.map(ownerData => {
            return {
                ...ownerData.owner, // Spread operator to include all owner details
                propertyId: property.propertyId, // Include property-specific data if needed
                propertyName: property.propertyName,
                location: property.location
            };
        });
    });

    // Flatten the result in case there are multiple owners per property
    const flattenedOwnersList = ownersList.flat();
    const componentRef = useRef();
    const CurrentFormattedDate = () => {
        // Create a new Date object
        const currentDate = new Date();
        // Format the date: day, month, and year
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = currentDate.toLocaleDateString('en-US', options);

        return (
            <strong>{formattedDate}</strong>
        );
    };
    const styles = {
        declarationContainer: {
            // border: '1px solid #e0e0e0',
            // borderRadius: '5px',
            padding: '20px',
            margin: '10px 0',
            backgroundColor: '#f9f9f9',
            // boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        },
        declarationTitle: {
            fontWeight: 'bold',
            // marginBottom: '10px',
        },
        declarationText: {
            margin: '5px 0',
            lineHeight: '1.6',
            fontSize: '14px',
        },
    };
    return (
        <>
            <Drawer open={visible} onClose={onClose} width={1000} extra={<ReactToPrint
                key="print"
                trigger={() => <Button type="primary">Print</Button>}
                content={() => componentRef.current}
            />}>
                <Flex justify='center' style={{ height: "100%", overflow: "auto", }}>
                    <div ref={componentRef} style={{ width: "100%", }}>
                        {data?.map((item, i) => (
                            <div key={i} style={{
                                width: "100%",
                                minHeight: "100vh",
                                backgroundColor: "white",
                                border: "1px solid black",
                                boxSizing: 'border-box', // Include padding and border in width and height
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
                                <Flex align='center' justify='space-between' style={{ marginTop: "-20px" }}>
                                    <Typography.Title level={3} style={{ marginLeft: "40px" }}>Application Form</Typography.Title>
                                    <Image src='https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?w=740&t=st=1727616041~exp=1727616641~hmac=35d63c58b353764fa92b98633b25b62e6168db6d4580476c2fcf5a38754308e2' style={{ marginRight: "40px", width: "100px", height: "100px" }} />
                                </Flex>
                                {/* <Watermark content="ICHS" > */}
                                <div style={{ padding: "20px" }}>

                                    <Flex style={{ width: "100%", padding: "0px 10px" }}>
                                        <Flex align='center' style={{ width: "33%" }}>
                                            <Typography.Text> Old Membership : </Typography.Text>
                                            <div style={{ width: "50%", textAlign: "center", borderBottom: "1px solid black" }}>
                                                <strong>    001</strong>
                                            </div>
                                        </Flex>
                                        <Flex align='center' style={{ width: "33%" }}>
                                            <Typography.Text> New Membership : </Typography.Text>
                                            <div style={{ width: "50%", textAlign: "center", borderBottom: "1px solid black" }}>
                                                <strong>    001</strong>
                                            </div>
                                        </Flex>
                                    </ Flex>
                                    <Flex style={{ marginTop: "20px", width: "100%", padding: "0px 10px" }}>
                                        <Flex align='center' style={{ width: "25%" }}>
                                            <Typography.Text> Phase  : </Typography.Text>
                                            <div style={{ width: "70%", textAlign: "center", borderBottom: "1px solid black" }}>
                                                <strong> 1</strong>
                                            </div>
                                        </Flex>
                                        <Flex align='center' style={{ width: "25%" }}>
                                            <Typography.Text> Block  : </Typography.Text>
                                            <div style={{ width: "70%", textAlign: "center", borderBottom: "1px solid black" }}>
                                                <strong> A </strong>
                                            </div>
                                        </Flex>
                                        <Flex align='center' style={{ width: "20%" }}>
                                            <Typography.Text> Street  : </Typography.Text>
                                            <div style={{ width: "70%", textAlign: "center", borderBottom: "1px solid black" }}>
                                                <strong> 8 </strong>
                                            </div>
                                        </Flex>
                                        <Flex align='center' style={{ width: "24%" }}>
                                            <Typography.Text> Plot No  : </Typography.Text>
                                            <div style={{ width: "50%", textAlign: "center", borderBottom: "1px solid black" }}>
                                                <strong> 8 </strong>
                                            </div>
                                        </Flex>
                                    </ Flex>
                                    <Flex style={{ marginTop: "20px", width: "100%", padding: "0px 10px" }}>

                                        <Flex align='center'>
                                            <Typography.Text> Property  : </Typography.Text>
                                            <div style={{ width: "150px", textAlign: "center", borderBottom: "1px solid black" }}>
                                                <strong> Plot </strong>
                                            </div>
                                        </Flex>
                                        <Flex align='center'>
                                            <Typography.Text> Property Type  : </Typography.Text>
                                            <div style={{ width: "150px", textAlign: "center", borderBottom: "1px solid black" }}>
                                                <strong> Resedenital Plot </strong>
                                            </div>
                                        </Flex>

                                    </ Flex>
                                    <Flex style={{ marginTop: "20px", width: "100%", padding: "0px 10px" }}>
                                        <Flex align='center'>
                                            <Typography.Text> Area  : </Typography.Text>
                                            <div style={{ width: "120px", textAlign: "center", borderBottom: "1px solid black" }}>
                                                <strong> 20 Marla</strong>
                                            </div>
                                        </Flex>



                                    </ Flex>
                                    <Flex style={{ marginTop: "20px", width: "100%", padding: "0px 10px" }}>
                                        <Flex align='center'>
                                            <Typography.Text> Name  : </Typography.Text>
                                            <div style={{ width: "650px", textAlign: "start", borderBottom: "1px solid black" }}>
                                                <strong style={{ marginLeft: "10px" }}> Asad Tarid Saddiqui</strong>
                                            </div>
                                        </Flex>
                                    </ Flex>
                                    <Flex style={{ marginTop: "20px", width: "100%", padding: "0px 10px" }}>
                                        <Flex align='center'>
                                            <Typography.Text> Father's / Husband's Name  : </Typography.Text>
                                            <div style={{ width: "520px", textAlign: "start", borderBottom: "1px solid black" }}>
                                                <strong style={{ marginLeft: "10px" }}> Tariq Hussain</strong>
                                            </div>
                                        </Flex>
                                    </ Flex>
                                    <Flex style={{ marginTop: "20px", width: "100%", padding: "0px 10px" }}>
                                        <Flex align='center'>
                                            <Typography.Text>Residentail / Postal Address  : </Typography.Text>
                                            <div style={{ width: "530px", textAlign: "start", borderBottom: "1px solid black" }}>
                                                <strong style={{ marginLeft: "10px" }}> House  932 , street 9, Asifabad, wahcantt, Taxila Pakistan</strong>
                                            </div>
                                        </Flex>
                                    </ Flex>
                                    <Flex style={{ marginTop: "20px", width: "100%", padding: "0px 10px" }}>
                                        <Flex align='center'>
                                            <Typography.Text> Country  : </Typography.Text>
                                            <div style={{ width: "120px", textAlign: "start", borderBottom: "1px solid black" }}>
                                                <strong> Pakistan</strong>
                                            </div>
                                        </Flex>
                                        <Flex align='center'>
                                            <Typography.Text> City  : </Typography.Text>
                                            <div style={{ width: "140px", textAlign: "start", borderBottom: "1px solid black" }}>
                                                <strong>Islamabad</strong>
                                            </div>
                                        </Flex>
                                        <Flex align='center'>
                                            <Typography.Text> CNIC : </Typography.Text>
                                            <div style={{ width: "130px", textAlign: "start", borderBottom: "1px solid black" }}>
                                                <strong> 99999 3223233 4 </strong>
                                            </div>
                                        </Flex>
                                        <Flex align='center'>
                                            <Typography.Text> Age   : </Typography.Text>
                                            <div style={{ width: "80px", textAlign: "center", borderBottom: "1px solid black" }}>
                                                <strong> 50</strong>
                                            </div>
                                        </Flex>

                                    </ Flex>
                                    <Flex style={{ marginTop: "20px", width: "100%", padding: "0px 10px" }}>
                                        <Flex align='center'>
                                            <Typography.Text> Occupation  : </Typography.Text>
                                            <div style={{ width: "150px", textAlign: "start", borderBottom: "1px solid black" }}>
                                                <strong> Software Engineer</strong>
                                            </div>
                                        </Flex>
                                        <Flex align='center'>
                                            <Typography.Text> Mobile #  : </Typography.Text>
                                            <div style={{ width: "150px", textAlign: "start", borderBottom: "1px solid black" }}>
                                                <strong>9999999999999</strong>
                                            </div>
                                        </Flex>
                                        <Flex align='center'>
                                            <Typography.Text> whatsapp # : </Typography.Text>
                                            <div style={{ width: "150px", textAlign: "start", borderBottom: "1px solid black" }}>
                                                <strong> 9999999999999 </strong>
                                            </div>
                                        </Flex>


                                    </ Flex>
                                    <Flex style={{ marginTop: "20px", width: "100%", padding: "0px 10px" }}>

                                        <Flex align='center'>
                                            <Typography.Text> NTN #   : </Typography.Text>
                                            <div style={{ width: "150px", textAlign: "start", borderBottom: "1px solid black" }}>
                                                <strong> 99999999999</strong>
                                            </div>
                                        </Flex>
                                        <Flex align='center'>
                                            <Typography.Text> Email  : </Typography.Text>
                                            <div style={{ width: "300px", textAlign: "start", borderBottom: "1px solid black" }}>
                                                <strong> asadsaddiqui101@gmail.com</strong>
                                            </div>
                                        </Flex>

                                    </ Flex>
                                    <Divider>Nominee</Divider>
                                    <Flex style={{ marginTop: "20px", width: "100%", padding: "0px 10px" }}>

                                        <Flex align='center'>
                                            <Typography.Text> Name   : </Typography.Text>
                                            <div style={{ width: "250px", textAlign: "start", borderBottom: "1px solid black" }}>
                                                <strong> Tayyab </strong>
                                            </div>
                                        </Flex>
                                        <Flex align='center'>
                                            <Typography.Text> Relation  : </Typography.Text>
                                            <div style={{ width: "150px", textAlign: "start", borderBottom: "1px solid black" }}>
                                                <strong> Brother</strong>
                                            </div>
                                        </Flex>
                                        <Flex align='center'>
                                            <Typography.Text> CNIC  : </Typography.Text>
                                            <div style={{ width: "150px", textAlign: "start", borderBottom: "1px solid black" }}>
                                                <strong> 9999999999999999</strong>
                                            </div>
                                        </Flex>

                                    </ Flex>
                                    <Flex style={{ marginTop: "20px", width: "100%", padding: "0px 10px" }}>

                                        <Flex align='center'>
                                            <Typography.Text> Name   : </Typography.Text>
                                            <div style={{ width: "250px", textAlign: "start", borderBottom: "1px solid black" }}>
                                                <strong> Afaq Tariq  </strong>
                                            </div>
                                        </Flex>
                                        <Flex align='center'>
                                            <Typography.Text> Relation  : </Typography.Text>
                                            <div style={{ width: "150px", textAlign: "start", borderBottom: "1px solid black" }}>
                                                <strong> Brother</strong>
                                            </div>
                                        </Flex>
                                        <Flex align='center'>
                                            <Typography.Text> CNIC  : </Typography.Text>
                                            <div style={{ width: "150px", textAlign: "start", borderBottom: "1px solid black" }}>
                                                <strong> 9999999999999999</strong>
                                            </div>
                                        </Flex>

                                    </ Flex>
                                    <div style={styles.declarationContainer}>
                                        <Title level={4} style={styles.declarationTitle}>DECLARATION:</Title>
                                        <Paragraph style={styles.declarationText}>
                                            (I) I, hereby declare that I have read and understood the terms and conditions of booking of plot in the project and accept the same.
                                        </Paragraph>
                                        <Paragraph style={styles.declarationText}>
                                            (ii) I further agree to pay regularly the installments and dues etc., and abide by all the existing rules and regulations and those, which may be prescribed by the Company from time to time.
                                        </Paragraph>
                                    </div>
                                </div>
                                <Flex justify="space-between" style={{ marginTop: "10px", width: "100%", padding: "0px 20px" }}>

                                    <Flex align='center'>
                                        <Typography.Text> Date   : </Typography.Text>
                                        <div style={{ width: "250px", textAlign: "start", borderBottom: "1px solid black" }}>
                                            <strong> {CurrentFormattedDate()}  </strong>
                                        </div>
                                    </Flex>
                                    <Flex align='center'>
                                        <Typography.Text> Signature   : </Typography.Text>
                                        <div style={{ width: "250px", textAlign: "start", borderBottom: "1px solid black" }}>
                                            <strong>   </strong>
                                        </div>
                                    </Flex>

                                </ Flex>
                                {/* </Watermark> */}

                            </div>
                        ))}
                    </div>
                </Flex>
            </Drawer >
        </>

    );
};

export default PrintDataModal;
