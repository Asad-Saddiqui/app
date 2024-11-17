import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { Table, Button, Flex, Select, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { ImportMembership } from '../../App/Slice/membershipSlice';
import Swal from 'sweetalert2'
import { get_phases } from '../../App/Slice/phaseSlice';
const PlotAllocationTable = () => {
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [selectedPhase, setSelectedPhase] = useState()
    const { loading: phaseLoading, phases } = useSelector(state => state.Phase);
    const [tableKey, setTableKey] = useState(0);
    const [loadinsheet, setLoadingSheet] = useState(false);

    const dispatch = useDispatch()
    const handleFileUpload = (event) => {
        setLoadingSheet(true)
        console.log('loadding')
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const ab = e.target.result;
            const wb = XLSX.read(ab, { type: 'array' });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const json = XLSX.utils.sheet_to_json(ws, { header: 1 });

            // Expected headers and subheaders for validation


            const expectedHeaders = ["Allocation of Plot", "Allottee / Purchaser", "Cost of Plot", "Payments of Plot", "Dues of Plot"];
            const expectedSubHeadersCount = 6; // Adjust based on your expected subheader count

            const headers = json[0] || [];
            const subheaders = json[1] || [];
            const data = json.slice(2);
            console.log('header', headers)
            console.log('subheaders', subheaders)

            // Validate headers
            const headersValid = expectedHeaders.every((header) => headers.includes(header));
            const subHeadersValid = subheaders.length >= expectedSubHeadersCount;
            console.log('headersValid', headersValid)
            console.log('subHeadersValid', subHeadersValid)

            // Check if headers and structure match the expected format
            if (!headersValid || !subHeadersValid) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'The uploaded file structure does not match the expected format. Please upload a valid file.',
                    confirmButtonText: 'Try Again',
                });
                setLoadingSheet(false)
                return;
            }

            // Rest of the code for parsing data and setting columns and data
            const antColumns = headers.map((header, index) => {
                let children = [];
                if (header === "Allocation of Plot") {
                    children = subheaders.slice(index, index + 3).map((subheader, subIndex) => ({
                        title: subheader || 'N/A',
                        dataIndex: `sub${index}-${subIndex}`,
                        key: `sub${index}-${subIndex}`,
                        width: 150,
                    }));
                } else if (["Allottee / Purchaser", "Cost of Plot", "Payments of Plot", "Dues of Plot"].includes(header)) {
                    children = subheaders.slice(index, index + 6).map((subheader, subIndex) => ({
                        title: subheader || 'N/A',
                        dataIndex: `sub${index}-${subIndex}`,
                        key: `sub${index}-${subIndex}`,
                        width: 150,
                    }));
                }

                return {
                    title: header || 'N/A',
                    dataIndex: `col${index}`,
                    key: `col${index}`,
                    children: children.length > 0 ? children : null,
                    width: 150,
                };
            });

            const antData = data.map((row, rowIndex) => {
                const rowData = {};
                headers.forEach((header, index) => {
                    rowData[`col${index}`] = row[index] || 0;
                    if (["Allocation of Plot", "Allottee / Purchaser", "Cost of Plot", "Payments of Plot", "Dues of Plot"].includes(header)) {
                        subheaders.slice(index, index + 6).forEach((subheader, subIndex) => {
                            rowData[`sub${index}-${subIndex}`] = row[index + subIndex] || 0;
                        });
                    }
                });
                return { key: rowIndex, ...rowData };
            });

            setColumns(antColumns);
            setData(antData);
            setLoadingSheet(false)
        };

        reader.readAsArrayBuffer(file);
        setLoadingSheet(false)
    };
    const handleLogData = async () => {
        if (!selectedPhase || !data) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: "Please Fill All Fields",
                confirmButtonText: 'Try Again'
            });
        } else {
            const formatedData = data.map((dta, i) => {
                let myData = [];
                console.log('columns', columns)
                for (let index = 0; index < columns.length; index++) {

                    if (columns[index]) {
                        if (columns[index]?.children) {
                            //    console.log('columns[index]?.children', columns[index])
                            for (let j = 0; j < columns[index]?.children?.length; j++) {
                                // console.log('columns[index]', columns[index].title)
                                // if (columns[index].title === "Allottee / Purchaser") {
                                myData.push([columns[index]?.title, [columns[index]?.children[j]?.title, dta[columns[index].children[j]?.dataIndex]]])

                            }
                        } else {
                            myData.push([columns[index].title, dta[columns[index].dataIndex]])
                        }
                    }
                }

                // console.log('myData', myData)


                const obj = {};
                // console.log('mydata', myData)

                myData.forEach(([key, value]) => {
                    switch (key) {




                        case 'Payments of Plot':
                            // If the key is not already an object, create an empty one
                            if (!obj[key]) {
                                obj[key] = {};
                            }
                            // Convert the nested array into an object key-value pair
                            obj[key][value[0]?.trim().toLowerCase()] = value[1];
                            break;
                        case 'Allottee / Purchaser':
                            // If the key is not already an object, create an empty one
                            if (!obj[key]) {
                                obj[key] = {};
                            }
                            // Convert the nested array into an object key-value pair
                            obj[key][value[0]?.trim().toLowerCase()] = value[1];
                            break;
                        case 'Cost of Plot':
                            // If the key is not already an object, create an empty one
                            if (!obj[key]) {
                                obj[key] = {};
                            }
                            // Convert the nested array into an object key-value pair
                            obj[key][value[0].trim().toLowerCase()] = value[1];
                            break;
                        case 'Dues of Plot':
                            // If the key is not already an object, create an empty one
                            if (!obj[key]) {
                                obj[key] = {};
                            }
                            // Convert the nested array into an object key-value pair
                            obj[key][value[0]?.trim().toLowerCase()] = value[1];
                            break;
                        case 'Allocation of Plot':
                            // If the key is not already an object, create an empty one
                            if (!obj[key]) {
                                obj[key] = {};
                            }
                            // Convert the nested array into an object key-value pair
                            obj[key][value[0]?.trim().toLowerCase()] = value[1];
                            break;

                        default:
                            // If the key already exists, push the new value to the array
                            if (obj[key]) {
                                obj[key] = Array.isArray(obj[key]) ? [...obj[key], value] : [obj[key], value];
                            } else {
                                // If the key doesn't exist, initialize it with the value
                                obj[key] = value;
                            }
                            break;
                    }
                });

                console.log(obj);
                myData = [];
                return obj
                // console.log('obj---------------------', obj)

            })
            const res = await dispatch(ImportMembership({ phase: selectedPhase, data: formatedData.filter(dta => dta['S. No.'] !== 0) }));
            if (res.type.endsWith('/fulfilled')) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: res.payload.message,
                    confirmButtonText: 'OK'
                });
                setData([])
                setColumns([])

                setData([]);
                setColumns([]);
                setTableKey(prevKey => prevKey + 1); // Change the key to force a re-render
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'The uploaded file structure does not match the expected format. Please upload a valid file.',
                    confirmButtonText: 'Try Again'
                });
            }
        }

    };
    useEffect(() => {
        dispatch(get_phases({ query: "" }))
    }, [dispatch])

    const handleSelect = (value) => {
        setSelectedPhase(value)
    }
    return (
        <div>
            <Flex justify='space-between'>
                <h2>Membership  Data</h2>
                <div>
                    <Select
                        placeholder="Select Phase"
                        style={{ width: "200px", marginRight: "20px" }}
                        onSelect={handleSelect}
                    >
                        {phases && phases.map((dta, i) => (
                            <Select.Option key={i} value={dta._id}>
                                {dta.phase_name}
                            </Select.Option>
                        ))}
                    </Select>
                    <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
                    <Button disabled={!data.length} onClick={handleLogData} type="primary" style={{ margin: '10px 0' }}>
                        Save Data
                    </Button>
                </div>
            </Flex>


            <Spin spinning={loadinsheet} fullscreen={loadinsheet}>
                <Table
                    key={tableKey}
                    columns={columns}
                    dataSource={data}
                    bordered
                    pagination={true}
                    scroll={{ x: 'max-content' }} // Enable horizontal scroll if needed
                />
            </Spin>

        </div>
    );
};

export default PlotAllocationTable;
