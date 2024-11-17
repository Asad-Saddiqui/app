import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Table } from 'antd';

const PlotAllocationTable = () => {
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const ab = e.target.result;
            const wb = XLSX.read(ab, { type: 'array' });
            const wsname = wb.SheetNames[0]; // Assuming we want the first sheet
            const ws = wb.Sheets[wsname];
            const json = XLSX.utils.sheet_to_json(ws, { header: 1 }); // Read the data as an array of arrays

            const headers = json[0]; // First row as headers
            const subheaders = json[1]; // Second row as subheaders
            const data = json.slice(2); // Remaining rows as data

            // Create Ant Design columns based on headers and subheaders
            const antColumns = headers.map((header, index) => {
                let children = [];

                // Filter out "M. S. No." and "NAME" from subheaders under "Allocation of Plot"
                if (header === "Allocation of Plot") {
                    children = subheaders.slice(index, index + 3).map((subheader, subIndex) => ({
                        title: subheader || 'N/A',
                        dataIndex: `sub${index}-${subIndex}`,
                        key: `sub${index}-${subIndex}`,
                        width: 150,
                    }));
                } else if (["Allottee / Purchaser", "Payments of Plot", "Cost of Plot", "Dues of Plot"].includes(header)) {
                    children = subheaders.slice(index, index + 6).map((subheader, subIndex) => ({
                        title: subheader || 'N/A',
                        dataIndex: `sub${index}-${subIndex}`,
                        key: `sub${index}-${subIndex}`,
                        width: 150,
                    }));
                }

                return {
                    title: header,
                    dataIndex: `col${index}`,
                    key: `col${index}`,
                    children: children.length > 0 ? children : null,
                    width: 150,
                };
            });

            console.log('first', data)

            // Map the data rows into an object with key-value pairs
            const antData = data.map((row, rowIndex) => {
                const rowData = {};
                headers.forEach((header, index) => {
                    rowData[`col${index}`] = row[index] || 'N/A'; // Add main column values
                    if (subheaders[index]) {
                        rowData[`sub${index}`] = row[index] || 'N/A';
                    }
                });
                return { key: rowIndex, ...rowData };
            });

            setColumns(antColumns);
            setData(antData);
        };

        reader.readAsArrayBuffer(file);
    };
    // console.log('data', data)

    return (
        <div>
            <h2>Upload Plot Data</h2>
            <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
            <h2>Allocation of Plot</h2>
            <Table
                columns={columns}
                dataSource={data}
                bordered
                pagination={false}
                scroll={{ x: 'max-content' }} // Enable horizontal scroll if needed
            />
        </div>
    );
};

export default PlotAllocationTable;
