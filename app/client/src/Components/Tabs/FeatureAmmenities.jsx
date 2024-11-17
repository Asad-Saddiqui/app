import React, { useState } from 'react';
import { Row, Col, Form, Button, Checkbox, Select, Modal, Input, Divider } from 'antd';

const { Option } = Select;

const FeatureAmenities = ({ propertyType }) => {
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newFeature, setNewFeature] = useState('');
    const [additionalFeatures, setAdditionalFeatures] = useState([]);

    const handleFinish = (values) => {
        console.log('Submitted values:', values);
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        if (newFeature) {
            setAdditionalFeatures(prev => [...prev, newFeature]);
            setNewFeature(''); // Clear the input field
        }
        handleCancel();
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const plots = [
        'Marble Flooring',
        'Wooden Flooring',
        'Tiles Flooring',
        'Electricity Backup (Generator)',
        'Electricity Backup (Solar)',
        'Central Heating',
        'Furnished',
        'Air Conditioning',
        'Parking Space',
        'Garden',
        'Balcony',
        'Corner',
        'Park Facing',
        'Disputed',
        'File',
        'Balloted',
        'Sewerage',
        'Electricity',
        'Water Supply',
        'Sui Gas',
        'Boundary Wall',
    ];

    const houses = [
        'Central Heating',
        'Air Conditioning',
        'Furnished',
        'Parking Space',
        'Garden',
        'Balcony',
        'Swimming Pool',
        'Security System',
        'Fireplace',
        'Smart Home Features',
        'Energy Efficient Appliances',
    ];

    const commercial = [
        'Open Plan Layout',
        'Cubicles',
        'Electricity Backup (Generator)',
        'Electricity Backup (Solar)',
        'Meeting Rooms',
        'Reception Area',
        'Parking Available',
        'Security System',
        'High-Speed Internet',
        'Elevator Access',
        'Fire Safety Equipment',
    ];

    const getFeatures = () => {
        switch (propertyType) {
            case 'plot':
                return plots;
            case 'home':
                return houses;
            case 'commercial':
                return commercial;
            default:
                return [];
        }
    };

    return (
        <div>



            <Row gutter={8}>
                <Col sm={22} md={22} lg={22} xl={22} xxl={22}>
                    <Divider>Feature and Amenities</Divider>
                </Col>
                {getFeatures().map((feature, index) => (
                    <Col sm={10} md={7} lg={5} xl={5} xxl={5} key={index}>
                        <Form.Item name={feature} valuePropName="checked">
                            <Checkbox>{feature}</Checkbox>
                        </Form.Item>
                    </Col>
                ))}
                {additionalFeatures.map((feature, index) => (
                    <Col sm={10} md={7} lg={5} xl={5} xxl={5} key={index}>
                        <Form.Item name={feature} valuePropName="checked">
                            <Checkbox checked >{feature}</Checkbox>
                        </Form.Item>
                    </Col>
                ))}
            </Row>

            <Button type="primary" onClick={showModal}>
                Add Feature
            </Button>



            <Modal
                title="Add Feature"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div style={{ height: "100px" }}>
                    <Input
                        value={newFeature}
                        style={{ marginTop: "30px" }}
                        onChange={(e) => setNewFeature(e.target.value)}
                        placeholder="Enter new feature name"
                    />
                </div>
            </Modal>
        </div >
    );
};

export default FeatureAmenities;
