import React, { useRef, useState } from "react";
import { Table, Tag, Button, Divider, Space, Flex, Typography, Row, Col, Badge } from "antd";
import { useSelector } from "react-redux";
import ReactToPrint from "react-to-print";
import { CheckCircleOutlined, EditFilled, EditOutlined, EditTwoTone, PrinterOutlined } from "@ant-design/icons";
import { toTitleCase } from "../../utils/helper";
import dayjs from "dayjs";
import ReceivePaymentModal from "./ReceivePaymentModal";
import InstallmentReceipt from "./InstallmentReceipt";

const ReportTable = ({ componentRef }) => {
    const { charges, loading } = useSelector((state) => state.Charge);
    const { membership } = useSelector(state => state.Membership)
    const componentRef2 = useRef();
    const [currentPayment, setcurrentPayment] = useState('')
    // const componentRef = useRef(); // Reference for the component to print
    const [selectedCharges, setSelectedCharges] = useState([]); // Store selected charges
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const columns = [
        {
            title: "Name",
            dataIndex: "chargeName",
            key: "chargeName",
            with: "25%"
        },
        {
            title: "Amount",
            dataIndex: "chargesAmount",
            key: "chargesAmount",
            render: (amount) => ` ${amount}`,
            with: "25%"
        },
        {
            title: "D payment",
            dataIndex: "downpayment",
            key: "downpayment",
            render: (downpayment) => ` ${downpayment}`,
            with: "25%"
        },
        {
            title: "Installments",
            dataIndex: "isInstallmentEnabled",
            key: "isInstallmentEnabled",
            render: (isInstallmentEnabled) =>
                isInstallmentEnabled ? "YES" : "NO",
            with: "25%"
        },
        // {
        //     title: "action",
        //     dataIndex: "numberOfPayments",
        //     render: (text, record) => {
        //         return <>
        //             <Button type="Link">
        //                 <EditFilled />
        //             </Button>
        //         </>
        //     }

        // },
    ];


    const expandedRowRender = (record) => {
        const paymentColumns = [
            {
                title: "#",
                dataIndex: "installmentNumber",
                key: "installmentNumber",
                with: "25%"
            },
            {
                title: "Amount",
                dataIndex: "amount",
                key: "amount",
                render: (amount) => Math.round(amount),

            },
            {
                title: "Due Date",
                dataIndex: "dueDate",
                key: "dueDate",
                render: (dueDate) => dayjs(dueDate).format('DD MMM YYYY'),
            },
            {
                title: "Receiving",
                dataIndex: "receivingDate",
                key: "receivingDate",
                render: (receivingDate) => receivingDate ? dayjs(receivingDate).format('DD MMM YYYY') : "N/A",
            },
            // 
            {
                title: "Extra Days",
                dataIndex: "extraDays",
                key: "extraDays",
                render: (days) => days,
            },
            {
                title: "/ Day Fine",
                dataIndex: "fine",
                key: "fine",
                render: (amount) => Math.round(amount),

            },
            {
                title: "Fine",
                dataIndex: "fineAmount",
                key: "fineAmount",
                render: (amount) => Math.round(amount),


            },
            {
                title: "Paid",
                dataIndex: "paidAmount",
                key: "paidAmount",
                render: (amount) => Math.round(amount),


            },

            {
                title: "Left",
                dataIndex: "balance",
                key: "balance",
                render: (amount) => Math.round(amount),

            },
            {
                title: "Extra Amount",
                dataIndex: "extraAmount",
                key: "extraAmount",
                render: (amount) => Math.round(amount),

            },
            {
                title: "Status",
                dataIndex: "paymentStatus",
                key: "paymentStatus",
                render: (status) => {
                    let color =
                        status === "completed" ? "green" : status === "overdue" ? "red" : "orange";
                    return <Tag bordered={false} color={color}>{status.toUpperCase()}</Tag>;
                },
            },
            {
                title: "Action",
                key: "action",
                render: (_, record) => (
                    record.paymentStatus === "completed" ? <>
                        <Space>
                            <Button type="text">
                                <CheckCircleOutlined style={{ color: "green", fontSize: "20px" }} />
                            </Button>



                            <ReactToPrint
                                trigger={() => <Button type="text" >
                                    <PrinterOutlined style={{ fontSize: "20px", color: "blue" }} />
                                </Button>}
                                content={() => componentRef2.current}
                            />

                        </Space>

                    </> : <Button type="primary" onClick={() => {
                        setcurrentPayment(record)
                        handleOpenModal()
                    }}>
                        Receive
                    </Button>


                ),
            },
        ];

        return (
            <Table
                columns={paymentColumns}
                dataSource={record.paymentSchedule}
                pagination={false}
                rowKey="_id"
            />
        );
    };
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedCharges(selectedRows); // Update the selected charges
        },
    };


    return (
        <>
            <ReceivePaymentModal isOpen={isModalOpen}
                onClose={handleCloseModal}
                currentPayment={currentPayment} setcurrentPayment={setcurrentPayment}
            />
            <InstallmentReceipt componentRef2={componentRef2} />
            <div >
                <Table
                    className="tableFont"
                    columns={columns}
                    expandable={{ expandedRowRender }}
                    dataSource={charges}
                    rowKey="_id"
                    pagination={false}
                    rowSelection={rowSelection}
                />
                <div style={{ display: "none" }}>
                    <div ref={componentRef} style={{ padding: "30px 30px", }}>
                        <div style={{ marginBottom: "20px", minHeight: "auto", width: "100%" }}>

                            <Flex justify="space-between" align="center">
                                <Typography.Title level={4}>ICHS</Typography.Title>
                                <Typography.Title level={4}>File Payment Details</Typography.Title>
                                <Typography.Title level={4}>File Status : Normal</Typography.Title>
                            </Flex>

                            <Row gutter={8}>
                                <Col span={24}>

                                    <h4>FILE INFORMATION</h4>
                                    <table style={{ width: '100%', marginTop: '0px' }} >
                                        <tbody>
                                            <tr>
                                                <td rowSpan={6} style={{ ...cellstyle3, width: "150px" }}></td>
                                            </tr>
                                            <tr>
                                                <th style={cellstyle3}>Reg No:</th>
                                                <td style={cellstyle3}>{membership?.oldMembershipId + " / " + membership?.newMembershipId}</td>
                                                <th style={cellstyle3}>Plot No:</th>
                                                <td style={cellstyle3}>{membership.plotNo}</td>
                                            </tr>
                                            <tr>
                                                <th style={cellstyle3}>Name:</th>
                                                <td style={cellstyle3}>{membership?.owners?.map((item, index) => toTitleCase(item.owner.ownerName + " "))}</td>
                                                <th style={cellstyle3}>Block:</th>
                                                <td style={cellstyle3}>{membership?.block?.block_name}</td>
                                            </tr>
                                            <tr>
                                                <th style={cellstyle3}>Address:</th>
                                                <td style={cellstyle3} colSpan="3">{toTitleCase(membership?.address)}</td>
                                            </tr>
                                            <tr>
                                                <th style={cellstyle3}>Plot Type / Size / Street No:</th>
                                                <td style={cellstyle3} colSpan="3">{toTitleCase(membership?.propertyType)} / {toTitleCase(membership?.landSize + " " + membership?.landUnit)} / {8}</td>
                                            </tr>
                                            <tr>
                                                <th style={cellstyle3}>CNIC No:</th>
                                                <td style={cellstyle3}>{membership?.owners?.map((item, index) => toTitleCase(item.owner.cnic + " "))}</td>
                                                <th style={cellstyle3}>Phase:</th>
                                                <td style={cellstyle3}>{membership?.phase?.phase_name}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <br />
                                    <h2>Payment Details</h2>
                                    <table style={{ width: "100%" }}  >
                                        <thead>
                                            <tr>
                                                {/* <th style={cellstyle}>S. #</th>  */}
                                                <th style={cellstyle}>Payment Of</th>
                                                <th style={cellstyle}> Amount</th>
                                                <th style={cellstyle}>D Pay</th>
                                                <th style={cellstyle}>Amt</th>
                                                <th style={cellstyle}>D Date</th>
                                                <th style={cellstyle}>R Date</th>
                                                <th style={cellstyle}>E Days</th>

                                                <th style={cellstyle}>/ Day Fine</th>
                                                <th style={cellstyle}>Fine</th>

                                                <th style={cellstyle}> Paid</th>
                                                <th style={cellstyle}> Disc</th>
                                                <th style={cellstyle}> Total</th>
                                                <th style={cellstyle}>Balance</th>
                                            </tr>
                                        </thead>
                                        <tbody >
                                            {selectedCharges.map((charge, a) => {

                                                return charge?.paymentSchedule.map((schdule, i) => {

                                                    return <tr key={i}>
                                                        {/* <td style={cellstyle}>{a + (i + 1)}</td> */}
                                                        <td style={cellstyle}>{charge.chargeName}</td>
                                                        <td style={{ ...cellstyle }}>{charge.chargesAmount}</td>
                                                        <td style={{ ...cellstyle }}>	{charge.downpayment}</td>
                                                        <td style={cellstyle}>{Math.round(schdule.amount)}</td>
                                                        <td style={cellstyle}>{dayjs(schdule?.dueDate).format('DD MMM YYYY')}</td>
                                                        <td style={cellstyle}>{schdule.receivingDate ? dayjs(schdule.receivingDate).format('DD MMM YYYY') : "N/A"}</td>

                                                        <td style={cellstyle}>{schdule.extraDays}</td>
                                                        <td style={cellstyle}>{schdule.fine}</td>

                                                        <td style={cellstyle}>{Math.round(schdule.fineAmount)}</td>

                                                        <td style={cellstyle}>{Math.round(schdule.paidAmount) - schdule.discount}</td>
                                                        <td style={cellstyle}>{schdule.discount}</td>
                                                        <td style={cellstyle}>{schdule.fineAmount + Math.round(schdule.amount)}</td>
                                                        <td style={cellstyle}>{Math.round(schdule.balance)}</td>
                                                    </tr>
                                                })
                                            })}
                                        </tbody>
                                    </table>
                                </Col>

                            </Row>


                        </div>

                    </div>
                </div>
            </div >
        </>
    );
};
// Basic styles for the table
const cellstyle = {
    border: '1px solid #ddd',
    padding: '5px',
    textAlign: 'left',

    // backgroundColor: '#f9f9f9',
};

const cellstyle3 = {
    border: '1px solid #ddd',

    padding: '2px 5px',
    textAlign: 'left',
    // backgroundColor: '#f9f9f9',
};
export default ReportTable;
