import React, { useState, useEffect } from 'react';
import { EditOutlined, EnvironmentOutlined, PlusOutlined, FilePdfOutlined, FileImageOutlined } from '@ant-design/icons';
import { Tooltip, Table, Button, Form, Input, Modal, Spin, Typography, Divider, Flex } from 'antd';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { add_block, update_block_by_id, get_blocks, delete_block_by_id } from '../../App/Slice/blockSlice';
import AddBlock from '../../Components/Forms/AddBlock';
import ImagePreview from '../../Components/View/ImageViewer';
import PDFViewer from '../../Components/View/PDFViewer';
import { resetUpload } from '../../App/Slice/uploadSlice';
// import PDFViewer from '../../components/View/PDFViewer';
// import ImagePreview from '../../components/View/ImageViewer';


const Block = () => {
  const dispatch = useDispatch();
  const { loading: blockLoading, blocks } = useSelector(state => state.Block);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingBlock, setEditingBlock] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPhases, setFilteredPhases] = useState([]);
  const [filteredBlocks, setFilteredBlocks] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewTitle, setPreviewTitle] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [previewPdf, setPreviewPdf] = useState('');

  useEffect(() => {
    const fetchBlocks = async () => {
      setLoading(true);
      try {
        await dispatch(get_blocks({ query: searchQuery })).unwrap();
      } catch (error) {
        console.error('Error fetching blocks:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlocks();
  }, [dispatch, searchQuery]);

  useEffect(() => {
    const uniquePhases = Array.from(new Set(blocks?.map(block => block.phaseid.phase_name)));
    const uniqueBlocks = Array.from(new Set(blocks?.map(block => block.block_name)));
    setFilteredPhases(uniquePhases);
    setFilteredBlocks(uniqueBlocks);
  }, [blocks]);

  useEffect(() => {
    if (editingBlock) {
      form.setFieldsValue({
        block_name: editingBlock.block_name,
        block_location: editingBlock.block_location,
        phaseid: editingBlock.phaseid._id, // Adjust if necessary based on how you handle phases
      });
    } else {
      form.resetFields(); // Clear form if no block is being edited
    }
  }, [editingBlock, form]);

  const showModal = (block) => {
    setEditingBlock(block);
    setIsModalVisible(true);
  };

  const handleDelete = (record) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete block ${record.block_name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await dispatch(delete_block_by_id(record._id)).unwrap();
          Swal.fire('Deleted!', 'Block has been deleted.', 'success');
          await dispatch(get_blocks({ query: searchQuery })).unwrap();
        } catch (error) {
          console.error('Error:', error);
          Swal.fire('Error!', error.message || 'Failed to delete the block.', 'error');
        }
      }
    });
  };

  const getFileIcon = (fileType) => {
    if (fileType === 'pdf') {
      return <FilePdfOutlined style={{ fontSize: '24px', color: '#ff4d4f' }} />;
    } else if (fileType === 'image') {
      return <FileImageOutlined style={{ fontSize: '24px', color: '#1890ff' }} />;
    }
    return null;
  };

  const handleFilePreview = (file) => {
    const fileUrl = `http://localhost:8001/api/assets/${file.filePath}`;

    if (file.fileType === 'pdf') {
      setPreviewPdf(fileUrl);
      setPreviewVisible(true);
    } else if (file.fileType === 'image') {
      setPreviewTitle(file.originalName);
      setPreviewImage(fileUrl);
      setPreviewVisible(true);
    }
  };

  const columns = [
    {
      title: 'Phase name',
      dataIndex: ['phaseid', 'phase_name'],
      key: 'phase_name',
      filters: filteredPhases.map(phase => ({ text: phase, value: phase })),
      onFilter: (value, record) => record.phaseid.phase_name === value,
    },
    {
      title: 'Block name',
      dataIndex: 'block_name',
      key: 'block_name',
      filters: filteredBlocks.map(block => ({ text: block, value: block })),
      onFilter: (value, record) => record.block_name === value,
    },
    {
      title: 'Location',
      dataIndex: 'block_location',
      key: 'block_location',
      render: (text) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          <EnvironmentOutlined /> View Location
        </a>
      ),
    },
    {
      title: 'File',
      key: 'file',
      render: (text, record) => (
        record.file ? (
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
            onClick={() => handleFilePreview(record.file)}
          >
            {getFileIcon(record.file.fileType)}
            <span>{record.file.originalName}</span>
          </div>
        ) : (
          <span>No File</span>
        )
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div>
          <Tooltip title="Edit">
            <Button
              type="link"
              icon={<EditOutlined style={{ fontSize: '18px' }} />}
              onClick={() => showModal(record)}
            />
          </Tooltip>
          {/* Uncomment the delete button if needed */}
          {/* <Tooltip title="Delete">
            <Button
              type="link"
              icon={<DeleteOutlined style={{ fontSize: '18px' }} />}
              danger
              onClick={() => handleDelete(record)}
            />
          </Tooltip> */}
        </div>
      ),
    }
  ];

  return (
    <div style={{ backgroundColor: 'white', width: '100%', height: '100%', padding: '24px 24px' }}>
      <Typography.Title level={4}>Block</Typography.Title>
      <Divider />
      <Flex style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Input
          placeholder="Search by block name"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          style={{ width: '300px', height: '48px' }}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            dispatch(resetUpload())
            setIsModalVisible(true)
            setEditingBlock(null)
          }
          }
        >
          Add Block
        </Button>
      </Flex>
      <Table
        columns={columns}
        dataSource={blocks}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        style={{ marginTop: '40px', fontSize: '22px' }}
      />
      {/* Add Block Modal */}

      <AddBlock
        editingBlock={editingBlock} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}
      />

      {/* PDF Viewer */}
      {previewPdf && (
        <PDFViewer
          fileUrl={previewPdf}
          visible={!!previewPdf}
          onClose={() => setPreviewPdf('')}
        />
      )}
      {/* Image Preview */}
      {previewImage && (
        <ImagePreview
          fileUrl={previewImage}
          visible={!!previewImage}
          onClose={() => setPreviewImage('')}
        />
      )}
    </div>
  );
};

export default Block;
