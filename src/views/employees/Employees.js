import React, { useState } from "react";
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
import AddEmployee from "./add-employees/addEmployee";
import EditEmployee from "./edit-employees/editEmployee";
const Employees = () => {
    const sampleEmployees = [
        { id: 1, name: 'Bernardo Galaviz', employeeid: 'FT-0008', email: 'bernardogalaviz@example.com', mobile: 9876543210, joindate: '1 Jan 2013' },
        { id: 2, name: 'Jeffrey Warden', employeeid: 'FT-0009', email: 'jeffreywarden@example.com', mobile: 9876543210, joindate: '1 Jan 2013' },
        { id: 3, name: 'John Doe', employeeid: 'FT-0010', email: 'johndoe@example.com', mobile: 9876543210, joindate: '1 Jan 2013' },
        { id: 4, name: 'John Smith', employeeid: 'FT-0011', email: 'johnsmith@example.com', mobile: 9876543210, joindate: '1 Jan 2013' },
        { id: 5, name: 'Mike Litorus', employeeid: 'FT-0012', email: 'mikelitorus@example.com', mobile: 9876543210, joindate: '1 Jan 2013' },
        { id: 6, name: 'Richard Miles', employeeid: 'FT-0013', email: 'richardmiles@example.com', mobile: 9876543210, joindate: '1 Jan 2013' },
        { id: 7, name: 'Wilmer Deluna', employeeid: 'FT-0014', email: 'wilmerdeluna@example.com', mobile: 9876543210, joindate: '1 Jan 2013' }
    ]
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: 'transparent',
        boxShadow: 'none'
    }));

    const [des, setDes] = useState("");
    const [emailedit, setEmailEdit] = useState("");

    const handleEditClick = (id, name, email) => () => {
        //ID - current Row ID
        setDes(name);
        setEmailEdit(email);
        handleEditOpen()
    };

    console.log("name:"+ des)

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
    const [age, setAge] = useState('');
    const handleChangeSel = (event) => {
        setAge(event.target.value);
    };

    const columns = [
        { field: 'name', headerName: 'Name', width: 200, options: { filter: true } },
        { field: 'employeeid', headerName: 'Employeeid', width: 100, options: { filter: true } },
        { field: 'email', headerName: 'Email', width: 200, options: { filter: true } },
        { field: 'mobile', headerName: 'Mobile', width: 150, options: { filter: true } },
        { field: 'joindate', headerName: 'Joindate', width: 150, options: { filter: true } },
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
                        onClick={handleEditClick(params?.id, params?.row?.name, params?.row?.email)}
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
            width: 200
        }
    ]

    const styles = {
        backgroundColor: 'white'
    }
    
    return (
        <>
            <Container>
                <Box>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Item><h2>Employees List</h2></Item>
                        </Grid>
                        <Grid item xs={6}>
                            <Item align="right">
                                <Button startIcon={<AddIcon />} variant="contained" onClick={handleOpen}>Add</Button>
                            </Item>
                        </Grid>
                    </Grid>
                    <CommonModal isOpen={open} isClose={handleClose}>
                       <AddEmployee/>
                    </CommonModal>
                    <DataGrid
                        style={styles}
                        rows={sampleEmployees}
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
               <EditEmployee
                namedit ={des}
                namechange={(e)=>setDes(e.target.value)}
                emailedit={emailedit} />
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

export default Employees;