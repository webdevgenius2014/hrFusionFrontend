
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import CommonModal from '../../components/commonModal';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { GridActionsCellItem } from '@mui/x-data-grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

const Designations = () => {
    const sampleData = [
        { id: 1, designation: 'Web Designer', department: 'Web Development' },
        { id: 2, designation: 'Web Developer', department: 'Marketing' },
        { id: 3, designation: 'Android Developer', department: 'App Development' },
        { id: 4, designation: 'IOS Developer', department: 'Support' },
        { id: 5, designation: 'UI Designer', department: 'Accounts' },
        { id: 6, designation: 'UX Designer', department: 'PHP Open Source' },
        { id: 7, designation: 'IT Technician', department: 'Design and Printing' }
    ]
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: 'transparent',
        boxShadow: 'none'
    }));

    const [des, setDes] = useState("");

    const handleEditClick = (id, designation) => () => {
        //ID - current Row ID
        setDes(designation);
        handleEditOpen()
    };

    console .log("hello: " + des)
    const handleDeleteClick = (id) => () => {
        handleDeleteOpen()
    };

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [editopen, setEditOpen] = useState(false);
    const handleEditOpen = () => setEditOpen(true);
    const handleEditClose = () => setEditOpen(false);

    const [deleteopen, setDeleteOpen] = useState(false);
    const handleDeleteOpen = () => setDeleteOpen(true);
    const handleDeleteClose = () => setDeleteOpen(false);

    const [depval, setDepVal] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(depval);
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 100, options: { filter: true } },
        { field: 'designation', headerName: 'Designation', width: 200, options: { filter: true } },
        { field: 'department', headerName: 'Department', width: 200, options: { filter: true } },
        {
            field: 'action',
            headerName: 'Action',
            type: 'actions',
            getActions: (params, id) => {
                
                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(params?.id, params?.row?.department)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
            width: 500
        }
    ]

    const styles = {
        backgroundColor: 'white'
    }

    const[depart, setDepart]=useState("")

    const handleChangeDep=(e)=>{
        setDepart(e.target.value)
    }
    return (
        <>
            <Container>
                <Box>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Item><h2>Designation</h2></Item>
                        </Grid>
                        <Grid item xs={6}>
                            <Item align="right">
                                <Button startIcon={<AddIcon />} variant="contained" onClick={handleOpen}>Add</Button>
                            </Item>
                        </Grid>
                    </Grid>
                    <CommonModal isOpen={open} isClose={handleClose}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '20px', fontWeight: "600" }}>
                            Add Designation
                        </Typography>
                        <Box sx={{
                            width: 500,
                            maxWidth: '100%',
                        }}>
                            <form onSubmit={handleSubmit}>
                                <TextField fullWidth label="Add Department" id="fullWidth" value={depval} onInput={(e) => setDepVal(e.target.value)} />
                                <Button type='submit' variant="contained" sx={{ marginTop: '13px' }}>Submit</Button>
                            </form>
                        </Box>
                    </CommonModal>
                    <DataGrid
                        style={styles}
                        rows={sampleData}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 7 },
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection
                    />
                </Box>
            </Container>
            <CommonModal isOpen={editopen} isClose={handleEditClose}>
                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '20px', fontWeight: "600" }}>
                    Edit Designation
                </Typography>
                <Box sx={{
                    width: 500,
                    maxWidth: '100%',
                }}>
                    <form onSubmit={handleSubmit}>
                        <TextField fullWidth label="Edit Designation" id="fullWidth" value={des} onChange={(e) => setDes(e.target.value)} />
                        <InputLabel id="demo-simple-select-label">Department</InputLabel>
                        <Select
                            fullWidth
                            labelId="demo-simple-select-label"
                            sx={{marginTop: '20px'}}
                            id="demo-simple-select"
                            value={depart}
                            label="Department"
                            onChange={handleChangeDep}
                        >
                            {
                                sampleData && sampleData.map((item, index)=>(
                                    <MenuItem key={index} value={item.department}>{item.department}</MenuItem>
                                ))
                            }
                           
                        </Select>
                        <Button type='submit' variant="contained" sx={{ marginTop: '13px' }}>Save</Button>
                    </form>
                </Box>
            </CommonModal>

            <CommonModal isOpen={deleteopen} isClose={handleDeleteClose}>
                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '20px', fontWeight: "600" }}>
                    Delete Designation
                </Typography>
                <p>Are you sure want to delete?</p>
                <Box sx={{
                    width: 500,
                    maxWidth: '100%',
                }}>

                    <Button type='submit' variant="contained" sx={{ marginTop: '13px', marginRight: '13px' }}>Delete</Button>
                    <Button type='submit' variant="contained" sx={{ marginTop: '13px' }} onClick={handleDeleteClose}>Cancel</Button>
                </Box>
            </CommonModal>
        </>
    )
}
export default Designations;
