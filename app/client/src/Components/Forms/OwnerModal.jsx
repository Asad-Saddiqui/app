import { Country, State, City } from 'country-state-city';
import React, { useEffect, useState } from 'react';
import { Modal, Form, Select, Button, Input, DatePicker, Upload, Row, Col, notification, message, Typography, Flex } from 'antd';
import { DeleteOutlined, FileImageOutlined, FilePdfOutlined, UploadOutlined } from '@ant-design/icons';
import InputMask from 'react-input-mask';
import { deleteFile, uploadFile } from '../../App/Slice/uploadSlice';
import { useDispatch, useSelector } from 'react-redux';
import { add_owner, update_Owners, get_Owners } from '../../App/Slice/ownerSlice';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';

const { Option } = Select;

const OwnerModal = ({ visible, onClose, editingOwner }) => {
    const [form] = Form.useForm();
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [uploadedFileId, setUploadedFileId] = useState(null);
    const [uploadedFileI2, setUploadedFileI2] = useState(null);
    const [uploadedFileI3, setUploadedFileI3] = useState(null);
    const [btnloading, setbtnLoading] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (editingOwner) {
            setIsEditMode(true);
            form.setFieldsValue({
                ownerTitle: editingOwner.ownerName.split(' ')[0],
                ownerName: editingOwner.ownerName.split(' ').slice(1).join(' '),
                gTitle: editingOwner.familyName.split(' ')[0],
                familyName: editingOwner.familyName.split(' ').slice(1).join(' '),
                userType: editingOwner.userType,
                email: editingOwner.email,
                phoneNumber: editingOwner.phoneNumber,
                whatsappNumber: editingOwner.whatsappNumber,
                ntnNumber: editingOwner.ntnNumber,
                dateOfBirth: editingOwner.dateOfBirth ? dayjs(editingOwner.dateOfBirth) : null,
                cnic: editingOwner.cnic,
                country: editingOwner.country,
                state: editingOwner.state,
                city: editingOwner.city,
                permanentAddress: editingOwner.permanentAddress,
            });
            setSelectedCountry(editingOwner.country);
            setSelectedState(editingOwner.state);
            setUploadedFileId(editingOwner.profileImage);
            setUploadedFileI2(editingOwner.cnicFrontImage);
            setUploadedFileI3(editingOwner.cnicBackImage);
        } else {
            setIsEditMode(false);
            form.resetFields();
        }
    }, [editingOwner, form]);

    const handleCountryChange = (value) => {
        setSelectedCountry(value);
        setSelectedState(null);
    };

    const handleStateChange = (value) => {
        setSelectedState(value);
    };

    const handleSubmit = async (values) => {
        setbtnLoading(true);
        values.ownerName = values.ownerTitle + " " + values.ownerName;
        delete values.ownerTitle;
        values.familyName = values.gTitle + " " + values.familyName;
        delete values.gTitle;
        values.country = Country.getAllCountries().find(dta => dta.isoCode === selectedCountry)?.name;
        values.state = State.getStatesOfCountry(selectedCountry).find(dta => dta.isoCode === selectedState)?.name;
        values.cnicFrontImage = uploadedFileI2?._id;
        values.cnicBackImage = uploadedFileI3?._id;
        values.profileImage = uploadedFileId?._id;
        try {
            let result;
            if (isEditMode) {
                result = await dispatch(update_Owners({ id: editingOwner._id, data: values }));
            } else {
                result = await dispatch(add_owner(values));
            }

            if (result.type.endsWith('fulfilled')) {
                dispatch(get_Owners());
                setbtnLoading(false);
                Swal.fire({
                    title: 'Success!',
                    text: isEditMode ? 'Updated successfully' : 'Added successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    onClose();
                });
            } else {
                setbtnLoading(false);
                Swal.fire({
                    title: 'Error!',
                    text: 'Something went wrong.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            setbtnLoading(false);
            Swal.fire({
                title: 'Error!',
                text: error.message || 'Server error.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    const handleFileUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await dispatch(uploadFile(formData)).unwrap();
            notification.success({
                message: 'Upload Successful',
                description: 'Your file has been uploaded successfully.',
            });
            setUploadedFileId(response?.file);  // Store the file ID
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };
    const beforeUpload = (file) => {
        const isPDF = file.type === 'application/pdf';
        const isImage = file.type.startsWith('image/');
        const isAccepted = isPDF || isImage;

        if (!isAccepted) {
            notification.error({
                message: 'Upload',
                description: 'You can only upload PDF or image files!',
            });
            console.error('You can only upload PDF or image files!');
        }

        return isAccepted || Upload.LIST_IGNORE; // Reject unsupported file types
    };
    const handleFileUpload1 = async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await dispatch(uploadFile(formData)).unwrap();
            notification.success({
                message: 'Upload Successful',
                description: 'Your file has been uploaded successfully.',
            });
            setUploadedFileI3(response?.file);  // Store the file ID
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };
    const beforeUpload1 = (file) => {
        const isPDF = file.type === 'application/pdf';
        const isImage = file.type.startsWith('image/');
        const isAccepted = isPDF || isImage;

        if (!isAccepted) {
            notification.error({
                message: 'Upload',
                description: 'You can only upload PDF or image files!',
            });
            console.error('You can only upload PDF or image files!');
        }

        return isAccepted || Upload.LIST_IGNORE; // Reject unsupported file types
    };

    const handleFileUpload2 = async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await dispatch(uploadFile(formData)).unwrap();
            notification.success({
                message: 'Upload Successful',
                description: 'Your file has been uploaded successfully.',
            });
            setUploadedFileI2(response?.file);  // Store the file ID
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };
    const beforeUpload2 = (file) => {
        const isPDF = file.type === 'application/pdf';
        const isImage = file.type.startsWith('image/');
        const isAccepted = isImage;

        if (!isAccepted) {
            notification.error({
                message: 'Upload',
                description: 'You can only upload PDF or image files!',
            });
            console.error('You can only upload PDF or image files!');
        }

        return isAccepted || Upload.LIST_IGNORE; // Reject unsupported file types
    };

    const renderFileIcon = (file) => {
        if (file.fileType === 'pdf') {
            return <FilePdfOutlined style={{ fontSize: '24px', color: '#ff4d4f' }} />;
        } else if (file.fileType === 'image') {
            return <FileImageOutlined style={{ fontSize: '24px', color: '#1890ff' }} />;
        }
        return null;
    };

    const handleDeleteFile = (abcd, num) => {
        if (abcd) {
            Modal.confirm({
                title: 'Are you sure you want to delete this file?',
                onOk: async () => {
                    try {
                        await dispatch(deleteFile(abcd)).unwrap();
                        notification.success({
                            message: 'Delete Successful',
                            description: 'Your file has been deleted successfully.',
                        });
                        if (num === 1) {
                            setUploadedFileId(null);
                        } else if (num === 2) {
                            setUploadedFileI2(null);
                        } else if (num === 3) {
                            setUploadedFileI3(null);
                        }
                    } catch (error) {
                        console.error('Error deleting file:', error);
                    }
                },
            });
        }
    };

    return (
        <Modal
            title={isEditMode ? "Edit Owner Details" : "Add Owner Details"}
            visible={visible}
            onCancel={onClose}
            footer={null}
            centered
            zIndex={1000}
            width={1000}
            destroyOnClose={true}
        >
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Row gutter={8}>
                    <Col span={12}>
                        <Form.Item
                            label=" Name"
                            required
                            rules={[{ required: true, message: "Please enter the user's name!" }]}
                        >
                            <Input.Group compact>
                                <Form.Item
                                    name="ownerTitle"
                                    noStyle
                                    rules={[{ required: true, message: 'Please select a title!' }]}
                                    initialValue={'mr'}
                                >
                                    <Select defaultValue={"mr"} style={{ width: '25%' }}>
                                        <Option value="mr">Mr.</Option>
                                        <Option value="ms">Ms.</Option>
                                        <Option value="mrs">Mrs.</Option>
                                        <Option value="dr">Dr.</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    name="ownerName"
                                    noStyle
                                    rules={[{ required: true, message: "Please enter the owner's name!" }]}
                                >
                                    <Input placeholder="Owner Name" style={{ width: '75%' }} />
                                </Form.Item>
                            </Input.Group>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Father / Husband Name"
                            required
                            rules={[{ required: true, message: "Please enter the name!" }]}
                        >
                            <Input.Group compact>
                                <Form.Item
                                    name="gTitle"
                                    noStyle
                                    rules={[{ required: true, message: 'Please select a title!' }]}
                                    initialValue={'mr'}
                                >
                                    <Select defaultValue={"mr"} style={{ width: '25%' }}>
                                        <Option value="mr">Mr.</Option>
                                        <Option value="ms">Ms.</Option>
                                        <Option value="mrs">Mrs.</Option>
                                        <Option value="dr">Dr.</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    name="familyName"
                                    noStyle
                                    rules={[{ required: true, message: "Please enter the name!" }]}
                                >
                                    <Input placeholder="Name" style={{ width: '75%' }} />
                                </Form.Item>
                            </Input.Group>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Type"
                            name="userType"
                            rules={[{ required: false, message: 'Please Select a user type' }]}
                        >
                            <Select>
                                <Option value="Owner">Owner</Option>
                                <Option value="Nominee">Nominee</Option>
                                <Option value="Witness">Witness</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: false, message: 'Please enter an email address!' }]}
                        >
                            <Input type="email" placeholder="Email" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="Phone Number"
                            name="phoneNumber"
                            rules={[
                                { required: true, message: 'Please enter a phone number!' },
                            ]}
                        >
                            <InputMask mask="+99-999-9999999" placeholder="+92 300 1234567">
                                {(inputProps) => <Input {...inputProps} />}
                            </InputMask>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="WhatsApp Number" name="whatsappNumber">
                            <InputMask mask="+99-999-9999999" placeholder="+92 300 1234567">
                                {(inputProps) => <Input {...inputProps} />}
                            </InputMask>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="NTN Number" name="ntnNumber">
                            <InputMask
                                mask="9999999-9"
                                placeholder="1234567 8"
                            >
                                {(inputProps) => <Input {...inputProps} />}
                            </InputMask>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="Date of Birth"
                            name="dateOfBirth"
                            rules={[{ required: false, message: 'Please select your date of birth!' }]}
                        >
                            <DatePicker placeholder="Date of Birth" style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>

                    {!editingOwner &&
                        <Col span={8}>
                            <Form.Item
                                label="CNIC"
                                name="cnic"
                                rules={[
                                    { required: true, message: 'Please enter CNIC!' },
                                ]}
                            >
                                <InputMask
                                    mask="99999-9999999-9"
                                    maskChar={null} // No mask placeholders like underscores
                                    placeholder="12345 1234567 1"
                                >
                                    {(inputProps) => <Input {...inputProps} />}
                                </InputMask>
                            </Form.Item>
                        </Col>
                    }
                    <Col span={8}>
                        <Form.Item
                            label="Country"
                            name="country"
                            rules={[{ required: false, message: 'Please select a country!' }]}
                        >
                            <Select placeholder="Select Country" onChange={handleCountryChange}>
                                {Country.getAllCountries().map((country) => (
                                    <Option key={country.isoCode} value={country.isoCode}>
                                        {country.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="State"
                            name="state"
                            rules={[{ required: false, message: 'Please select a state!' }]}
                        >
                            <Select
                                placeholder="Select State"
                                onChange={handleStateChange}
                                disabled={!selectedCountry}
                            >
                                {selectedCountry && State.getStatesOfCountry(selectedCountry).map((state) => (
                                    <Option key={state.isoCode} value={state.isoCode}>
                                        {state.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="City"
                            name="city"
                            rules={[{ required: false, message: 'Please select a city!' }]}
                        >
                            <Select placeholder="Select City" disabled={!selectedState}>
                                {selectedState &&
                                    City.getCitiesOfState(selectedCountry, selectedState).map((city) => (
                                        <Option key={city.name} value={city.name}>
                                            {city.name}
                                        </Option>
                                    ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="Permanent Address"
                            name="permanentAddress"
                            rules={[{ required: false, message: 'Please enter the address!' }]}
                            accept="image/*"
                        >
                            <Input placeholder="Permanent Address" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="CNIC Front Image"
                            rules={[{ required: true, message: 'Please select the image' }]}

                        >
                            <Upload
                                name="file"
                                beforeUpload={beforeUpload2}
                                customRequest={({ file }) => handleFileUpload2(file)}
                                showUploadList={false}  // Hide default upload list
                                accept="image/*"
                            >
                                <Button icon={<UploadOutlined />} >
                                    Click to Upload
                                </Button>
                            </Upload>
                        </Form.Item>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            {renderFileIcon({ fileType: uploadedFileI2?.fileType })}
                            <Typography.Text style={{ fontSize: "10px" }}>{uploadedFileI2?.originalName}</Typography.Text>
                            {uploadedFileI2 && <Button
                                icon={<DeleteOutlined />}
                                type="text"
                                danger
                                onClick={() => handleDeleteFile(uploadedFileI2._id, 2)}
                            />}
                        </div>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="CNIC Front Image"
                            rules={[{ required: true, message: 'Please select the image' }]}

                        >
                            <Upload
                                name="file"
                                beforeUpload={beforeUpload1}
                                customRequest={({ file }) => handleFileUpload1(file)}
                                showUploadList={false}  // Hide default upload list
                                accept="image/*"
                            >
                                <Button icon={<UploadOutlined />} >
                                    Click to Upload
                                </Button>
                            </Upload>
                        </Form.Item>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            {renderFileIcon({ fileType: uploadedFileI3?.fileType })}
                            <Typography.Text style={{ fontSize: "10px" }}>{uploadedFileI3?.originalName}</Typography.Text>
                            {uploadedFileI3 && <Button
                                icon={<DeleteOutlined />}
                                type="text"
                                danger
                                onClick={() => handleDeleteFile(uploadedFileI3._id, 3)}

                            />}
                        </div>

                    </Col>
                    <Col span={8}>
                        <Form.Item label="Upload File (Image)">
                            <Upload
                                name="file"
                                beforeUpload={beforeUpload}
                                accept="image/*"
                                customRequest={({ file }) => handleFileUpload(file, 2)}
                                showUploadList={false}  // Hide default upload list
                            >
                                <Button icon={<UploadOutlined />} >
                                    Click to Upload
                                </Button>
                            </Upload>

                        </Form.Item>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            {renderFileIcon({ fileType: uploadedFileId?.fileType })}
                            <Typography.Text style={{ fontSize: "10px" }}>{uploadedFileId?.originalName}</Typography.Text>
                            {uploadedFileId && <Button
                                icon={<DeleteOutlined />}
                                type="text"
                                danger
                                // onClick={handleDeleteFile}
                                onClick={() => handleDeleteFile(uploadedFileId._id, 1)}

                            />}
                        </div>
                    </Col>
                    <Col span={24}>
                        <Flex justify='end' align='end'>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{ width: '100%', marginTop: "30px" }}>
                                    {isEditMode ? 'Update Owner Details' : 'Add Owner Details'}
                                </Button>
                            </Form.Item>
                        </Flex>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default OwnerModal;