import React, { useEffect, useState } from "react";
import BeatLoader from "react-spinners/ClipLoader";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import DepartmentForm from "./DepartmentForm";
import CommonModal from "../../components/commonModal";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { GridActionsCellItem } from "@mui/x-data-grid";
import DepartmentServices from "../../services/DepartmentServices";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Deartments = () => {
  const navigate = useNavigate();
  const [serverError,setServerError] =useState();
  const [loading, setLoading] = useState(false);
  // api integration -----------------------------------

  // add department-------------------------------------
  const addDepartment = (data) => {
    setLoading(true);
    DepartmentServices.addDepartment(data)
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          getDepartmentfn();
          toast.success(res.data.message);
          handleClose();
        }
        if (res.status == 403) {
          setServerError(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log("addDepartment error: " + err);
      });
  };

  //---- end add departments  --------------------------------------------------------
  // get all departments --------------------------------
  const [getdep, setGetdep] = useState([]);
  const getDepartmentfn = () => {
    setLoading(true);
    DepartmentServices.getDepartments()
      .then((res) => {
        if (res) {
          setGetdep(res.data.data.data);
          setLoading(false);
        } else {
          loading(false);
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
  const [dep_id, setDepId] = useState();
  const [dep_name, setDepName] = useState();

  const handleChangedDepVal = (id, department) => {
    reset();
    console.log(id, department);
    setDepId(id);
    setDepName(() => department);
      handleEditOpen();
    
  };
  const handleEdit = (data) => {
    console.log(data);
    let payload = { ...data, id: dep_id };
    console.log(payload);
    setLoading(true);
    DepartmentServices.editDepartment(payload)
      .then((res) => {
        if (res.data.success == true) {
          setLoading(false);
          handleEditClose();
          getDepartmentfn();
          toast.success(res.data.message);
        }
        if (res.status == 403) {
          setServerError(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log("editDepartment error: " + err);
      });
  };

  // end edit department -------------------------------
  // delete department -------------------------------
  const [deleteDep, setDeleteDep] = useState();
  const handleDeleteClick = (id) => {
    setDeleteDep(id);
    handleDeleteOpen();
  };
  const handleDelete = (e) => {
    let id = { id: deleteDep };
    setLoading(true);
    e.preventDefault();
    DepartmentServices.deleteDepartment(id)
      .then((res) => {
        if (res.status == 200 || res.status == 404) {
          setLoading(false);
          handleDeleteClose();
          toast.success("Department deleted successfully");
          getDepartmentfn();
        } else if (res.status == 401) {
          navigate("/");
          setLoading(false);

          toast.error("please login again");
        }
        if (res.status == 403) {
          setLoading(false);

          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log("delete department error: ", err);
        setLoading(false);
      });
  };

  // end deleteDepartment ------------
  //---- end api ------------------

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "transparent",
    boxShadow: "none",
  }));

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  const validationSchema = Yup.object().shape({
    department_name: Yup.string().required("Department name is required"),
  });

  const {
    control,
    setError,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { department_name: dep_name },
    resolver: yupResolver(validationSchema, {
      stripUnknown: true,
      abortEarly: false,
    }),
  });

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
            onClickCapture={() => {
              handleChangedDepVal(params?.id, params?.row.department_name);
            }}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => {
              handleDeleteClick(params?.id);
            }}
            color="inherit"
          />,
        ];
      },
      width: 500,
    },
  ];
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [editopen, setEditOpen] = useState(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);

  const [deleteopen, setDeleteOpen] = useState(false);
  const handleDeleteOpen = () => setDeleteOpen(true);
  const handleDeleteClose = () => setDeleteOpen(false);

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
            <DepartmentForm
              // dep_name={dep_name}
              apiFun={addDepartment}
              loading={loading}
              error={serverError}
            />
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
                    paginationModel: { page: 0, pageSize: 10 },
                  },
                }}
                pageSizeOptions={[5, 10]}
              />
              {/* checkboxSelection  upline */}
            </>
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
            <p>No department found</p>
          )}
        </Box>
      </Container>
      <CommonModal isOpen={editopen} noValidate isClose={handleEditClose}>
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
        <DepartmentForm
        dep_name={dep_name}
        apiFun={handleEdit}
        loading={loading}
        def={dep_name}
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
