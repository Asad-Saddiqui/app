import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, Row, Col, Divider, InputNumber, Flex } from 'antd';
import { Country, State, City } from 'country-state-city';
import { PlusOutlined } from "@ant-design/icons";
import { useForm } from 'antd/es/form/Form';
import { useSelector } from 'react-redux';

const { Option } = Select;

const LandLocation = ({ form, mode }) => {
    const [countries, setCountries] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [cost, setCost] = useState('');
    const [discountPkr, setDiscountPkr] = useState(0);
    const [discountPer, setDiscountPer] = useState(0);
    const { membership } = useSelector(state => state.Membership);



    useEffect(() => {
        const countryList = Country.getAllCountries();
        setCountries(countryList);
    }, []);

    const handleCountryChange = (value) => {
        const isCode = countries.find((country) => country.name === value);
        setSelectedCountry(isCode?.isoCode);
        const provinceList = State.getStatesOfCountry(isCode?.isoCode);
        setProvinces(provinceList);
        setCities([]);
        setSelectedProvince(null);
    };

    const handleProvinceChange = (value) => {
        const isCode = provinces.find((pro) => pro.name === value);
        setSelectedProvince(isCode?.isoCode);
        const cityList = City.getCitiesOfState(selectedCountry, isCode?.isoCode);
        setCities(cityList);
    };

    const filterCities = (input, option) => {
        return option.children.toLowerCase().includes(input.toLowerCase());
    };

    const handlePercent = (value) => {
        setDiscountPer(value);
        // Calculate discount PKR based on percentage
        if (cost) {
            const discountAmount = (value / 100) * cost;
            setDiscountPkr(discountAmount.toFixed(5));
        }
    };

    const handlePrice = (value) => {
        setDiscountPkr(value);
        if (cost > 0) {
            let percentage = (value / cost) * 100;
            setDiscountPer(percentage.toFixed(5));
        } else {
            console.warn('Cost must be greater than zero to calculate percentage.');
        }
    };
    const handleCostChange = (value) => {
        setCost(value);
        form.setFieldsValue({ cost: value });
        setDiscountPkr(0);
        setDiscountPer(0);


    };

    // Update form fields when cost, discountPkr or discountPer change
    useEffect(() => {
        form.setFieldsValue({
            cost: cost,
            discountpkr: discountPkr,
            discountPer: discountPer,
        });
    }, [cost, discountPkr, discountPer]);

    useEffect(() => {
        if (membership) {
            form.setFieldsValue({
                cost: membership?.cost,
                discountpkr: membership?.discountpkr,
                discountPer: membership?.discountPer,
            });
        }
        
    }, [membership])


    return (
        <Row gutter={8}>
            {/* Land Size */}
            {!mode && <Col sm={22} md={22} lg={22} xl={22} xxl={22}>
                <Divider>Land Location and Price</Divider>
            </Col>}
            {mode && <Divider />}
            <Col sm={22} md={11} lg={11} xl={11} xxl={11}>
                <Form.Item label="Land Size" name="landSize" rules={[{ required: true, message: 'Please enter the land size' }]}>
                    <InputNumber placeholder="Land Size" style={{ width: '100%' }} />
                </Form.Item>
            </Col>

            {/* Land Unit */}
            <Col sm={22} md={11} lg={11} xl={11} xxl={11}>
                <Form.Item label="Land Unit" name="landUnit" rules={[{ required: true, message: 'Please select a land unit' }]}>
                    <Select placeholder="Select Land Unit" style={{ width: '100%' }}>
                        <Option value="kanal">Kanal</Option>
                        <Option value="marla">Marla</Option>
                        <Option value="squareFeet">Square Feet</Option>
                        <Option value="squareMeter">Square Meter</Option>
                        <Option value="squareYard">Square Yard</Option>
                    </Select>
                </Form.Item>
            </Col>
            <Col sm={22} md={22} lg={22} xl={22} xxl={22}>
                <Form.Item
                    label="Covered Area"

                >
                    <Flex style={{ gap: '8px' }}> {/* Add gap between inputs */}
                        <Form.Item name="D1" noStyle rules={[{ required: true, message: 'Please enter the width' }]}>
                            <InputNumber placeholder="Width" style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item name="D2" noStyle rules={[{ required: true, message: 'Please enter the length' }]}>
                            <InputNumber placeholder="Length" style={{ width: '100%' }} />
                        </Form.Item>
                    </Flex>
                </Form.Item>
            </Col>

            {/* Land Cost */}
            <Col sm={22} md={11} lg={11} xl={11} xxl={11}>
                <Form.Item label="Land Cost" name="cost" rules={[{ required: true, message: 'Please enter cost' }]}>
                    <InputNumber
                        min={0}
                        value={cost}
                        onChange={handleCostChange}
                        placeholder='Price...'
                        style={{ width: '100%' }}
                    />
                </Form.Item>
            </Col>

            {/* Discount PKR */}
            <Col sm={22} md={11} lg={11} xl={11} xxl={11}>
                <Form.Item label="Discount" name="discountpkr" rules={[{ required: true, message: 'Please enter discount in price' }]}>
                    <InputNumber min={0} value={discountPkr} onChange={handlePrice} placeholder="Discount Pkr" style={{ width: '100%' }} />
                </Form.Item>
            </Col>

            {/* Discount % */}
            <Col sm={22} md={11} lg={11} xl={11} xxl={11}>
                <Form.Item label="Discount %" name="discountPer" rules={[{ required: true, message: 'Please enter discount in %' }]}>
                    <InputNumber min={0} value={discountPer} onChange={handlePercent} placeholder="Discount %" style={{ width: '100%' }} />
                </Form.Item>
            </Col>

            {/* Country */}
            <Col sm={22} md={11} lg={11} xl={11} xxl={11}>
                <Form.Item label="Country" name="country" rules={[{ required: true, message: 'Please select country' }]}>
                    <Select placeholder="Select Country" showSearch onChange={handleCountryChange}>
                        {countries.map((country) => (
                            <Option key={country.name} value={country.name}>
                                {country.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            </Col>

            {/* Province/State */}
            <Col sm={22} md={11} lg={11} xl={11} xxl={11}>
                <Form.Item label="Province/State" name="province" rules={[{ required: true, message: 'Please select province/state' }]}>
                    <Select placeholder="Select Province/State" onChange={handleProvinceChange} showSearch disabled={!provinces.length}>
                        {provinces.map((province) => (
                            <Option key={province.name} value={province.name}>
                                {province.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            </Col>

            {/* City */}
            <Col sm={22} md={11} lg={11} xl={11} xxl={11}>
                <Form.Item label="City" name="city" rules={[{ required: true, message: 'Please select city' }]}>
                    <Select placeholder="Select City" disabled={!cities.length} showSearch filterOption={filterCities}>
                        {cities.map((city) => (
                            <Option key={city.name} value={city.name}>
                                {city.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            </Col>

            {/* Location URL */}
            <Col sm={22} md={11} lg={11} xl={11} xxl={11}>
                <Form.Item label="Location URL" name="locationUrl" rules={[{ required: true, message: 'Please enter a location URL' }]}>
                    <Input placeholder="Enter Location URL" />
                </Form.Item>
            </Col>

            {/* Address */}
            <Col sm={22} md={11} lg={11} xl={11} xxl={11}>
                <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Please enter the complete address' }]}>
                    <Input placeholder="Address..." style={{ width: '100%' }} />
                </Form.Item>
            </Col>
        </Row>
    );
};

export default LandLocation;
