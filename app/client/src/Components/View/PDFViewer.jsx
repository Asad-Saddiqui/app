import React from 'react';
import { Modal, Button } from 'antd';
import { ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons';

const PdfViewer = ({ fileUrl, onClose, visible }) => {


    return (
        <Modal
            maskClosable={false}
            onCancel={onClose}
            visible={visible}
            title="PDF Preview"
            width="60%"
            bodyStyle={{ height: 700, overflowY: 'auto', padding: "10px" }}

            style={{ top: 20 }}
            footer={
                false
            }
        >
            <div style={{ height: '100%' }}>
                <iframe
                    id="pdfIframe"
                    src={fileUrl}
                    style={{ width: '100%', height: '100%', border: 'none' }}
                    title="PDF Viewer"
                />
            </div>
        </Modal>
    );
};

export default PdfViewer;
