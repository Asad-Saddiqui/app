import { Button, Col, Flex, Row, Space, Typography } from 'antd';
import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import './InstallmentReceipt.css'
function InstallmentReceipt({ componentRef2 }) {

    const receiptData = {
        regNo: "0001",
        plotNo: "09",
        name: "Asad Tariq",
        paymentDate: "October 12, 2024",
        cnicNo: "782389423872938492",
        address: "Wahcant, Taxila, Pakistan",
        paymentType: "Bank Transfer",
        amountPaid: "5000 PKR"
    };

    return (
        <div>
            {/* Button to trigger print */}


            {/* Receipt content to be printed */}
            <div style={{ display: "none" }}>
                <div ref={componentRef2} style={{ padding: "18px", minHeight: "100vh", justifyContent: "space-between" }}>
                    <div class="" style={{ borderBottom: "3px dashed black", marginTop: "" }}>

                        <Flex justify='space-between' align='center'>
                            <Typography.Title level={4}>ICHS (Pvt).Ltd</Typography.Title>
                            <div >
                                <strong >Receipt No: </strong>
                                <span style={stylebox} >123</span>
                            </div>
                        </Flex>
                        <div class="details">
                            <Flex justify='space-between' style={{ width: "100%" }} >
                                <Flex justify='' align='center' style={{ width: "70%" }}>
                                    <div style={{ width: "51%" }} >
                                        <strong >Registration No. / File No: </strong>
                                    </div>

                                    <span>
                                        <div style={{ width: "100%", border: "1px solid black", padding: "2px 8px" }} >10760</div>
                                    </span>
                                    <span>
                                        <div style={{ width: "100%", border: "1px solid black", padding: "2px 8px" }} >25x50</div>
                                    </span>
                                </Flex>
                                <Flex justify='space-between' align='center' style={{ width: "50%" }}>
                                    <div style={{ width: "70%" }} >
                                        <strong >Payment Date: </strong>
                                    </div>
                                    <span style={{ width: "200px" }}>
                                        <div style={{ width: "100%", border: "1px solid black", padding: "2px 8px" }} >10/23/2024</div>
                                    </span>
                                </Flex>

                            </Flex>
                            <Flex justify='space-between' style={{ width: "100%", marginTop: "4px" }} >
                                <Flex justify='' align='center' style={{ width: "100%" }}>
                                    <div style={{ width: "30%" }} >
                                        <strong >Received With Thanks From Mr / Mrs / Miss: </strong>
                                    </div>
                                    <span style={{ width: "70%" }}>
                                        <div style={{ width: "100%", border: "1px solid black", padding: "2px 8px" }} >Robina Shaheen / Sharafat Hussain Khan / Shehryar Khan / Liaqat Hussain</div>
                                    </span>
                                </Flex>

                            </Flex>
                            <Flex justify='space-between' style={{ width: "100%", marginTop: "4px" }} >
                                <Flex justify='' align='center' style={{ width: "100%" }}>
                                    <div style={{ width: "30%" }} >
                                        <strong >S/0, D/o, W/o</strong>
                                    </div>
                                    <span style={{ width: "70%" }}>
                                        <div style={{ width: "100%", border: "1px solid black", padding: "2px 8px" }} >Robina Shaheen </div>
                                    </span>
                                </Flex>

                            </Flex>
                            <Flex justify='space-between' style={{ width: "100%", marginTop: "4px" }} >
                                <Flex justify='' align='center' style={{ width: "100%" }}>
                                    <div style={{ width: "30%" }} >
                                        <strong >A Sum Of Rupees</strong>
                                    </div>
                                    <span style={{ width: "70%" }}>
                                        <div style={{ width: "100%", border: "1px solid black", padding: "2px 8px" }} >Thirty Thousand Rupees only </div>
                                    </span>
                                </Flex>

                            </Flex>

                            <Flex justify='space-between' style={{ width: "100%", marginTop: "4px" }} >
                                <Flex justify='space-between' align='center' style={{ width: "20%" }}>
                                    <div style={{ width: "70%" }} >
                                        <strong >Vide: </strong>
                                    </div>
                                    <span style={{ width: "180px" }}>
                                        <div style={{ width: "100%", border: "1px solid black", padding: "2px 8px" }} >Cash</div>
                                    </span>
                                </Flex>

                                <Flex justify='space-between' align='center' style={{ width: "30%" }}>
                                    <div style={{ width: "70%" }} >
                                        <strong style={{ marginLeft: "3px" }}  >Ref No: </strong>
                                    </div>
                                    <span style={{ width: "180px" }}>
                                        <div style={{ width: "100%", border: "1px solid black", padding: "2px 8px" }} >12424</div>
                                    </span>
                                </Flex>
                                <Flex justify='space-between' align='center' style={{ width: "20%" }}>
                                    <div style={{ width: "70%" }} >
                                        <strong style={{ marginLeft: "3px" }}  >Date: </strong>
                                    </div>
                                    <span style={{ width: "200px" }}>
                                        <div style={{ width: "100%", border: "1px solid black", padding: "2px 8px" }}  >10/23/2024</div>
                                    </span>
                                </Flex>
                                <Flex justify='space-between' align='center' style={{ width: "30%" }}>
                                    <div style={{ width: "70%" }} >
                                        <strong style={{ marginLeft: "4px" }} >Drwn Bank: </strong>
                                    </div>
                                    <span style={{ width: "200px" }}>
                                        <div style={{ width: "100%", border: "1px solid black", padding: "2px 8px" }} >23423423423</div>
                                    </span>

                                </Flex>

                            </Flex>
                            <Flex justify='space-between' style={{ width: "100%", marginTop: "4px" }} >
                                <Flex justify='' align='center' style={{ width: "100%" }}>
                                    <div style={{ width: "30%" }} >
                                        <strong >On Account Of</strong>
                                    </div>
                                    <span style={{ width: "70%" }}>
                                        <div style={{ width: "100%", border: "1px solid black", padding: "2px 8px" }} >Robina Shaheen </div>
                                    </span>
                                </Flex>

                            </Flex>
                            <Flex justify='space-between' style={{ width: "100%", marginTop: "4px" }} >
                                <Flex justify='space-between' align='center' style={{ width: "20%" }}>
                                    <div style={{ width: "70%" }} >
                                        <strong >Plot No: </strong>
                                    </div>
                                    <span style={{ width: "160px" }}>
                                        <div style={{ width: "100%", border: "1px solid black", padding: "2px 8px" }} >09</div>
                                    </span>
                                </Flex>

                                <Flex justify='space-between' align='center' style={{ width: "30%" }}>
                                    <div style={{ width: "70%" }} >
                                        <strong style={{ marginLeft: "3px" }}  >Street: </strong>
                                    </div>
                                    <span style={{ width: "180px" }}>
                                        <div style={{ width: "100%", border: "1px solid black", padding: "2px 8px" }} >10</div>
                                    </span>
                                </Flex>
                                <Flex justify='space-between' align='center' style={{ width: "20%" }}>
                                    <div style={{ width: "70%" }} >
                                        <strong style={{ marginLeft: "3px" }}  >Block: </strong>
                                    </div>
                                    <span style={{ width: "200px" }}>
                                        <div style={{ width: "100%", border: "1px solid black", padding: "2px 8px" }}  >10</div>
                                    </span>
                                </Flex>
                                <Flex justify='space-between' align='center' style={{ width: "30%" }}>
                                    <div style={{ width: "70%" }} >
                                        <strong style={{ marginLeft: "4px" }} >Type: </strong>
                                    </div>
                                    <span style={{ width: "200px" }}>
                                        <div style={{ width: "100%", border: "1px solid black", padding: "2px 8px" }} >Plot</div>
                                    </span>

                                </Flex>

                            </Flex>

                            <Flex justify='space-between' style={{ width: "100%", marginTop: "4px" }} >
                                <Flex justify='' align='center' style={{ width: "100%" }}>
                                    <div style={{ width: "10%" }} >
                                        <strong >Rs</strong>
                                    </div>
                                    <span style={{ width: "30%" }}>
                                        <div style={{ width: "100%", border: "1px solid black", padding: "2px 8px" }} > <strong>30000</strong> </div>
                                    </span>
                                </Flex>

                            </Flex>


                        </div>
                        <Flex justify='space-between' style={{ marginTop: "10px", marginBottom: "5px" }}>
                            <span>Allottee Copy</span>
                            <span>Signature: ______________________</span>
                        </Flex>
                    </div>
                    <div class="" style={{ borderBottom: "3px dashed black", marginTop: "23px" }}>
                        <Flex justify='space-between' align='center'>
                            <Typography.Title level={4}>ICHS (Pvt).Ltd</Typography.Title>
                            <div >
                                <strong > No: </strong>
                                <span style={stylebox} >107</span>
                            </div>
                        </Flex>
                        <div class="">
                            <Flex justify='space-between' style={{ width: "100%" }} >
                                <Flex justify='' align='center' style={{ width: "70%" }}>
                                    <div style={{ width: "51%" }} >
                                        <strong >Registration No. / File No: </strong>
                                    </div>

                                    <span>
                                        <div style={{ width: "100%", border: "1px solid black", padding: "2px 8px" }} >10760</div>
                                    </span>
                                    <span>
                                        <div style={{ width: "100%", border: "1px solid black", padding: "2px 8px" }} >25x50</div>
                                    </span>
                                </Flex>
                                <Flex justify='space-between' align='center' style={{ width: "50%" }}>
                                    <div style={{ width: "70%" }} >
                                        <strong >Payment Date: </strong>
                                    </div>
                                    <span style={{ width: "200px" }}>
                                        <div style={{ width: "100%", border: "1px solid black", padding: "2px 8px" }} >10/23/2024</div>
                                    </span>
                                </Flex>

                            </Flex>
                            <Flex justify='space-between' style={{ width: "100%", marginTop: "4px" }} >
                                <Flex justify='' align='center' style={{ width: "100%" }}>
                                    <div style={{ width: "30%" }} >
                                        <strong >Received With Thanks From Mr / Mrs / Miss: </strong>
                                    </div>
                                    <span style={{ width: "70%" }}>
                                        <div style={{ width: "100%", border: "1px solid black", padding: "2px 8px" }} >Robina Shaheen / Sharafat Hussain Khan / Shehryar Khan / Liaqat Hussain</div>
                                    </span>
                                </Flex>

                            </Flex>
                            <Flex justify='space-between' style={{ width: "100%", marginTop: "4px" }} >
                                <Flex justify='' align='center' style={{ width: "100%" }}>
                                    <div style={{ width: "30%" }} >
                                        <strong >S/0, D/o, W/o</strong>
                                    </div>
                                    <span style={{ width: "70%" }}>
                                        <div style={{ width: "100%", border: "1px solid black", padding: "2px 8px" }} >Robina Shaheen </div>
                                    </span>
                                </Flex>

                            </Flex>
                            <Flex justify='space-between' style={{ width: "100%", marginTop: "4px" }} >
                                <Flex justify='' align='center' style={{ width: "100%" }}>
                                    <div style={{ width: "30%" }} >
                                        <strong >A Sum Of Rupees</strong>
                                    </div>
                                    <span style={{ width: "70%" }}>
                                        <div style={{ width: "100%", border: "1px solid black", padding: "2px 8px" }} >Thirty Thousand Rupees only </div>
                                    </span>
                                </Flex>

                            </Flex>

                            <Flex justify='space-between' style={{ width: "100%", marginTop: "4px" }} >
                                <Flex justify='space-between' align='center' style={{ width: "20%" }}>
                                    <div style={{ width: "70%" }} >
                                        <strong >Vide: </strong>
                                    </div>
                                    <span style={{ width: "180px" }}>
                                        <div style={{ width: "100%", border: "1px solid black", padding: "2px 8px" }} >Cash</div>
                                    </span>
                                </Flex>

                                <Flex justify='space-between' align='center' style={{ width: "30%" }}>
                                    <div style={{ width: "70%" }} >
                                        <strong style={{ marginLeft: "3px" }}  >Ref No: </strong>
                                    </div>
                                    <span style={{ width: "180px" }}>
                                        <div style={{ width: "100%", border: "1px solid black", padding: "2px 8px" }} >1045645</div>
                                    </span>
                                </Flex>
                                <Flex justify='space-between' align='center' style={{ width: "20%" }}>
                                    <div style={{ width: "70%" }} >
                                        <strong style={{ marginLeft: "3px" }}  >Date: </strong>
                                    </div>
                                    <span style={{ width: "200px" }}>
                                        <div style={{ width: "100%", border: "1px solid black", padding: "2px 8px" }}  >10/23/2024</div>
                                    </span>
                                </Flex>
                                <Flex justify='space-between' align='center' style={{ width: "30%" }}>
                                    <div style={{ width: "70%" }} >
                                        <strong style={{ marginLeft: "4px" }} >Drwn Bank: </strong>
                                    </div>
                                    <span style={{ width: "200px" }}>
                                        <div style={{ width: "100%", border: "1px solid black", padding: "2px 8px" }} >10/23/2024</div>
                                    </span>

                                </Flex>

                            </Flex>
                            <Flex justify='space-between' style={{ width: "100%", marginTop: "4px" }} >
                                <Flex justify='' align='center' style={{ width: "100%" }}>
                                    <div style={{ width: "30%" }} >
                                        <strong >On Account Of</strong>
                                    </div>
                                    <span style={{ width: "70%" }}>
                                        <div style={{ width: "100%", border: "1px solid black", padding: "2px 8px" }} >Robina Shaheen </div>
                                    </span>
                                </Flex>

                            </Flex>
                            <Flex justify='space-between' style={{ width: "100%", marginTop: "4px" }} >
                                <Flex justify='space-between' align='center' style={{ width: "20%" }}>
                                    <div style={{ width: "70%" }} >
                                        <strong >Plot No: </strong>
                                    </div>
                                    <span style={{ width: "160px" }}>
                                        <div style={{ width: "100%", border: "1px solid black", padding: "2px 8px" }} >09</div>
                                    </span>
                                </Flex>

                                <Flex justify='space-between' align='center' style={{ width: "30%" }}>
                                    <div style={{ width: "70%" }} >
                                        <strong style={{ marginLeft: "3px" }}  >Street: </strong>
                                    </div>
                                    <span style={{ width: "180px" }}>
                                        <div style={{ width: "100%", border: "1px solid black", padding: "2px 8px" }} >1023</div>
                                    </span>
                                </Flex>
                                <Flex justify='space-between' align='center' style={{ width: "20%" }}>
                                    <div style={{ width: "70%" }} >
                                        <strong style={{ marginLeft: "3px" }}  >Block: </strong>
                                    </div>
                                    <span style={{ width: "200px" }}>
                                        <div style={{ width: "100%", border: "1px solid black", padding: "2px 8px" }}  >1023</div>
                                    </span>
                                </Flex>
                                <Flex justify='space-between' align='center' style={{ width: "30%" }}>
                                    <div style={{ width: "70%" }} >
                                        <strong style={{ marginLeft: "4px" }} >Type: </strong>
                                    </div>
                                    <span style={{ width: "200px" }}>
                                        <div style={{ width: "100%", border: "1px solid black", padding: "2px 8px" }} >103434</div>
                                    </span>

                                </Flex>

                            </Flex>

                            <Flex justify='space-between' style={{ width: "100%", marginTop: "4px" }} >
                                <Flex justify='' align='center' style={{ width: "100%" }}>
                                    <div style={{ width: "10%" }} >
                                        <strong >Rs</strong>
                                    </div>
                                    <span style={{ width: "30%" }}>
                                        <div style={{ width: "100%", border: "1px solid black", padding: "2px 8px" }} > <strong>30000</strong> </div>
                                    </span>
                                </Flex>

                            </Flex>


                        </div>

                        <Flex justify='space-between' style={{ marginTop: "10px", marginBottom: "5px" }}>
                            <span>Allottee Copy</span>
                            <span>Signature: ______________________</span>
                        </Flex>
                    </div>
                    <div class="" style={{ marginTop: "23px" }} >
                        <Flex justify='space-between' align='center'>
                            <Typography.Title level={4}>ICHS (Pvt).Ltd</Typography.Title>
                            <div >
                                <strong >Receipt No: </strong>
                                <span style={stylebox} >10760</span>
                            </div>
                        </Flex>
                        <div class="details">
                            <Flex justify='space-between' style={{ width: "100%" }} >
                                <Flex justify='' align='center' style={{ width: "70%" }}>
                                    <div style={{ width: "51%" }} >
                                        <strong >Registration No. / File No: </strong>
                                    </div>

                                    <span>
                                        <div style={{ width: "100%", border: "1px solid black", padding: "2px 8px" }} >10760</div>
                                    </span>
                                    <span>
                                        <div style={{ width: "100%", border: "1px solid black", padding: "2px 8px" }} >25x50</div>
                                    </span>
                                </Flex>
                                <Flex justify='space-between' align='center' style={{ width: "50%" }}>
                                    <div style={{ width: "70%" }} >
                                        <strong >Payment Date: </strong>
                                    </div>
                                    <span style={{ width: "200px" }}>
                                        <div style={{ width: "100%", border: "1px solid black", padding: "2px 8px" }} >10/23/2024</div>
                                    </span>
                                </Flex>

                            </Flex>
                            <Flex justify='space-between' style={{ width: "100%", marginTop: "4px" }} >
                                <Flex justify='' align='center' style={{ width: "100%" }}>
                                    <div style={{ width: "30%" }} >
                                        <strong >Received With Thanks From Mr / Mrs / Miss: </strong>
                                    </div>
                                    <span style={{ width: "70%" }}>
                                        <div style={{ width: "100%", border: "1px solid black", padding: "2px 8px" }} >Robina Shaheen / Sharafat Hussain Khan / Shehryar Khan / Liaqat Hussain</div>
                                    </span>
                                </Flex>

                            </Flex>
                            <Flex justify='space-between' style={{ width: "100%", marginTop: "4px" }} >
                                <Flex justify='' align='center' style={{ width: "100%" }}>
                                    <div style={{ width: "30%" }} >
                                        <strong >S/0, D/o, W/o</strong>
                                    </div>
                                    <span style={{ width: "70%" }}>
                                        <div style={{ width: "100%", border: "1px solid black", padding: "2px 8px" }} >Robina Shaheen </div>
                                    </span>
                                </Flex>

                            </Flex>
                            <Flex justify='space-between' style={{ width: "100%", marginTop: "4px" }} >
                                <Flex justify='' align='center' style={{ width: "100%" }}>
                                    <div style={{ width: "30%" }} >
                                        <strong >A Sum Of Rupees</strong>
                                    </div>
                                    <span style={{ width: "70%" }}>
                                        <div style={{ width: "100%", border: "1px solid black", padding: "2px 8px" }} >Thirty Thousand Rupees only </div>
                                    </span>
                                </Flex>

                            </Flex>

                            <Flex justify='space-between' style={{ width: "100%", marginTop: "4px" }} >
                                <Flex justify='space-between' align='center' style={{ width: "20%" }}>
                                    <div style={{ width: "70%" }} >
                                        <strong >Vide: </strong>
                                    </div>
                                    <span style={{ width: "180px" }}>
                                        <div style={{ width: "100%", border: "1px solid black", padding: "2px 8px" }} >Cash</div>
                                    </span>
                                </Flex>

                                <Flex justify='space-between' align='center' style={{ width: "30%" }}>
                                    <div style={{ width: "70%" }} >
                                        <strong style={{ marginLeft: "3px" }}  >Ref No: </strong>
                                    </div>
                                    <span style={{ width: "180px" }}>
                                        <div style={{ width: "100%", border: "1px solid black", padding: "2px 8px" }} >10/23/2024</div>
                                    </span>
                                </Flex>
                                <Flex justify='space-between' align='center' style={{ width: "20%" }}>
                                    <div style={{ width: "70%" }} >
                                        <strong style={{ marginLeft: "3px" }}  >Date: </strong>
                                    </div>
                                    <span style={{ width: "200px" }}>
                                        <div style={{ width: "100%", border: "1px solid black", padding: "2px 8px" }}  >10/23/2024</div>
                                    </span>
                                </Flex>
                                <Flex justify='space-between' align='center' style={{ width: "30%" }}>
                                    <div style={{ width: "70%" }} >
                                        <strong style={{ marginLeft: "4px" }} >Drwn Bank: </strong>
                                    </div>
                                    <span style={{ width: "200px" }}>
                                        <div style={{ width: "100%", border: "1px solid black", padding: "2px 8px" }} >10534324</div>
                                    </span>

                                </Flex>

                            </Flex>
                            <Flex justify='space-between' style={{ width: "100%", marginTop: "4px" }} >
                                <Flex justify='' align='center' style={{ width: "100%" }}>
                                    <div style={{ width: "30%" }} >
                                        <strong >On Account Of</strong>
                                    </div>
                                    <span style={{ width: "70%" }}>
                                        <div style={{ width: "100%", border: "1px solid black", padding: "2px 8px" }} >Robina Shaheen </div>
                                    </span>
                                </Flex>

                            </Flex>
                            <Flex justify='space-between' style={{ width: "100%", marginTop: "4px" }} >
                                <Flex justify='space-between' align='center' style={{ width: "20%" }}>
                                    <div style={{ width: "70%" }} >
                                        <strong >Plot No: </strong>
                                    </div>
                                    <span style={{ width: "160px" }}>
                                        <div style={{ width: "100%", border: "1px solid black", padding: "2px 8px" }} >09</div>
                                    </span>
                                </Flex>

                                <Flex justify='space-between' align='center' style={{ width: "30%" }}>
                                    <div style={{ width: "70%" }} >
                                        <strong style={{ marginLeft: "3px" }}  >Street: </strong>
                                    </div>
                                    <span style={{ width: "180px" }}>
                                        <div style={{ width: "100%", border: "1px solid black", padding: "2px 8px" }} >10</div>
                                    </span>
                                </Flex>
                                <Flex justify='space-between' align='center' style={{ width: "20%" }}>
                                    <div style={{ width: "70%" }} >
                                        <strong style={{ marginLeft: "3px" }}  >Block: </strong>
                                    </div>
                                    <span style={{ width: "200px" }}>
                                        <div style={{ width: "100%", border: "1px solid black", padding: "2px 8px" }}  >10</div>
                                    </span>
                                </Flex>
                                <Flex justify='space-between' align='center' style={{ width: "30%" }}>
                                    <div style={{ width: "70%" }} >
                                        <strong style={{ marginLeft: "4px" }} >Type: </strong>
                                    </div>
                                    <span style={{ width: "200px" }}>
                                        <div style={{ width: "100%", border: "1px solid black", padding: "2px 8px" }} >10</div>
                                    </span>

                                </Flex>

                            </Flex>

                            <Flex justify='space-between' style={{ width: "100%", marginTop: "4px" }} >
                                <Flex justify='' align='center' style={{ width: "100%" }}>
                                    <div style={{ width: "10%" }} >
                                        <strong >Rs</strong>
                                    </div>
                                    <span style={{ width: "30%" }}>
                                        <div style={{ width: "100%", border: "1px solid black", padding: "2px 8px" }} > <strong>30000</strong> </div>
                                    </span>
                                </Flex>

                            </Flex>


                        </div>

                        <Flex justify='space-between' style={{ marginTop: "10px", marginBottom: "5px" }}>
                            <span>Allottee Copy</span>
                            <span>Signature: ______________________</span>
                        </Flex>
                    </div>

                </div>
            </div>
        </div>
    );
}

// Styles for table cells
const cellstyle3 = {
    border: '1px solid #ddd',
    width: "25%",
    padding: '8px',
    textAlign: 'left',
};
const stylebox = {
    padding: "4px 8px",
    border: "1px solid black",
    marginLeft: "10px",
    width: "80%"
}

export default InstallmentReceipt;
