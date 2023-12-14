import React, { useState, useEffect } from "react";
import axios from "axios";
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
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DesignationServices from "../../services/DesignationServices";
import DepartmentServices from "../../services/DepartmentServices";

const Designations = () => {
  const token = useSelector((state) => state.SuperAdmin.token);
  const [loading, setLoading] = useState(false);

  // api integration ----------------------------------------------------
  // Getdepartments --------------------
  const [getdep, setGetdep] = useState([]);
  const getDepartmentfn = () => {
    DepartmentServices.getDepartments()
      .then((res) => {
        if (res) {
          setGetdep(res.data.data);
        } else {
          setGetdep([]);
        }
      })
      .catch((err) => {
        console.log("getDepartment", err);
      });
  };
  //-------------------------
  // get designations --------------------------------
  const [getDesig, setGetDesig] = useState([]);
  const getDesignationsfn = () => {
    DesignationServices.getDesignations()
      .then((res) => {
        if (res) {
          setGetDesig(res.data.data);
          // EmployeServices.getEmployee();
        } else {
          setGetDesig([]);
        }
      })
      .catch((err) => {
        console.log("getDesignations", err);
      });
  };
  useEffect(() => {
    getDesignationsfn();
    getDepartmentfn();
  }, []);
  // end getdescription -------------------------
  // change department ------------------------
  const [depart_id, setDepart_id] = useState("");
  const handleChangeDep = (id) => {
    setDepart_id(() => id);
    // console.log(id)
  };
  //-------------------------------------------
  // add designations ------------------------
  const [addDesignation, setAddDesignation] = useState();
  const handleAddDesignation = (e) => {
    setLoading(true);
    e.preventDefault();
    const payload = {
      designation_name: addDesignation,
      department_id: depart_id,
    };
    console.log("payload", payload);
    DesignationServices.addDesignation(payload)
      .then((res) => {
        console.log(res)
        if (res.data.success == true) {
          // getDesignationsfn();
          DesignationServices.getDesignations();
          toast.success(res.data.message)
          setLoading(false);
          handleClose();
        }else if (res.data.success==false){
          setLoading(false);
          
            toast.error(res.data.message);
          
        }
      })
      .catch((error) => {
        console.log("add designation error", error);
      });
  };
  // end add designations ------------------------
  // edit designations ------------------------
  const [showDepartment, setShowDepartment] = useState("");
  const [showDesignation, setshowDesignation] = useState();
  const [designation, setDesignation] = useState("");
  const [designation_id, setDesignation_id] = useState("");

  const handleEditClick = (id, desig, dep) => () => {
    setDesignation_id(() => id);
    setDesignation(() => desig);
    setshowDesignation(() => desig);
    setShowDepartment(() => dep);
    handleEditOpen();
  };
  const handleEditDasignation = (e) => {
    setLoading(true);
    e.preventDefault();
    let payload = {
      id: designation_id,
      designation_name: designation,
      department_id: depart_id ||showDepartment,
    };
    // console.log("payload", payload);
    DesignationServices.editDesignation(payload)
      .then((res) => {
        // console.log("editDesignation", res);
        if (res.data.success == true) {
          getDesignationsfn();
          toast.success(res.data.message
            )
          setLoading(false);
          handleEditClose();
        }
        if(res.data.success == false) {
        setLoading(false);
        toast.error(res.data.message);
        }
        if(res.status== 403){
          Object.values(res.data.errors).map((e, i) => {
            toast.error(e[0])})
       
          }
      })
      .catch((error) => {
        console.log("edit designation err",error)
      });
  };

  // end edit designations ------------------------

  // delete designations  ------------------------
  const [deleteDesignations, setDeleteDesignations] = useState({});
  const handleDeleteClick = (id) => {
    setDeleteDesignations({ id: id });
    handleDeleteOpen();
  };
  const handleDeleteDesignation = () => {
    setLoading(true);
    DesignationServices.deleteDesignation(deleteDesignations)
      .then((res) => {
        if (res.data.success == true) {
          toast.success(res.data.message)
          setLoading(false);
          getDesignationsfn();
          handleDeleteClose();
        }
        if(res.data.success == false) {
        setLoading(false);
        toast.error(res.data.message);
        }
        if(res.status== 403){
          toast.error(res.data.message);

       
          }
      })
      .catch((err) => {console.log("delete  designation error: " , err)});
  };
  // end delete designations ------------------------

  // end api integration ------------------------------------------------
  const sampleData = [
    { id: 1, designation: "Web Designer", department: "Web Development" },
    { id: 2, designation: "Web Developer", department: "Marketing" },
    { id: 3, designation: "Android Developer", department: "App Development" },
    { id: 4, designation: "IOS Developer", department: "Support" },
    { id: 5, designation: "UI Designer", department: "Accounts" },
    { id: 6, designation: "UX Designer", department: "PHP Open Source" },
    { id: 7, designation: "IT Technician", department: "Design and Printing" },
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

  const columns = [
    // { field: 'id', headerName: 'ID', width: 100, options: { filter: true } },
    {
      field: "designation_name",
      headerName: "Designation",
      width: 200,
      options: { filter: true },
    },
    {
      field: "department_name",
      headerName: "Department",
      width: 200,
      options: { filter: true },
    },
    {
      field: "action",
      headerName: "Action",
      type: "actions",
      getActions: (params) => {
        let currentId = params?.id;
        let dep = params?.row?.department_name;
        // console.log(params.row)
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(
              params?.id,
              params?.row?.designation_name,
              dep
            )}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDeleteClick(currentId)}
            color="inherit"
          />,
        ];
      },
      width: 500,
    },
  ];

  const styles = {
    backgroundColor: "white",
  }
  return (
    <>
    <ToastContainer />
      <Container>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Item>
                <h2>Designation</h2>
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
              Add Designation
            </Typography>
            <Box
              sx={{
                width: 500,
                maxWidth: "100%",
              }}
            >
              <form onSubmit={handleAddDesignation}>
                <TextField
                  fullWidth
                  label="Add designation"
                  id="fullWidth"
                  name="designation_name"
                  onChange={(e) => setAddDesignation(e.target.value)}
                />
                <InputLabel id="demo-simple-select-label">
                  Department
                </InputLabel>
                <Select
                  fullWidth
                  labelId="demo-simple-select-label"
                  sx={{ marginTop: "20px" }}
                  id="demo-simple-select"
                  defaultValue={"Select Department"}
                  label="Department"
                  renderValue={(value) => value}
                >
                  {getdep &&
                    getdep.map((item, index) => (
                      <MenuItem
                        key={index}
                        onClick={() => handleChangeDep(item.id)}
                        value={item.department_name}
                      >
                        {item.department_name}
                      </MenuItem>
                    ))}
                </Select>

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
          <DataGrid
            style={styles}
            rows={getDesig}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 7 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
          {/*checkboxSelection */}
        </Box>
      </Container>
      <CommonModal isOpen={editopen} isClose={handleEditClose}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ marginBottom: "20px", fontWeight: "600" }}
        >
          Edit Designation
        </Typography>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
          }}
        >
          <form onSubmit={handleEditDasignation}>
            <TextField
              fullWidth
              label="Edit Designation"
              id="fullWidth"
              defaultValue={showDesignation}
              onChange={(e) => setDesignation(() => e.target.value)}
            />
            <InputLabel id="demo-simple-select-helper-label">
              Department
            </InputLabel>

            <Select
              fullWidth
              labelId="demo-simple-select-helper-label"
              sx={{ marginTop: "20px" }}
              id="demo-simple-select"
              defaultValue={showDepartment}
              label="Department"
              renderValue={(value) => value}
            >
              {getdep &&
                getdep.map((item, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => handleChangeDep(item.id)}
                    value={item.department_name}
                  >
                    {item.department_name}
                  </MenuItem>
                ))}
            </Select>
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
          Delete Designation
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
            onClick={handleDeleteDesignation}
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
export default Designations;
