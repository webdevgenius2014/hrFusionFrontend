import React, { useEffect, useState } from "react";
import BeatLoader from "react-spinners/ClipLoader";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import CommonModal from "../../components/commonModal";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import DepartmentServices from "../../services/DepartmentServices";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Deartments = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // api integration -----------------------------------

  // add department-------------------------------------
  const addDepartment = () => {
    setLoading(true);
    DepartmentServices.addDepartment(depval)
      .then((res) => {
        if(res.status===200){
        setLoading(false);
        getDepartmentfn();
        toast.success(res.data.message);
        handleClose();
      }
      console.log(res)
      if(res.status===403){
        setLoading(false);
        toast.error(res.data.message);
      }
      })
      .catch((err) => {
        console.log("addDepartment error: " + err);
      });
  };
  const [depval, setDepVal] = useState(null);
  const handleDepartmentValue = (e) => {
    e.preventDefault();
    if (depval) {
      addDepartment();
    } else {
      toast.error("Enter Department Name")
    }
  };
  //---- end add departments  --------------------------------------------------------
  // get all departments --------------------------------
  const [getdep, setGetdep] = useState([]);
  const getDepartmentfn =  () => {
    setLoading(true);
    DepartmentServices.getDepartments()
      .then((res) => {
        if (res) {
          setGetdep(res.data.data);
          setLoading(false);
        } else {
          loading(false)
          setGetdep([]);
        }
      })
      .catch((err) => {
        console.log("getdep error", err);
      });
  };
  useEffect(() => {
    getDepartmentfn();
  }, []);

  // end get  all department -------------------------------
  // edit department -------------------------------
  const [editdep, setEditDep] = useState({});
  const [dep, setDep] = useState("");

  const handleChangedDepVal = (id, department) => () => {
    setDep(() => department);
    console.log("dep", department, "id", id);
    handleEditOpen();
    setEditDep({ ...editdep, id: id });
  };
  const handleEdit = (e) => {
    e.preventDefault();
    setLoading(true);
    DepartmentServices.editDepartment(editdep)
      .then((res) => {
        console.log(res)
        if(res.data.success==true){
          console.log(res);
        getDepartmentfn();
        handleEditClose();
        setLoading(false);
        toast.success(res.data.message)
        }
       if(res.data.success==false ||res.status==403){
          setLoading(false)
          toast.error(res.data.message)
          
        }
        
      })
      .catch((err) => {
        console.log("editDepartment error: " + err);
      });
  };

  // end edit department -------------------------------
  // delete department -------------------------------
  const [deleteDep, setDeleteDep] = useState();
  const handleDeleteClick = (id)  => {
    setDeleteDep(id);
    handleDeleteOpen();
    console.log(id)
  };
  const handleDelete =  (e) => {
    let id={id:deleteDep}
    setLoading(true);
    console.log("delete payload: ", id);
    e.preventDefault();
    DepartmentServices.deleteDepartment(id)
      .then((res) => {
        
        if (res.status == 200 || res.status == 404) {
          setLoading(false);
          handleDeleteClose();
          toast.success("Department deleted successfully")
          getDepartmentfn();
        }
        else if (res.status == 401) {
          navigate("/")
          setLoading(false);

          toast.error("please login again");
        }
        if(res.status ==403)
        {
          setLoading(false);

          toast.error(res.data.message);
        }
      })
      .catch((err) => {console.log("delete department error: " , err)
      setLoading(false);
    });
  };
  // end deleteDepartment ------------
  //---- end api ------------------
  const sampleData = [
    { id: 1, department_name: "Web Development" },
    { id: 2, department_name: "Marketing" },
    { id: 3, department: "App Development" },
    { id: 4, department: "Support" },
    { id: 5, department: "Accounts" },
    { id: 6, department: "PHP Open Source" },
    { id: 7, department: "Design and Printing" },
  ];
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "transparent",
    boxShadow: "none",
  }));

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [editopen, setEditOpen] = useState(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);

  const [deleteopen, setDeleteOpen] = useState(false);
  const handleDeleteOpen = () => setDeleteOpen(true);
  const handleDeleteClose = () => setDeleteOpen(false);
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  const columns = [
    // {  headerName: "ID", width: 100, options: { filter: true } },
    {
      field: "department_name",
      headerName: "Departments",
      width: 200,
      options: { filter: true },
    },
    {
      field: "action",
      headerName: "Action",
      type: "actions",
      getActions: (params) => {
        // let id=params?.id
        // console.log("prams",params)
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleChangedDepVal(params?.id, params?.row.department_name)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={()=>{
              console.log("first")
              handleDeleteClick(params?.id)}}
            color="inherit"
          />,
        ];
      },
      width: 500,
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
                <h2>Department</h2>
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
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ marginBottom: "20px", fontWeight: "600" }}
            >
              Add Department
            </Typography>
            <Box
              sx={{
                width: 500,
                maxWidth: "100%",
              }}
            >
              <form onSubmit={handleDepartmentValue}>
                <TextField
                  fullWidth
                  name="department_name"
                  label="Add Department"
                  id="fullWidth"
                  onInput={(e) =>
                    setDepVal({ [e.target.name]: e.target.value })
                  }
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ marginTop: "13px" }}
                >
                  {loading ? <>Loading..</> : <>Submit</>}
                </Button>
              </form>
            </Box>
          </CommonModal>
          {getdep && getdep?.length > 0 ? (
            <>
              <DataGrid
                style={styles}
                rows={getdep}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 7 },
                  },
                }}
                pageSizeOptions={[5, 10]}
              />
              {/* checkboxSelection  upline */}
            </>
          ):((loading == true)?<BeatLoader
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
        />:<p>No department found</p>)}
        </Box>
      </Container>
      <CommonModal isOpen={editopen} isClose={handleEditClose}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ marginBottom: "20px", fontWeight: "600" }}
        >
          Edit Department
        </Typography>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
          }}
        >
          <form onSubmit={handleEdit}>
            <TextField
              fullWidth
              label="Edit Department"
              name="department_name"
              id="fullWidth"
              defaultValue={dep}
              onChange={(e) =>
                setEditDep({ ...editdep, [e.target.name]: e.target.value })
              }
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ marginTop: "13px" }}
            >
              {loading ? <>Loading..</> : <>Save</>}
            </Button>
          </form>
        </Box>
      </CommonModal>

      <CommonModal isOpen={deleteopen} isClose={handleDeleteClose}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ marginBottom: "20px", fontWeight: "600" }}
        >
          Delete Department
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
            sx={{ marginTop: "13px", marginRight: "13px" }}
            onClick={handleDelete}
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
export default Deartments;
