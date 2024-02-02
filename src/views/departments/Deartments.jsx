import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DatagridHeader } from "../../components/dataGrid/DatagridHeader";
import { CustDataGrid } from "../../components/dataGrid/CustDataGrid";
import DepartmentForm from "./DepartmentForm";
import CommonModal from "../../components/modal/commonModal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { GridActionsCellItem } from "@mui/x-data-grid";
import DepartmentServices from "../../services/DepartmentServices";
import {  toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";
import "react-toastify/dist/ReactToastify.css";
import { CustomPagination } from "../../components/CustomPagination";
import { DeleteDilagBox } from "../../components/modal/DeleteModal";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { superAdminLogout } from "../../redux/SuperAdminSlice";

const Deartments = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [serverError, setServerError] = useState();
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = useState(1);
  const [formLoader, setFormLoader] = useState(false);

  // api integration -----------------------------------

  // add department-------------------------------------
  const addDepartment = (data) => {
    setLoading(true);
    DepartmentServices.addDepartment(data)
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          handleClose();
          toast.success(res?.data?.message);
          getDepartmentfn();
        }
        if (res.status === 403) {
          console.log(res.data)
          setServerError(res?.data);
          console.log(res.data)
          setLoading(false);
        }
        if (res.status === 401) {
          // con9sole.log()
          dispatch(superAdminLogout());
          setLoading(false);
        navigate("/");
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
    setFormLoader(true);
    DepartmentServices.getDepartments(page)
      .then((res) => {
        if (res.status=== 200 && res?.data?.success === true) {
          setTotalPages(res?.data?.data?.last_page);
          setGetdep(res?.data?.data?.data);
          setFormLoader(false);
        } 
          if(res.status=== 200 && res?.data?.success === false) {
            setFormLoader(false);
            setGetdep([]);
          }
          if(res.status === 401){
            dispatch(superAdminLogout());
            setLoading(false);
            navigate("/");
          }
        
      })
      .catch((err) => {
        setFormLoader(false);
        console.log("getdep error", err);
      });
  };
  useEffect(() => {
    getDepartmentfn();
  }, [page]);
  useEffect(() => {
    getDepartmentfn();
  }, []);

  // end get  all department -------------------------------
  // edit department -------------------------------
  const [dep_id, setDepId] = useState();
  const [dep_name, setDepName] = useState();

  const handleChangedDepVal = (id, department) => {
    // console.log(id, department);
    setDepId(id);
    setDepName(() => department);
    handleEditOpen();
  };
  const handleEdit = (data) => {
    // console.log(data); 
    let payload = { ...data, id: dep_id };
    // console.log(payload);
    setLoading(true);
    DepartmentServices.editDepartment(payload)
      .then((res) => {
        if (res.data.success === true) {
          setLoading(false);
          handleEditClose();
          getDepartmentfn();
          toast.success(res?.data?.message);
        }
        if (res.status === 403) {
          setServerError(res?.data?.errors);
          setLoading(false);
        }
        if (res.status === 401) {
          dispatch(superAdminLogout());
          setLoading(false);
          navigate("/");
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
        if (res.status === 200 || res.status === 404) {
          setLoading(false);
          handleDeleteClose();
          toast.success("Department deleted successfully");
          getDepartmentfn();
        } else if (res.status === 401) {
          dispatch(superAdminLogout());
          setLoading(false);
          navigate("/");

          toast.error("please login again");
        }
        if (res.status === 403) {
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

   
  const columns = [
    {
      field: "id",
      headerName: "No.",
      filterable: false,
      flex: 1 ,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1,
    },
    {
      field: "department_name",
      headerName: "Departments",
      headerClassName: "super-app-theme--header",
      flex: 1 ,
      options: { filter: true },
    },
    {
      field: "designations_count",
      headerName: "No. Designations",
      headerClassName: "super-app-theme--header",
      flex: 1 ,
      options: { filter: true },
    },
    {
      field: "employees_count",
      headerName: " No. Employess",
      flex: 1 ,
      headerClassName: "super-app-theme--header",
      options: { filter: true },
    },
    {
      field: "action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
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
      flex: 1 ,
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

  return (
    <>
      <Container style={{ padding: 0 }}>
        <Box>
          <DatagridHeader name={"Department"} >
          <Button
          startIcon={<AddIcon />}
          variant="contained"
          onClick={handleOpen}
        >
          Add
        </Button>
          </DatagridHeader>
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
                minWidth: {lg:350,md:250,sm:150,xs:70,xl:500},
                maxWidth: {lg:500,md:400,sm:350,xs:200,xl:700},
              }}
            >
              <DepartmentForm
                apiFun={addDepartment}
                loading={loading}
                error={serverError}
                btnName={"Save"}
              />
            </Box>
          </CommonModal>

          <CustDataGrid
            data={getdep}
            loading={formLoader}
            columns={columns}
            totalPages={totalPages}
          />
          {/* checkboxSelection  upline */}
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
          minWidth: {lg:350,md:250,sm:150,xs:70,xl:500},
          maxWidth: {lg:500,md:400,sm:350,xs:200,xl:700},
        }}
        >
          <DepartmentForm
            dep_name={dep_name}
            apiFun={handleEdit}
            loading={loading}
            error={serverError}
            btnName={"Save Changes"}
          />
        </Box>
      </CommonModal>

      <DeleteDilagBox title='Delete Depeartment' 
      handleDeleteClose={handleDeleteClose}
      handleDelete={handleDelete}
      loading={loading}
      deleteopen={deleteopen} />
      {  totalPages && totalPages>=2 && <div
        style={{ width: "100%", marginTop: "10px", background: "white" }}
      >
        <CustomPagination totalPages={totalPages} setPage={setPage} />
      </div>}
    </>
  );
};
export default Deartments;
