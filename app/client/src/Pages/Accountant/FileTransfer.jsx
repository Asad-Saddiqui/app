import React, { useEffect, useState } from 'react';
import { Button, Modal, Typography, Input, Tag } from 'antd';
import { DataGrid } from '@mui/x-data-grid'; // Import DataGrid
import { FetchTransferFile } from '../../App/Slice/transferSlice';
import { useDispatch, useSelector } from 'react-redux';
import TransferManage from '../../Components/Forms/TransferManage';

const { Text } = Typography;
const { Search } = Input; // Destructure Search from Input

const FileTransfer = ({ account }) => {
    const dispatch = useDispatch();
    const { transfer_file } = useSelector(state => state.transfer);
    const [visible, setVisible] = useState(false);
    const [detailsVisible, setDetailsVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [detailsRow, setDetailsRow] = useState(null); // State for storing details row
    const [searchText, setSearchText] = useState(''); // State for search input

    useEffect(() => {
        dispatch(FetchTransferFile());
    }, [dispatch]);
    const statusColorMap = {
        'Draft': 'default',
        'Submitted to Manager': 'blue',
        'Under Review by Accounts': 'orange',
        'Approved by Accounts': 'green',
        'Rejected by Accounts': 'red',
        'Under Review by Manager': 'orange',
        'Approved by Manager': 'green',
        'Rejected by Manager': 'red',
        'Under Final Review by Admin': 'orange',
        'Rejected by Admin': 'red',
        'Transfer Completed': 'green',
        'Closed': 'purple',
        'Open': 'gold',
    };
    // Format the data for the DataGrid and ensure unique rows
    const formattedData = (transfer_file ?? []).map(file => {
        // Combine sellers and purchasers into strings
        const sellers = file.sellerName.map(seller => ({
            name: seller.owner.ownerName,
            cnic: seller.owner.cnic,
            share: seller.share,
        }));

        const purchasers = file.purchasers.map(purchaser => ({
            name: purchaser.owner.ownerName,
            cnic: purchaser.owner.cnic,
            share: purchaser.share,
        }));

        return {
            id: file.fileId._id, // Set id for DataGrid
            tNo: file.tNo,
            sellerName: sellers.map(s => s.name).join(', '), // Join seller names
            sellerCnic: sellers.map(s => s.cnic).join(', '), // Join seller CNICs
            sellerShare: sellers.map(s => s.share).join(', '), // Join seller shares
            purchaserName: purchasers.map(p => p.name).join(', '), // Join purchaser names
            purchaserCnic: purchasers.map(p => p.cnic).join(', '), // Join purchaser CNICs
            purchaserShare: purchasers.map(p => p.share).join(', '), // Join purchaser shares
            status: file.status,
        };
    }).reduce((unique, item) => {
        const isDuplicate = unique.find(u => u.id === item.id); // Check for duplicates
        if (!isDuplicate) {
            unique.push(item); // Add only unique items
        }
        return unique;
    }, []);

    // Filter formattedData based on the searchText
    const filteredData = formattedData.filter(item =>
        item.sellerName.toLowerCase().includes(searchText.toLowerCase()) ||
        item.purchaserName.toLowerCase().includes(searchText.toLowerCase()) ||
        item.sellerCnic.includes(searchText.toLowerCase()) || // Added CNIC filter
        item.purchaserCnic.toLowerCase().includes(searchText.toLowerCase()) || // Added CNIC filter
        item.tNo.toLowerCase().includes(searchText.toLowerCase()) ||
        item.status.toLowerCase().includes(searchText.toLowerCase())
    );

    // Define columns for the DataGrid
    const columns = [
        {
            field: 'Sr.',
            headerName: 'Sr',
            width: 100,
            renderCell: (params) => {
                const rowIndex = filteredData.findIndex((row) => row.id === params.id);
                return <>{rowIndex + 1}</>; // Displaying the row number starting from 1
            },
        },
        { field: 'tNo', headerName: 'Transfer No', width: 150 },
        { field: 'sellerName', headerName: 'Seller Name', width: 400 },
        { field: 'sellerCnic', headerName: 'Seller CNIC', width: 200 },
        { field: 'sellerShare', headerName: 'Share', width: 100 },
        { field: 'purchaserName', headerName: 'Purchaser Name', width: 400 },
        { field: 'purchaserCnic', headerName: 'Purchaser CNIC', width: 200 },
        { field: 'purchaserShare', headerName: 'Share', width: 100 },
        {
            field: 'status',
            headerName: 'Status',
            width: 250,
            renderCell: (params) => {
                const status = params.row.status; // Get the status value
                const color = statusColorMap[status] || 'default'; // Get the color from the map, default if not found
                return (
                    <Tag color={color}>
                        {status}
                    </Tag>
                );
            }
        },
        {
            field: 'Manage',
            headerName: 'Manage',
            width: 150,
            renderCell: (params) => (
                <>
                    {params.row.status === 'Transfer Completed' ?
                        <Button disabled>Manage</Button> :
                        <Button type="primary" onClick={() => handleManageClick(params.row)}>Manage</Button>
                    }
                </>
            ),
        },
        {
            field: 'Details',
            headerName: 'Details',
            width: 150,
            renderCell: (params) => (
                <Button type="primary" danger onClick={() => handleDetailsClick(params.row)}>Details</Button>
            ),
        },
    ];

    // Handle the manage action button click
    const handleManageClick = (row) => {
        setSelected(row.id); // Modify this to support multiple selections
        setVisible(true);
    };

    // Handle the details button click
    const handleDetailsClick = (row) => {
        setDetailsRow(row); // Store the selected row details
        setDetailsVisible(true); // Show the details modal
    };

    return (
        <div style={{ height: 400, width: '100%' }}>
            {/* <Text style={{ marginBottom: '16px' }}>Total Transfers: {filteredData.length}</Text> */}

            {/* Search Input */}
            <Input
                placeholder="Search by seller, purchaser, transfer no, or status"
                allowClear
                onSearch={value => setSearchText(value)}
                onChange={e => setSearchText(e.target.value)} // Update searchText on input change
                style={{ marginBottom: '16px', width: '300px' }}
            />

            <DataGrid
                rows={filteredData} // Use filtered data
                columns={columns}
                pageSize={100} // Set the number of rows per page
                rowsPerPageOptions={[5, 10, 20]} // Options for rows per page
            />
            {/* TransferManage component can be included here */}
            {visible && <TransferManage account={account} visible={visible} selectedMembership={selected} onClose={() => setVisible(false)}  />}

            {/* Details Modal */}
            <Modal
                title="Transfer Details"
                visible={detailsVisible}
                onCancel={() => setDetailsVisible(false)}
                footer={null}
            >
                {detailsRow && (
                    <>
                        <p><strong>Transfer No:</strong> {detailsRow.tNo}</p>
                        <p><strong>Seller Name:</strong> {detailsRow.sellerName}</p>
                        <p><strong>Seller CNIC:</strong> {detailsRow.sellerCnic}</p>
                        <p><strong>Seller Share:</strong> {detailsRow.sellerShare}</p>
                        <p><strong>Purchaser Name:</strong> {detailsRow.purchaserName}</p>
                        <p><strong>Purchaser CNIC:</strong> {detailsRow.purchaserCnic}</p>
                        <p><strong>Purchaser Share:</strong> {detailsRow.purchaserShare}</p>
                        <p><strong>Status:</strong> {detailsRow.status}</p>
                    </>
                )}
            </Modal>
        </div>
    );
};

export default FileTransfer;
