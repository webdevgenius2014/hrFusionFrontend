import React, { useState, useEffect } from "react";
import FormControl from '@mui/material/FormControl';
import axios from "axios";
import FormHelperText from '@mui/material/FormHelperText';
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
import ApiConfig from "../../config/apiConfig";

const Designations = () => {
  const token = useSelector((state) => state.SuperAdmin.token);
  // api integration ----------------------------------------------------
  // Getdepartments --------------------
  const [getdep, setGetdep] = useState([]);
  const getDepartmentfn = async () => {
    const res = await axios.get(ApiConfig.getDepartments, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (res) {
      setGetdep(res.data.data);
    } else {
      setGetdep([]);
    }
  };
  //-------------------------
  // get designations --------------------------------
  const [getDesig, setGetDesig] = useState([]);
  const getDesignationsfn = async () => {
    const res = await axios.get(ApiConfig.getDesignations, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (res) {
      setGetDesig(() => res.data.data);
    } else {
      setGetDesig([]);
    }
  };
  useEffect(() => {
    getDesignationsfn();
    getDepartmentfn();
  }, []);
  // end getdescription -------------------------
  
  // add designations ------------------------
  const [addDesignation, setAddDesignation] = useState({});
  const handleSubmit = async (e) => {
    // e.preventDefault();
    // const res = await axios.get(ApiConfig.addDesignation, {
    //     headers: {
    //       Accept: "application/json",
    //       Authorization: "Bearer " + token,
    //     },
    //   });
    //   if(res){
    //     console.log(res)
    //   }
  };
  // end add designations ------------------------
  
  // edit designations ------------------------
  // department change
  const [showDepartment, setShowDepartment] = useState("abc");
  const [depart_id, setDepart_id] = useState("");
  const handleChangeDep = (e) => {
    setDepart_id(() => e.target.value);
    // console.log("department chnange", depart_id)
  };
  
  //----------------------------------
  
  const [showData, setShowData] = useState();
  const [designation, setDesignation] = useState("");
  const [designation_id, setDesignation_id] = useState("");

  const handleEditClick = (id, desig, dep) => () => {
    setDesignation_id(() => id);
    setDesignation(() => desig);
    setShowData(() => desig);
    setShowDepartment(() => dep);
    handleEditOpen();
  };
  const handleEditDasignation = async (e) => {
    e.preventDefault();
    console.log(designation_id, depart_id, designation);
    const res = await axios.post(
      ApiConfig.editDesignation,
      {
        id: designation_id,
        designation_name: designation,
        department_id: depart_id,
      },
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    if (res.data.success == true) {
      getDesignationsfn();
      handleEditClose();
    }
  };

  // end edit designations ------------------------

  // delete designations  ------------------------
  const [deleteDesignations, setDeleteDesignations] = useState({});
  const handleDeleteClick = (id) => {
    setDeleteDesignations({ id: id });
    handleDeleteOpen();
  };
  const handleDeleteDesignation = async (e) => {
    console.log(deleteDesignations);
    e.preventDefault();
    const res = await axios.post(
      ApiConfig.deleteDesignation,
      deleteDesignations,
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    handleDeleteClose();
    if (res.data.success == true) {
      getDesignationsfn();
    }
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
  };
  console.log(showDepartment);


  return (
    <>
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
              <form onSubmit={handleSubmit}>
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
                  defaultValue={depart_id}
                  label="Department"
                  onChange={handleChangeDep}
                >
                  {getdep &&
                    getdep.map((item, index) => (
                      <MenuItem key={index} value={item.id}>
                        {item.department_name}
                      </MenuItem>
                    ))}
                </Select>

                <Button
                  type="submit"
                  variant="contained"
                  sx={{ marginTop: "13px" }}
                >
                  Submit
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
              defaultValue={showData}
              onChange={(e) => setDesignation(() => e.target.value)}
            />
            <InputLabel id="demo-simple-select-helper-label">Department</InputLabel>

            <Select
              fullWidth
              labelId="demo-simple-select-helper-label"
              sx={{ marginTop: "20px" }}
              id="demo-simple-select"
              defaultValue={showDepartment}
              label="Department"
              renderValue={(value) =>value}
              onChange={handleChangeDep}

            >
              {getdep &&
                getdep.map((item, index) => (
                  <MenuItem key={index}  value={item.id}>
                    {item.department_name}
                  </MenuItem>
                ))}
            </Select>
            <Button
              type="submit"
              variant="contained"
              sx={{ marginTop: "13px" }}
            >
              Save
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
            Delete
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
