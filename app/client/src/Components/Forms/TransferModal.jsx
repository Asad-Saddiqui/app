import React, { useEffect, useRef, useState } from 'react';
import { Modal, Button, Form, Input, Select, Row, Col, Checkbox, message, notification, Typography, Flex, Descriptions } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { toTitleCase } from '../../utils/helper';
import { CloseOutlined } from '@ant-design/icons';
import { transferMembership, UpdateMembershiptransfer } from '../../App/Slice/transferSlice';
import Webcam from 'react-webcam';
import { uploadFile } from '../../App/Slice/uploadSlice';
import Swal from 'sweetalert2';
import { get_MemberShip } from '../../App/Slice/membershipSlice';
import { baseurl } from '../../utils/baseUrl';

const TransferModal = ({ visible, setTransferModalVisible }) => {
    const [form] = Form.useForm();
    const [showOtherField, setShowOtherField] = useState(false);
    const { owners, loading } = useSelector(state => state.Owner);
    const { membership } = useSelector(state => state.Membership);
    const [showWebcam, setShowWebcam] = useState(true);
    const [showWebcam1, setShowWebcam1] = useState(true);

    const [capturedImage, setCapturedImage] = useState(null);
    const [capturedImage1, setCapturedImage1] = useState(null);

    const webcamRef = useRef(null);
    const webcamRef1 = useRef(null);

    const dispatch = useDispatch();
    const [uploadedFileId, setUploadedFileId] = useState(null);
    const [uploadedFileId1, setUploadedFileId1] = useState(null);

    const [value, setValue] = useState("");
    const [searchTerm, setSearchTerm] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [type, setType] = useState("Normal")
    const handleFinish = async (values) => {
        values.membershipId = result?._id;
        const formData = new FormData();
        let response = "";
        if (type === "Normal" || result?.status === "Open File") {
            if (!values.purchasers || values.purchasers.length === 0) {
                message.error('Please select at least one purchaser!');
                return;
            }
            const totalShare = values.purchasers.reduce((sum, purchaser) => sum + parseFloat(purchaser.share || 0), 0);
            if (totalShare !== 100) {
                message.error('The total share for all purchasers must be 100%!');
                return;
            }
            if (!capturedImage1) {
                message.error('Please provide a purchaser group image');
                return;
            }
            const blob = await fetch(capturedImage1).then(res => res.blob());
            formData.append('file', blob, 'capturedImage.png'); // Append with a filename
            response = await dispatch(uploadFile(formData));
            values.image1 = response.payload?.file?._id;
        }
        if (type !== "Normal" || result?.status !== "Open File") {
            const formData2 = new FormData();

            if (!capturedImage) {
                message.error('Please provide a  Seller group image');
                return;
            }
            const blob = await fetch(capturedImage).then(res => res.blob());
            formData2.append('file', blob, 'capturedImage.png');
            response = await dispatch(uploadFile(formData2));
            values.image = response?.payload?.file?._id
        }


        values.type = type;
        if (response.type.endsWith('/fulfilled')) {

            let res = "";

            if (result?.status === "Open File") {
                res = await dispatch(UpdateMembershiptransfer(values));

            } else {
                res = await dispatch(transferMembership(values));

            }

            if (res?.type.endsWith('fulfilled')) {


                const response = await fetch(baseurl + '/api/transfer/search', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: "include",
                    body: JSON.stringify({ searchTerm: result?.newMembershipId }),
                });

                if (!response.ok) {
                    throw new Error(await response.json().message);
                }

                const data = await response.json();
                setResult(data);
                setCapturedImage(null)
                setCapturedImage1(null)
                form.resetFields()

                Swal.fire({
                    icon: 'success',
                    title: 'Transfer Successful',
                    text: 'The membership transfer has been completed successfully!',
                    confirmButtonText: 'OK'
                });
                form.resetFields("")
                // dispatch(get_MemberShip());
                // form.resetFields();
                // setCapturedImage(null)
                // setUploadedFileId(null)
                // setTransferModalVisible(false)

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Transfer Failed',
                    text: res.payload,
                    confirmButtonText: 'OK'
                });
            }
        } else {
            notification.error({
                message: 'Upload Failed',
                description: 'There was an error uploading your file. Please try again.',
            });
        }
    };
    useEffect(() => {
        setShowWebcam(true);
        setShowWebcam1(true);

        form.resetFields()
    }, [])

    const handleTransactionTypeChange = (value) => {
        setShowOtherField(value === 'other');
    };

    const filterOptionByText = (input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;

    const captureImage = async () => {
        const imageSrc = webcamRef.current.getScreenshot();
        console.log('Captured Image:', imageSrc);
        if (!imageSrc) {
            notification.error({
                message: 'Capture Error',
                description: 'No image captured. Please try again.',
            });
            return;
        }
        setCapturedImage(imageSrc);
        setShowWebcam(false);

    };

    const captureImage1 = async () => {
        const imageSrc = webcamRef1.current.getScreenshot();
        console.log('Captured Image:', imageSrc);
        if (!imageSrc) {
            notification.error({
                message: 'Capture Error',
                description: 'No image captured. Please try again.',
            });
            return;
        }
        setCapturedImage1(imageSrc);
        setShowWebcam1(false);

    };

    const retakeImage = () => {
        setCapturedImage(null);
        setShowWebcam(true);
    };

    const retakeImage1 = () => {
        setCapturedImage1(null);
        setShowWebcam1(true);
    };

    const handleChange = async (e) => {
        setValue(e.target.value)
        console.log('e', e.target.value);
        try {
            const response = await fetch(baseurl + '/api/transfer/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
                body: JSON.stringify({ searchTerm: e.target.value }),
            });

            if (!response.ok) {
                throw new Error(await response.json().message);
            }

            const data = await response.json();
            setResult(data);
            setError('');
        } catch (err) {
            setError(err.message);
            setResult(null);
        }


    }

    const handleSelect = (e) => {
        setType(e);
    }

    const items = [
        {
            key: '1',
            label: 'ID',
            flex: 1,
            children: <p>{result?.newMembershipId}</p>,
        },
        {
            key: '2',
            label: 'Phase',
            flex: 1,
            children: <p>{result?.phase?.phase_name}</p>,
        },
        {
            key: '3',
            label: 'Block',
            flex: 1,
            children: <p>{result?.block?.block_name}</p>,
        },
        {
            key: '3',
            label: 'Street',
            flex: 1,
            children: <p>{result?.address}</p>,
        },
        {
            key: '4',
            label: 'Plot #',
            flex: 1,
            children: <p>{result?.plotNo}</p>,
        },
        {
            key: '5',
            label: 'Address',
            flex: 2,
            children: <p>{result?.locationUrl}</p>,
        },
        {
            key: '5',
            label: 'Size',
            flex: 1,
            children: <p>{result?.landSize} {result?.landUnit} </p>,
        },
    ];


    return (
        <Modal
            title={<><Flex justify='space-between'>
                <Typography.Title level={4}>Transfer Request</Typography.Title>
                <Input value={value} onChange={handleChange} style={{ width: "300px", marginRight: "20px" }} />
            </Flex></>}
            open={visible}
            onCancel={() => {
                setTransferModalVisible(false)
            }}
            footer={null}
            width={1200}
            style={{ top: "10px" }}
        >
            <Descriptions title={result?.status} items={items} />


            {['Open', 'Draft', "Open File"].includes(result?.status) ?
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleFinish}
                >
                    <Row gutter={16}>
                        <Col span={24}>
                            <Row gutter={8}>

                                {type === "Normal" &&
                                    <Col span={24}>
                                        <Form.Item
                                            name="purchaserName"
                                            label="Purchasers"
                                        >
                                            <Form.List name="purchasers">
                                                {(fields, { add, remove }) => (
                                                    <>
                                                        <Form.Item>
                                                            <Button type="dashed" onClick={() => add()} block>
                                                                + Add Purchaser
                                                            </Button>
                                                        </Form.Item>
                                                        {fields.map(({ key, name, fieldKey, ...restField }) => (
                                                            <Row key={key} gutter={16} style={{ marginBottom: 8 }}>
                                                                <Col span={11}>
                                                                    <Form.Item
                                                                        {...restField}
                                                                        name={[name, 'owner']}
                                                                        fieldKey={[fieldKey, 'owner']}
                                                                        rules={[{ required: true, message: 'Please select a purchaser!' }]}
                                                                    >
                                                                        <Select
                                                                            showSearch
                                                                            filterOption={filterOptionByText}
                                                                            placeholder="Select purchaser"
                                                                            allowClear
                                                                        >
                                                                            {owners?.data?.map((dta) => {
                                                                                // if (dta.userType === 'Owner') {
                                                                                return (
                                                                                    <Select.Option key={dta._id} value={dta._id}>
                                                                                        {toTitleCase(dta.ownerName)}
                                                                                    </Select.Option>
                                                                                );

                                                                            })}
                                                                        </Select>
                                                                    </Form.Item>
                                                                </Col>
                                                                <Col span={11}>
                                                                    <Form.Item
                                                                        {...restField}
                                                                        name={[name, 'share']}
                                                                        fieldKey={[fieldKey, 'share']}
                                                                        rules={[
                                                                            { required: true, message: 'Please enter the share!' },
                                                                            () => ({
                                                                                validator(_, value) {
                                                                                    if (value && value > 100) {
                                                                                        return Promise.reject(new Error('Share cannot exceed 100%'));
                                                                                    }
                                                                                    return Promise.resolve();
                                                                                },
                                                                            }),
                                                                        ]}
                                                                    >
                                                                        <Input type="number" placeholder="Enter share (%)" />
                                                                    </Form.Item>
                                                                </Col>
                                                                <Col span={2}>
                                                                    <Button
                                                                        type="link"
                                                                        onClick={() => remove(name)}
                                                                    >
                                                                        <CloseOutlined />
                                                                    </Button>
                                                                </Col>
                                                            </Row>
                                                        ))}
                                                    </>
                                                )}
                                            </Form.List>
                                        </Form.Item>
                                    </Col>}

                                {result?.status !== "Open File" &&
                                    <>
                                        <Col span={12}>
                                            <Form.Item
                                                name="type"
                                                label="Transfer Type "
                                                rules={[{ required: true, message: 'Please select the transfer type' }]}
                                            >
                                                <Select
                                                    placeholder=""
                                                    onSelect={handleSelect}
                                                >
                                                    <Select.Option value="Open File">Open File</Select.Option>
                                                    <Select.Option value="Normal">Normal</Select.Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                name="agent"
                                                label="Agent"
                                                rules={[{ required: type === "Normal" ? false : true, message: 'Please enter agent Name' }]}

                                            >
                                                <Input type='Text' />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                name="sellerWitness"
                                                label="Seller Witness"
                                                rules={[{ required: true, message: 'Please enter the seller witness name!' }]}
                                            >
                                                <Select
                                                    showSearch
                                                    filterOption={filterOptionByText}
                                                    placeholder="Select Witness"
                                                    allowClear
                                                >
                                                    {owners?.data?.map((dta) => {
                                                        // if (dta.userType === 'Witness') {
                                                        return (
                                                            <Select.Option key={dta._id} value={dta._id}>
                                                                {toTitleCase(dta.ownerName)}
                                                            </Select.Option>
                                                        );
                                                        // }
                                                        // return null;
                                                    })}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </>


                                }
                                {type === "Normal" &&
                                    <Col span={12}>
                                        <Form.Item
                                            name="purchaserWitness"
                                            label="Purchaser Witness"
                                            rules={[{ required: true, message: 'Please enter the purchaser witness name!' }]}
                                        >
                                            <Select
                                                showSearch
                                                filterOption={filterOptionByText}
                                                placeholder="Select Witness"
                                                allowClear
                                            >
                                                {owners?.data?.map((dta) => {
                                                    // if (dta.userType === 'Witness') {
                                                    return (
                                                        <Select.Option key={dta._id} value={dta._id}>
                                                            {toTitleCase(dta.ownerName)}
                                                        </Select.Option>
                                                    );
                                                    // }
                                                    // return null;
                                                })}
                                            </Select>
                                        </Form.Item>
                                    </Col>}
                            </Row>

                        </Col>

                        {result?.status !== "Open File" &&
                            <Col span={12}>
                                <div style={{ textAlign: '', }}>
                                    {capturedImage && <>
                                        <img src={capturedImage} alt="Captured" style={{ width: '100%', }} />
                                        <Button onClick={retakeImage} type="primary" style={{ marginTop: 8 }}>
                                            Capture again Saller
                                        </Button></>}
                                </div>

                                {showWebcam && (
                                    <div style={{ textAlign: '', }}>
                                        <Webcam
                                            audio={false}
                                            ref={webcamRef}
                                            screenshotFormat="image/jpeg"
                                            style={{ width: '100%' }}
                                        />
                                        <Button onClick={captureImage}>
                                            Capture Image Saller
                                        </Button>
                                    </div>
                                )}
                            </Col>}

                        {type !== "Open File" &&
                            <Col span={12}>
                                <div style={{ textAlign: '', }}>
                                    {capturedImage1 && <>
                                        <img src={capturedImage1} alt="Captured" style={{ width: '100%', }} />
                                        <Button onClick={retakeImage1} type="primary" style={{ marginTop: 8 }}>
                                            Capture again Saller
                                        </Button></>}
                                </div>

                                {showWebcam1 && (
                                    <div style={{ textAlign: '', }}>
                                        <Webcam
                                            audio={false}
                                            ref={webcamRef1}
                                            screenshotFormat="image/jpeg"
                                            style={{ width: '100%' }}
                                        />
                                        <Button onClick={captureImage1}>
                                            Capture Image Purchaser
                                        </Button>
                                    </div>
                                )}
                            </Col>}
                    </Row>
                    <br />
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit Transfer Request
                        </Button>
                    </Form.Item>
                </Form> : "No action"}
        </Modal>
    );
};

export default TransferModal;
