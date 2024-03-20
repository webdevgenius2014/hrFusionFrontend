import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import DepartmentForm from "./DepartmentForm";
import AddIcon from "@mui/icons-material/Add";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import CommonModal from "../../components/modal/commonModal";
import { superAdminLogout } from "../../redux/SuperAdminSlice";
import { AddButton } from "../../components/Buttons/AllButtons";
import { DltndConf } from "../../components/modal/Dlt-Conf-Modal";
import DepartmentServices from "../../services/DepartmentServices";
import { CustomPagination } from "../../components/CustomPagination";
import { CustDataGrid } from "../../components/dataGrid/CustDataGrid";
import { DatagridHeader } from "../../components/dataGrid/DatagridHeader";

const Deartments = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = useState(1);
  const [formLoader, setFormLoader] = useState(false);

  // api states
  const [getdep, setGetdep] = useState([]);
  const [dep_id, setDepId] = useState();
  const [dep_name, setDepName] = useState();
  const [deleteDep, setDeleteDep] = useState();

  // api integration -----------------------------------
  const getDepartmentfn = () => {
    setFormLoader(true);
    DepartmentServices.getDepartments(page)
      .then((res) => {
        if (res.status === 200 && res?.data?.success === true) {
          setTotalPages(res?.data?.data?.last_page);
          setGetdep(res?.data?.data?.data);
          setFormLoader(false);
        }
        if (res.status === 200 && res?.data?.success === false) {
          setFormLoader(false);
          setGetdep([]);
        }
        if (res.status === 401) {
          dispatch(superAdminLogout());
          setFormLoader(false);
          navigate("/");
        }
      })
      .catch((err) => {
        setFormLoader(false);
        console.log("getdep error", err);
      });
  };
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
          setServerError(res?.data);
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
  // edit department -------------------------------
  const handleEdit = (data) => {
    let payload = { ...data, id: dep_id };
    setLoading(true);
    DepartmentServices.editDepartment(payload)
      .then((res) => {
        if (res.data.success === true) {
          setLoading(false);
          getDepartmentfn();
          handleEditClose();
          toast.success(res?.data?.message);
        }
        if (res.status === 403) {
          setServerError(res?.data);
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
  // delete department -------------------------------
  const handleDelete = (e) => {
    let id = { id: deleteDep };
    setLoading(true);
    e.preventDefault();
    DepartmentServices.deleteDepartment(id)
      .then((res) => {
        if (res.status === 200 || res.status === 404) {
          setLoading(false);
          handleDeleteClose();
          toast.success(res?.data?.message);
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
 
  // delete click get id of department
  const handleDeleteClick = (id) => {
    setDeleteDep(id);
    handleDeleteOpen();
  };

  useEffect(() =>{
    getDepartmentfn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);


   // change values on edit department
   const handleChangedDepVal = (id, department) => {
    setDepId(id);
    setDepName(() => department);
    handleEditOpen();
  };  

  const columns = [
    {
      field: "id",
      headerName: "No.",
      filterable: false,
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1,
      // renderCell: (params) => (
      //   <strong style={{display:'flex'}}>
      //    {setCount((pre)=>pre+1)}
      //    {count}
      //   </strong>
      // ),
    },
    {
      field: "department_name",
      headerName: "Departments",
      headerClassName: "super-app-theme--header",
      flex: 1,
      options: { filter: true },
    },
    {
      field: "designations_count",
      headerName: "No. Designations",
      headerClassName: "super-app-theme--header",
      flex: 1,
      options: { filter: true },
    },
    {
      field: "employees_count",
      headerName: " No. Employess",
      flex: 1,
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
      flex: 1,
    },
  ];
  const [open, setOpen] = useState(false);
  const handleOpen = () =>{ setOpen(true);};
  const handleClose = () => {
    setOpen(false);
    setServerError(null);
  };

  const [editopen, setEditOpen] = useState(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => {
    setEditOpen(false);
    setServerError(null);
  };

  const [deleteopen, setDeleteOpen] = useState(false);
  const handleDeleteOpen = () => setDeleteOpen(true);
  const handleDeleteClose = () => setDeleteOpen(false);

  return (
    <>
      <Container style={{ padding: 0 }}>
        <Box>
          <DatagridHeader name={"Department"}>
            <AddButton
              startIcon={<AddIcon />}
              variant="contained"
              onClick={handleOpen}
            >
              Add Fields
            </AddButton>
          </DatagridHeader>
        </Box>

        <CustDataGrid
          data={getdep}
          loading={formLoader}
          columns={columns}
          totalPages={totalPages}
          setPage={setPage}
        />
        {/* checkboxSelection  upline */}
      </Container>
      
      <CommonModal isOpen={open || editopen} isClose={()=> handleClose() ||handleEditClose()} 
      title={open === true ? 'Add Department'  : 'Edit Department'}>
        <DepartmentForm
        dep_name={editopen ? dep_name : null}
        apiFun={open === true ? addDepartment :handleEdit}
        loading={loading}
        error={serverError}
        btnName={open === true ?"Save":'Save Changes'}
      />
       
      </CommonModal>

      <DltndConf
        title="Delete Depeartment"
        handleClose={handleDeleteClose}
        handleDelete={handleDelete}
        loading={loading}
        open={deleteopen}
      />
      {totalPages && totalPages >= 2 && (
        <div style={{ width: "100%", marginTop: "10px", background: "white" }}>
          <CustomPagination totalPages={totalPages} setPage={setPage} />
        </div>
      )}
    </>
  );
};
export default Deartments;
