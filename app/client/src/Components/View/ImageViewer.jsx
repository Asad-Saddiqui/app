// components/ImageViewer.js
import React from 'react';
import { Image, Modal } from 'antd';

const ImagePreview = ({ fileUrl, visible, onClose }) => {
    return (
        <Modal
            visible={visible}
            title="Image Preview"
            footer={null}
            onCancel={onClose}
            width="60%"
            centered

            style={{ top: 20 }}
            bodyStyle={{ padding: '0' }} // Remove padding around the image
        >

            <div style={{ width: "100%" }}>
                <img
                    src={fileUrl}
                    alt="Preview"
                    style={{ width: '100%', height: 'auto' }} // Ensure image 
                />
            </div>
        </Modal>
    );
};

export default ImagePreview;
