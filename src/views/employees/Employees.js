import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import CommonModal from '../../components/commonModal';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { GridActionsCellItem } from '@mui/x-data-grid';
import AddEmployee from "./add-employees/addEmployee";
import EditEmployee from "./edit-employees/editEmployee";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link,useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import ApiConfig from "../../config/apiConfig";

const Employees = () => {
    const token = useSelector((state) => state.SuperAdmin.token);
    const [getEmployees, setGetEmployees] = useState([]);
    const [loading,setLoading] =useState(false);

    // api integration --------------------------------
    // get all employees ----------------------------
    const getAllEmployees = async () => {
      const res = await axios.get(ApiConfig.getEmployees, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });
      if (res) {
        setGetEmployees(()=>res.data.data)
        // console.log("employess",getEmployees);
    } else {
        setGetEmployees([]);
    }
};
    useEffect(() => {
     getAllEmployees();
    }, []);

    //  end get all employees---------------------------------------

    // delete emolpyees--------------------------------
    const handleDeleteeEmployees= async () => {
         setLoading(true);
         console.log(delete_id)
         const res = await axios.post(
          ApiConfig.deleteEmployee, {delete_id},
          {
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        handleDeleteClose();
        if (res.data.success == true) {
            console.log(res)
        }
      };
    // end delete emolpyees--------------------------------

    // ------------------------------------------------
    const navigate = useNavigate();
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
    const [passedit, setPassEdit] = useState("123456");

    const handleEditClick = (id, name, email) => () => {
        //ID - current Row ID
        setDes(name);
        setEmailEdit(email);
        handleEditOpen()
    };

    // console.log("name:"+ des)
    const [delete_id,setDelete_id]=useState({})
    const handleDeleteClick = (id) => () => {
        handleDeleteOpen()
        setDelete_id(()=>id)
        console.log("delete",delete_id)

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

    const detailEmployee=() => {}
    const { id } = useParams();

    const columns = [
        // { field: 'id', headerName: 'ID', width: 50, options: { filter: true } },
        { field: 'name', headerName: 'Name', width: 200, options: { filter: true } },
        { field: 'email', headerName: 'Email', width: 200, options: { filter: true } },
        { field: 'joindate', headerName: 'Joindate', width: 100, options: { filter: true } ,valueGetter: (params) => params.row.user_meta.joining_date},
        { field: 'role', headerName: 'Role', width: 150, options: { filter: true }, valueGetter: (params) => params.row.user_meta.designation
    },
        // { field: 'employeeid', headerName: 'Employeeid', width: 100, options: { filter: true } },
        {
            field: 'action',
            headerName: 'Action',
            type: 'actions',
            getActions: (params) => {
                
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
                        onClick={handleDeleteClick(params?.id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<VisibilityIcon/>}
                        label="View"
                        color="inherit"
                        onClick={()=>detailEmployee(params?.id)}
                    />
                ];
            },
            width: 200,
           

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
                            <Item><h2>Employees</h2></Item>
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
                    {getEmployees?.length>0 && 
                    <DataGrid
                        style={styles}
                        rows={getEmployees}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 7 },
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                    />}
                </Box>
            </Container>
            <CommonModal isOpen={editopen} isClose={handleEditClose}>
               <EditEmployee
                namedit ={des}
                namechange={(e)=>setDes(e.target.value)}
                emailedit={emailedit}
                emailchange={(e)=>setEmailEdit(e.target.value)}
                passwordedit={passedit}
                passwordchange={(e)=>setPassEdit(e.target.value)}
                />
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

                    <Button type='submit' variant="contained" onClick={handleDeleteeEmployees} sx={{ marginTop: '13px', marginRight: '13px' }}>Delete</Button>
                    <Button type='submit' variant="contained" sx={{ marginTop: '13px' }} onClick={handleDeleteClose}>Cancel</Button>
                </Box>
            </CommonModal>
        </>
    )
}

export default Employees;