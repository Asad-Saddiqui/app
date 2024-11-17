import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, Row, Col, Divider } from 'antd';
import { PlusOutlined } from "@ant-design/icons";
import Compact from 'antd/es/space/Compact';
import AddPhase from '../Forms/AddPhase';
import AddBlock from '../Forms/AddBlock';
import PurposeModal from '../Forms/PurposeModal';
import PropertyModal from '../Forms/PropertyModal';
import PropertyTypeModal from '../Forms/PropertyTypeModal';
import OwnerModal from '../Forms/OwnerModal';
import StatusModal from '../Forms/StatusModal';

import { useDispatch, useSelector } from 'react-redux';
import { get_phases } from '../../App/Slice/phaseSlice';
import { get_blocks_by_phase } from '../../App/Slice/blockSlice';

const { Option } = Select;

const MembershipDetails = ({ mode, propertyType, setPropertyType }) => {
    const { owners, loading } = useSelector(state => state.Owner)
    console.log('owners', owners)

    const [propertyOptions, setPropertyOptions] = useState([{
        label: 'home',
        data: [
            { value: 'house', label: 'House' },
            { value: 'flat', label: 'Flat' },
            { value: 'upper portion', label: 'Upper Portion' },
            { value: 'lower portion', label: 'Lower Portion' },
            { value: 'farm house', label: 'Farm House' },
            { value: 'room', label: 'Room' },
            { value: 'penthouse', label: 'Penthouse' },
        ]
    }, {
        label: 'plot',
        data: [
            { value: 'residential plot', label: 'Residential Plot' },
            { value: 'commercial plot', label: 'Commercial Plot' },
            { value: 'agricultural land', label: 'Agricultural Land' },
            { value: 'industrial land', label: 'Industrial Land' },
        ]
    }, {
        label: "commercial",
        data: [
            { value: 'office', label: 'Office' },
            { value: 'shop', label: 'Shop' },
            { value: 'warehouse', label: 'Warehouse' },
            { value: 'factory', label: 'Factory' },
            { value: 'building', label: 'Building' },
            { value: 'other', label: 'Other' },
        ]
    }]);
    const [newProOptions, setNewProOptions] = useState();
    const [addPhaseVisible, setAddPhaseVisible] = useState(false);
    const [addBlockVisible, setAddBlockVisible] = useState(false);
    const [purposeModalVisible, setPurposeModalVisible] = useState(false);
    const [propertyModalVisible, setPropertyModalVisible] = useState(false);
    const [propertyTypeModalVisible, setPropertyTypeModalVisible] = useState(false);
    const [ownerModalVisible, setOwnerModalVisible] = useState(false);
    const [editingBlock, setEditingBlock] = useState(null);
    const { phases } = useSelector(state => state.Phase);
    const { blocks } = useSelector(state => state.Block);
    const [propertyTYpe, setPropertyType_] = useState(['home', 'plot', 'commercial']);
    const [statuses, setStatuses] = useState([
        'active',
        'canceled',
        'non possession',
    ]);
    const [statusModalVisible, setStatusModalVisible] = useState(false);

    const addStatus = (newStatus) => {
        setStatuses((prevStatuses) => [...prevStatuses, newStatus]);
    };
    const [phaseBlocks, setPhaseBlocks] = useState(true);
    const [selectedProperty, setSelectedProperty] = useState();
    const dispatch = useDispatch();

    const handlePropertyChange = (value) => {
        setPropertyType(value);
        setSelectedProperty(value);
        const dta = propertyOptions.find(dta => dta.label === value);
        setNewProOptions(dta);
    };

    useEffect(() => {
        // Fetch necessary data or initialize state if needed
    }, []);

    const toggleAddPhase = () => setAddPhaseVisible(!addPhaseVisible);
    const toggleAddBlock = () => setAddBlockVisible(!addBlockVisible);

    const handleFetchBlockByPhase = (values) => {
        setPhaseBlocks(false);
        dispatch(get_blocks_by_phase(values));
    };

    return (
        <>
            <StatusModal
                visible={statusModalVisible}
                onClose={() => setStatusModalVisible(false)}
                addStatus={addStatus}
            />
            {addPhaseVisible && <AddPhase onClose={toggleAddPhase} fetchPhases={async () => await dispatch(get_phases({ query: '' })).unwrap()} />}
            {addBlockVisible && <AddBlock editingBlock={editingBlock} isModalVisible={addBlockVisible} setIsModalVisible={toggleAddBlock} />}
            {purposeModalVisible && <PurposeModal visible={purposeModalVisible} onClose={() => setPurposeModalVisible(false)} />}
            {propertyModalVisible && <PropertyModal visible={propertyModalVisible} setPropertyType_={setPropertyType_} onClose={() => setPropertyModalVisible(false)} />}
            {propertyTypeModalVisible && <PropertyTypeModal visible={propertyTypeModalVisible} selectedProperty={selectedProperty} setPropertyOptions={setPropertyOptions} onClose={() => setPropertyTypeModalVisible(false)} propertyOptions={propertyOptions} />}
            {ownerModalVisible && <OwnerModal visible={ownerModalVisible} onClose={() => setOwnerModalVisible(false)} />}

            <Row gutter={8}>
                {!mode && <Col sm={22} md={22} lg={!mode ? 22 : 24} xl={!mode ? 22 : 24} xxl={!mode ? 22 : 24}>
                    <Divider>Membership Details</Divider>
                </Col>}
                {/* New Membership ID */}
                {!mode &&
                    <>
                        {/* <Col sm={22} md={11} lg={11} xl={11} xxl={11}>
                            <Form.Item label="New Membership ID" name="newMembershipId" rules={[{ required: true, message: 'Please enter new membership ID' }]}>
                                <Input placeholder="Enter New Membership ID" />
                            </Form.Item>
                        </Col> */}

                        {/* Old Membership ID */}
                        <Col sm={22} md={22} lg={22} xl={22} xxl={22}>
                            <Form.Item label="Old Membership ID" name="oldMembershipId">
                                <Input placeholder="Enter Old Membership ID" />
                            </Form.Item>
                        </Col>
                    </>
                }
                {mode && <Divider />}
                <Col sm={22} md={11} lg={!mode ? 11 : 12} xl={!mode ? 11 : 12} xxl={!mode ? 11 : 12}>
                    <Compact style={{ width: '100%' }}>
                        <Form.Item label="Select Phase" name="phase" rules={[{ required: true, message: 'Please select phase' }]} style={{ width: "80%" }}>
                            <Select placeholder="Select Phase" onChange={handleFetchBlockByPhase}>
                                {phases && phases.map((phase) => (
                                    <Option key={phase._id} value={phase._id}>{phase.phase_name}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item label=' ' style={{ width: "20%" }}>
                            <Button onClick={toggleAddPhase} style={{ width: "100%" }}>
                                <PlusOutlined />
                            </Button>
                        </Form.Item>
                    </Compact>

                </Col>

                {/* Select Block */}
                <Col sm={22} lg={!mode ? 11 : 12} xl={!mode ? 11 : 12} xxl={!mode ? 11 : 12}>

                    <Compact style={{ width: '100%' }}>
                        <Form.Item label="Select Block" name="block" rules={[{ required: true, message: 'Please select block' }]} style={{ width: "80%" }}>
                            <Select placeholder="Select Block" disabled={phaseBlocks}>
                                {blocks && blocks.map((dta, i) => (
                                    <Option key={i} value={dta._id}>{dta.block_name}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item label=" " style={{ width: "20%" }}>

                            <Button onClick={toggleAddBlock} style={{ width: "100%" }}>
                                <PlusOutlined />
                            </Button>
                        </Form.Item>
                    </Compact>
                </Col>

                {/* Select Purpose */}
                <Col sm={22} md={22} lg={!mode ? 22 : 24} xl={!mode ? 22 : 24} xxl={!mode ? 22 : 24}>
                    <Form.Item label="Plot #" name="plotNo" rules={[{ required: true, message: 'Please Enter #' }]}>

                        <Input type='text' />

                    </Form.Item>
                </Col>
                <Col sm={22} md={22} lg={!mode ? 22 : 24} xl={!mode ? 22 : 24} xxl={!mode ? 22 : 24}>
                    <Form.Item label="Select Purpose" name="purpose" rules={[{ required: true, message: 'Please select purpose' }]}>

                        <Select placeholder="Select Purpose">
                            <Option value="Sell">Sell</Option>
                            <Option value="Rent">Rent</Option>
                        </Select>

                    </Form.Item>
                </Col>

                {/* Select Property */}
                <Col sm={22} md={22} lg={!mode ? 22 : 24} xl={!mode ? 22 : 24} xxl={!mode ? 22 : 24}>

                    <Compact style={{ width: '100%' }}>
                        <Form.Item label="Select Property" name="property" rules={[{ required: true, message: 'Please select property' }]} style={{ width: "80%" }}>
                            <Select placeholder="Select Property" onChange={handlePropertyChange}>
                                {propertyTYpe && propertyTYpe.map((dta, i) => (
                                    <Option value={dta} key={i}>{dta.charAt(0).toUpperCase() + dta.slice(1).toLowerCase()}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item label=" " style={{ width: "20%" }}>
                            <Button style={{ width: "100%" }} onClick={() => setPropertyModalVisible(true)}>
                                <PlusOutlined />
                            </Button>
                        </Form.Item>

                    </Compact>
                </Col>

                {/* Select Property Type */}
                <Col sm={22} md={22} lg={!mode ? 22 : 24} xl={!mode ? 22 : 24} xxl={!mode ? 22 : 24}>

                    <Compact style={{ width: '100%' }}>
                        <Form.Item label="Select Property Type" name="propertyType" rules={[{ required: true, message: 'Please select property type' }]} style={{ width: "80%" }}>
                            <Select placeholder="Select Type" disabled={!selectedProperty}>
                                {newProOptions?.data?.map(option => (
                                    <Option key={option.value} value={option.value}>
                                        {option.label}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item label=" " style={{ width: "20%" }}>
                            <Button style={{ width: "100%" }} disabled={!selectedProperty} onClick={() => setPropertyTypeModalVisible(true)}>
                                <PlusOutlined />
                            </Button>
                        </Form.Item>
                    </Compact>
                </Col>

                {/* Other form fields go here */}

                {/* <Col sm={22} md={22} lg={22} xl={22} xxl={22}>

                    <Compact style={{ width: '100%' }}>

                        <Form.Item label="Status" name="status" rules={[{ required: true, message: 'Please select Status' }]} style={{ width: "80%" }}>




                            <Select placeholder="Select Status" >
                                {statuses.map((status, index) => (
                                    <Option key={index} value={status}>{status}</Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item label=" " style={{ width: "20%" }}>
                            <Button style={{ width: "100%" }} onClick={() => setStatusModalVisible(true)}>
                                <PlusOutlined />
                            </Button>
                        </Form.Item>
                    </Compact>
                </Col> */}

                {/* Select Owner */}


                {/* Select Status */}

            </Row >
        </>
    );
};

export default MembershipDetails;
