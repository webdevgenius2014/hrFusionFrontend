import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import BeatLoader from "react-spinners/ClipLoader";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import DesignationForm from "./DesignationForm";
import { FormInputText } from "../../components/form-components/formInputText";
import { FormSelect } from "../../components/form-components/FormSelect";
import { styled } from "@mui/material/styles";
import CommonModal from "../../components/commonModal";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import DesignationServices from "../../services/DesignationServices";
import DepartmentServices from "../../services/DepartmentServices";

const Designations = () => {
  const [serverError,setServerError] =useState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // api integration ----------------------------------------------------
  // Getdepartments --------------------
  const [getdep, setGetdep] = useState([]);
  const getDepartmentfn = async () => {
    await DepartmentServices.getDepartments()
      .then((res) => {
        if (res) {
          setGetdep(res?.data?.data.data);
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
  const getDesignationsfn = async () => {
    setLoading(true);
    await DesignationServices.getDesignations()
      .then((res) => {
        if (res.status == 200) {
          setGetDesig(res?.data?.data.data);

          setLoading(false);
          // EmployeServices.getEmployee();
        }
        if (res.status == 401) {
          navigate("/");
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
  const handleAddDesignation = (data) => {
    setLoading(true);
    console.log("data", data);

    const payload = {
      designation_name: data.designation_name,
      department_id: depart_id,
    };
    DesignationServices.addDesignation(payload)
      .then((res) => {
        console.log(res);
        if (res.data.success == true) {
          getDesignationsfn();
          // DesignationServices.getDesignations();
          toast.success(res.data.message);
          setLoading(false);
          handleClose();
        } else if (res.data.success == false) {
          console.log(res.data.message);
          setLoading(false);
          setServerError(res.data)
          // setError("department_name", {
          //   type: "manual",
          //   message: res.data.message,
          // });
        }
        if (res.status == 403) {
          // setError("designation_name", {
          //   type: "manual",
          //   message: res.data.message,
          // });
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("add designation error", error);
      });
      setServerError('')
  };
  // end add designations ------------------------
  // edit designations ------------------------
  const [showDepartment, setShowDepartment] = useState("");
  const [showDesignation, setshowDesignation] = useState("");
  const [designation_id, setDesignation_id] = useState("");
  const [dep_id, setDep_id] = useState("");

  const handleEditClick = (id, desig, dep, dep_id) => () => {
    setDesignation_id(() => id);
    setshowDesignation(() => desig);
    setShowDepartment(() => dep);
    setDep_id(() => dep_id);
    handleEditOpen();
  };
  const handleEditDasignation = (data) => {
    setLoading(true);
    console.log(depart_id, showDepartment);
    let payload = {
      id: designation_id,
      designation_name: data.designation_name,
      department_id: depart_id || dep_id,
    };
    // console.log("payload", payload);
    DesignationServices.editDesignation(payload)
      .then((res) => {
        // console.log("editDesignation", res);
        if (res.data.success == true) {
          getDesignationsfn();
          toast.success(res.data.message);
          setLoading(false);
          handleEditClose();
        }

        if (res.status == 403) {
         setServerError(()=>res.data)
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("edit designation err", error);
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
          toast.success(res.data.message);
          setLoading(false);
          getDesignationsfn();
          handleDeleteClose();
        }
        if (res.data.success == false) {
          setLoading(false);
          toast.error(res.data.message);
        }
        if (res.status == 403) {
          toast.error(res?.data?.message);
        }

      })
      .catch((err) => {
        console.log("delete  designation error: ", err);
      });
  };
  // end delete designations ------------------------

  // end api integration ------------------------------------------------


  const sampleData = [
    { id: 1, designation: "Web Designer", department: "Web Development" },
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
        let dep_id = params?.row?.department.id;
        // console.log(dep_id)
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(
              params?.id,
              params?.row?.designation_name,
              dep,
              dep_id
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
              
            >
              Add Designation
            </Typography>
            <Box
              sx={{
                width: 500,
                maxWidth: "100%",
              }}
            >
              <DesignationForm
              getdep={getdep }
                handleChangeDep={handleChangeDep}
                loading={loading}
                apiFun={handleAddDesignation}
                error={serverError}
              />
            </Box>
          </CommonModal>
          {getDesig && getDesig?.length > 0 ? (
            <DataGrid
              style={styles}
              rows={getDesig}
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
            <p>No Designation found</p>
          )}

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
          <DesignationForm
            showDesignation={showDesignation}
            showDepartment={showDepartment}
            getdep={getdep}
            handleChangeDep={handleChangeDep}
            loading={loading}
            apiFun={handleEditDasignation}
            error={serverError}
          />
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
