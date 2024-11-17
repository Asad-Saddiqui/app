import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get_Owners } from '../../App/Slice/ownerSlice';
import { DataGrid } from '@mui/x-data-grid';
import { Input, Button, Flex, Typography } from 'antd';
import OwnerModal from '../../Components/Forms/OwnerModal';
import * as XLSX from 'xlsx';

function Owner() {
    const dispatch = useDispatch();
    const { owners, loading } = useSelector(state => state.Owner);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredOwners, setFilteredOwners] = useState([]);
    const [visible, setVisible] = useState(false);
    const [editingOwner, setEditingOwner] = useState(null);

    useEffect(() => {
        dispatch(get_Owners());
    }, [dispatch]);

    let Users = owners?.data?.filter((dta) => {
        return dta.userType === "Owner" || dta.userType === undefined;
    });

    useEffect(() => {
        const filtered = searchQuery
            ? Users.filter(owner =>
                Object.values(owner).some(val =>
                    String(val).toLowerCase().includes(searchQuery.toLowerCase())
                )
            )
            : Users;

        const ownersWithIndex = filtered?.map((owner, index) => ({
            ...owner,
            index: index + 1,
        }));

        setFilteredOwners(ownersWithIndex);
    }, [owners, searchQuery]);

    const handleButtonClick = (owner) => {
        setEditingOwner(owner);
        setVisible(true);
    };

    const handleExport = () => {
        const data = filteredOwners.map((dta, i) => ({
            Sr: i + 1,
            Name: dta.ownerName,
            "Family Name": dta.familyName,
            "Phone Number": dta.phoneNumber,
            "CNIC": dta.cnic,
            "Address": dta.permanentAddress
        }));

        const ws = XLSX.utils.json_to_sheet(data);
        const mergeCells = [
            { s: { r: 0, c: 1 }, e: { r: 0, c: 2 } }
        ];

        if (!ws['!merges']) ws['!merges'] = [];
        ws['!merges'] = ws['!merges'].concat(mergeCells);

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Owners');
        XLSX.writeFile(wb, 'Owners.xlsx');
    };

    const columns = [
        { field: 'index', headerName: '#', flex: 1, },
        { field: 'ownerName', headerName: 'Owner Name', flex: 1, },
        { field: 'familyName', headerName: 'Family Name', flex: 1, },
        { field: 'phoneNumber', headerName: 'Phone Number', flex: 1, },
        { field: 'cnic', headerName: 'CNIC', flex: 1, },
        { field: 'permanentAddress', headerName: 'Permanent Address', flex: 1, },
        { field: 'status', headerName: 'Statue', flex: 1, },

        {
            field: 'action',
            headerName: 'Action',
            flex: 1,
            renderCell: (params) => (
                <Button
                    type='primary'
                    ghost
                    onClick={() => handleButtonClick(params.row)}
                >
                    Edit
                </Button>
            ),
        },
    ];

    return (
        <div style={{ height: 600, width: '100%', backgroundColor: "white", borderRadius: "8px", padding: "10px" }}>
            <OwnerModal
                visible={visible}
                onClose={() => {
                    setVisible(false);
                    setEditingOwner(null);
                }}
                editingOwner={editingOwner}
            />
            <Flex justify="space-between" align='center'>
                <Typography.Title level={4}>Owners</Typography.Title>
                <Flex align='center'>
                    <Button type='primary' onClick={() => setVisible(true)} style={{ marginRight: "10px", marginBottom: "10px" }}> Add Owner </Button>
                    <Button type='primary' onClick={handleExport} style={{ marginRight: "10px", marginBottom: "10px" }}> Export to Excel </Button>
                    <Input
                        variant="outlined"
                        label="Search"
                        style={{ marginBottom: '1rem', height: "40px", width: "300px" }}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                </Flex>
            </Flex>
            <DataGrid
                rows={filteredOwners}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20]}
                getRowId={(row) => row._id}
            />
        </div>
    );
}

export default Owner;