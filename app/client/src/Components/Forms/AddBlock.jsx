import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get_phases } from '../../App/Slice/phaseSlice';
import { Col, Form, Input, Row, Select, Spin, Upload, Button, Progress, Typography, Modal, notification } from 'antd';
import { UploadOutlined, FilePdfOutlined, FileImageOutlined, DeleteOutlined } from '@ant-design/icons';
import { uploadFile, deleteFile, resetUpload } from '../../App/Slice/uploadSlice';
import { add_block, update_block_by_id, get_blocks, get_blocks_by_phase } from '../../App/Slice/blockSlice';
import Swal from 'sweetalert2';

const { Option } = Select;
const { Text } = Typography;

function AddBlock({ editingBlock, isModalVisible, setIsModalVisible, selectedPhase }) {
    const dispatch = useDispatch();
    const { phases, loading } = useSelector(state => state.Phase);
    const { file, uploading, uploadProgress, error } = useSelector(state => state.upload);
    const [uploadedFileId, setUploadedFileId] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        dispatch(get_phases());
        return () => {
            dispatch(resetUpload());
        };
    }, [dispatch]);

    useEffect(() => {
        if (editingBlock) {
            // Initialize form values
            form.setFieldsValue({
                block_name: editingBlock.block_name,
                block_location: editingBlock.block_location,
                phaseid: editingBlock.phaseid._id,
            });
            // Set the uploaded file ID if a file exists
            setUploadedFileId(editingBlock.file?._id || null);
        } else {
            // Reset the form and file ID for adding new block
            form.resetFields();
            setUploadedFileId(null);
        }
    }, [editingBlock, form]);

    const handleFileUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await dispatch(uploadFile(formData)).unwrap();
            notification.success({
                message: 'Upload Successful',
                description: 'Your file has been uploaded successfully.',
            });
            setUploadedFileId(response?.file._id);  // Store the file ID
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const beforeUpload = (file) => {
        const isPDF = file.type === 'application/pdf';
        const isImage = file.type.startsWith('image/');
        const isAccepted = isPDF || isImage;

        if (!isAccepted) {
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

    const handleFinish = async (values) => {
        try {
            let response;
            let payload = { ...values, file: uploadedFileId }; // Include the file ID in the payload

            if (editingBlock) {
                payload = { ...payload, phaseid: editingBlock.phaseid._id }
                response = await dispatch(update_block_by_id({ updateData: payload, id: editingBlock._id })).unwrap();
                if (response.status === 200) {
                    dispatch(resetUpload());
                }
                Swal.fire(response.status === 200 ? 'Updated!' : 'Update Failed!', response.message, response.status === 200 ? 'success' : 'error');
            } else {
                response = await dispatch(add_block(payload)).unwrap();
                Swal.fire(response.status === 200 ? 'Success' : 'Add Failed!', "Block " + response.message, response.status === 200 ? 'success' : 'error');
                setUploadedFileId(null); // Clear the uploaded file ID
            }
            if (selectedPhase) {
                dispatch(get_blocks_by_phase(selectedPhase));
                form.resetFields(); // Reset form fields after successful addition
                setIsModalVisible(false);


            } else {
                await dispatch(get_blocks({ query: "" })).unwrap();
                setIsModalVisible(false);
                form.resetFields();
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire('Error!', error.message || 'Failed to save the block.', 'error');
        }
    };

    const handleDeleteFile = () => {
        if (uploadedFileId) {
            Modal.confirm({
                title: 'Are you sure you want to delete this file?',
                onOk: async () => {
                    try {
                        await dispatch(deleteFile(uploadedFileId)).unwrap();
                        notification.success({
                            message: 'Delete Successful',
                            description: 'Your file has been deleted successfully.',
                        });
                        setUploadedFileId(null); // Reset uploaded file ID
                    } catch (error) {
                        console.error('Error deleting file:', error);
                    }
                },
            });
        }
    };

    return (
        <Modal
            title={editingBlock ? 'Edit Block' : 'Add Block'}
            visible={isModalVisible}
            onCancel={() => {
                setIsModalVisible(false)
                dispatch(resetUpload());
            }}
            footer={null}
        >
            <Form form={form} layout="vertical" onFinish={handleFinish}>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="block_name"
                            label="Block Name"
                            rules={[{ required: true, message: 'Please enter the Block name' }]}
                        >
                            <Input placeholder="Enter Block name" />
                        </Form.Item>
                    </Col>
                </Row>

                {!editingBlock &&
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="phaseid"
                                label="Select Phase"
                                // initialValue={selectedPhase && selectedPhase}
                                rules={[{ required: true, message: 'Please select a Phase name' }]}
                            >
                                {loading ? (
                                    <Spin />
                                ) : (
                                    <Select placeholder="Select a Phase">
                                        {phases && phases.map(phase => (
                                            <Option key={phase._id} value={phase._id}>
                                                {phase.phase_name}
                                            </Option>
                                        ))}
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                }

                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="block_location"
                            label="Location"
                            rules={[{ required: true, message: 'Please enter the location' }]}
                        >
                            <Input type='url' placeholder="Enter location" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item label="Upload File (PDF/Image)">
                            <Upload
                                name="file"
                                beforeUpload={beforeUpload}
                                customRequest={({ file }) => handleFileUpload(file)}
                                showUploadList={false}  // Hide default upload list
                            >
                                <Button icon={<UploadOutlined />} disabled={uploading}>
                                    {uploading ? 'Uploading...' : 'Click to Upload'}
                                </Button>
                            </Upload>
                            {uploading && (
                                <Progress percent={uploadProgress} />
                            )}
                            {error && <Text type="danger">{error}</Text>}
                        </Form.Item>
                    </Col>
                </Row>

                {uploadedFileId && (
                    <Row gutter={16}>
                        <Col span={24}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                {renderFileIcon({ fileType: file?.fileType })}
                                <Text>{file?.originalName}</Text>
                                {file && <Button
                                    icon={<DeleteOutlined />}
                                    type="text"
                                    danger
                                    onClick={handleDeleteFile}
                                />}
                            </div>
                        </Col>
                    </Row>
                )}

                <Row justify="end">
                    <Col>
                        <Form.Item>
                            <Button type='primary' htmlType='submit'>
                                {editingBlock ? 'Update Block' : 'Add Block'}
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}

export default AddBlock;
