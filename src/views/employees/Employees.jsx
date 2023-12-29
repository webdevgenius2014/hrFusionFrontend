import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import BeatLoader from "react-spinners/ClipLoader";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import CommonModal from "../../components/commonModal";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { GridActionsCellItem } from "@mui/x-data-grid";
import AddEmployee from "./add-employees/addEmployee";
import EditEmployee from "./edit-employees/editEmployee";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {  useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import EmployeServices from "../../services/EmployeServices";
import {ToastContainer, toast } from "react-toastify";

const Employees = () => {
  const [getEmployees, setGetEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  // api integration --------------------------------
  // get all employees ----------------------------
  const getAllEmployees = () => {
    setLoading(true);
  EmployeServices.getEmployee()
    .then((res) => {
      if (res.status == 200) {
        setGetEmployees(() => res.data.data.data);
        setLoading(false);
      } else {
        setLoading(false);
        console.log("getemployee if", res);
        setGetEmployees([]);
      }
    })
    .catch((err) => {
      // Log any errors that occur during the request
      console.log("getAllEmployees", err);
    });
};
  useEffect(() => {
    getAllEmployees();
  }, []);
  //  end get all employees---------------------------------------
  // delete emolpyees--------------------------------
  const handleDeleteeEmployees = () => {
    setLoading(true);
    EmployeServices.deleteEmployee({ id: delete_id })
      .then((res) => {
        if (res.status == 200) {
          getAllEmployees();
          console.log(res.data.message)
          toast.success(res.data.message);
          setLoading(false);
          handleDeleteClose();
        }
        if(res.status ==403){
          toast.error(res.data.error);
          setLoading(false);
        }
        if(res.status ==401)
        {
          toast.error(res.data.error);
          setLoading(false);
        }
      })
      .catch((err) => { 

        console.log("handleDeleteeEmployees", err);
        setLoading(false);
      })
  };
  // end delete emolpyees --------------------------------
  // end api integration ------------------------------------------------


  const navigate = useNavigate();
 

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "transparent",
    boxShadow: "none",
  }));

  const [employeeData, SetEmployeeData] = useState({});
  const handleEditClick = (data) => () => {
    //ID - current Row ID
    SetEmployeeData(data);
    handleEditOpen();
  };

  // console.log("name:"+ des)
  const [delete_id, setDelete_id] = useState({});
  const handleDeleteClick = (id) => () => {
    handleDeleteOpen();
    setDelete_id(() => id);
    console.log("delete", delete_id);
  };
  //   const loadingFalses = () =>{setLoading(false)}
  //   const loadingTrue = () =>{setLoading(true)}

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [editopen, setEditOpen] = useState(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);

  const [deleteopen, setDeleteOpen] = useState(false);
  const handleDeleteOpen = () => setDeleteOpen(true);
  const handleDeleteClose = () => setDeleteOpen(false);

 
 

  const detailEmployee = () => {};
  const { id } = useParams();

 
  const columns = [
    // { field: 'id', headerName: 'ID', width: 50, options: { filter: true } },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      options: { filter: true },
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      options: { filter: true },
    },
    {
      field: "joindate",
      headerName: "Joindate",
      width: 100,
      options: { filter: true },
      valueGetter: (params) => params.row.user_meta?.joining_date,
    },
    {
      field: "role",
      headerName: "Role",
      width: 150,
      options: { filter: true },
      valueGetter: (params) =>
        params?.row?.user_role?.role,
    },
    {
      field: "action",
      headerName: "Action",
      type: "actions",
      getActions: (params) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(params)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(params?.id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<VisibilityIcon />}
            label="View"
            color="inherit"
            onClick={() => detailEmployee(params?.id)}
          />,
        ];
      },
      width: 200,
    },
  ];

  const styles = {
    backgroundColor: "white",
  };

  return (
    <>
    <ToastContainer />

      <Container>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Item>
                <h2>Employees</h2>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item align="right">
                <Button
                  startIcon={<AddIcon />}
                  variant="contained"
                  onClick={handleOpen}
                >
                  Add
                </Button>
              </Item>
            </Grid>
          </Grid>
          <CommonModal isOpen={open} isClose={handleClose}>
            <AddEmployee
              handleClose={handleClose}
              getAllEmployees={getAllEmployees}
            />
          </CommonModal>
          {getEmployees?.length > 0 ? (
            <DataGrid
              style={styles}
              rows={getEmployees}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[5, 10]}
            />
          ) : loading == true ? (
            <BeatLoader
              color="#2d94cb"
              cssOverride={{
                position: "absolute",
                display: "block",
                top: "45%",
                left: "55%",
                transform: "translate(-50%, -50%)",
              }}
              loading
              margin={4}
              size={90}
            />
          ) : (
            <h2><u>No Employee found</u></h2>
          )}
        </Box>
      </Container>
      <CommonModal isOpen={editopen} isClose={handleEditClose}>
        <EditEmployee
          handleEditClose={handleEditClose}
          getAllEmployees={getAllEmployees}
          data={employeeData}
        />
      </CommonModal>

      <CommonModal isOpen={deleteopen} isClose={handleDeleteClose}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ marginBottom: "20px", fontWeight: "600" }}
        >
          Delete Employee
        </Typography>
        <p>Are you sure want to delete?</p>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            onClick={handleDeleteeEmployees}
            sx={{ marginTop: "13px", marginRight: "13px" }}
          >
            {loading ? <>Loading..</> : <>Delete</>}
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ marginTop: "13px" }}
            onClick={handleDeleteClose}
          >
            Cancel
          </Button>
        </Box>
      </CommonModal>
    </>
  );
};

export default Employees;
