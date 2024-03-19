import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import DesignationForm from "./DesignationForm";
import CommonModal from "../../components/modal/commonModal";
import { CustDataGrid } from "../../components/dataGrid/CustDataGrid";
import {AddButton} from  '../../components/Buttons/AllButtons';
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DesignationServices from "../../services/DesignationServices";
import { DatagridHeader } from "../../components/dataGrid/DatagridHeader";
import { CustomPagination } from "../../components/CustomPagination";
import { DltndConf } from "../../components/modal/Dlt-Conf-Modal";
import { useDispatch } from "react-redux";
import { superAdminLogout } from "../../redux/SuperAdminSlice";
import { getAllDepartmentfn } from "../../helperApis/HelperApis";
import "react-toastify/dist/ReactToastify.css";

const Designations = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = useState(1);
  const [serverError, setServerError] = useState();
  const [loading, setLoading] = useState(false);
  const [formLoader, setFormLoader] = useState(false);
  
  // api states
  const [getdep, setGetdep] = useState([]);
  const [getDesig, setGetDesig] = useState([]);
  const [depart_id, setDepart_id] = useState("");
  const [editData, setEditData] = useState({});
  const [deleteDesignations, setDeleteDesignations] = useState({});

  // get designations --------------------------------
  const getDesignationsfn = () => {
    setFormLoader(true);
    DesignationServices.getDesignations(page)
      .then((res) => {
        if (res.status === 200 && res?.data?.success === true) {
          setTotalPages(res?.data?.data?.last_page);
          setGetDesig(res?.data?.data.data);
          setFormLoader(false);
        }
        if (res.status === 200 && res?.data?.success === false) {
          setFormLoader(false);

          setGetDesig([]);
        }
        if (res.status === 401) {
          dispatch(superAdminLogout());
          setLoading(false);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("getDesignations", err);
        setFormLoader(false);
      });
  };
  // get all departments 
  const getAllDepartmentsFn = async () => {
    try {
      const result = await getAllDepartmentfn();
      setGetdep(result);
    } catch (error) {
      console.log("getAllDepartmentsFn", error);
    }
  };
  // add designations ------------------------
  const handleAddDesignation = (data) => {
    setLoading(true);
    const payload = {
      designation_name: data.designation_name,
      department_id: depart_id,
    };
    DesignationServices.addDesignation(payload)
      .then((res) => {
        if (res.data.success === true) {
          getDesignationsfn();
          toast.success(res?.data?.message);
          setLoading(false);
          handleClose();
        } else if (res?.data?.success === false) {
          setLoading(false);
          setServerError(res?.data);
        }
        if (res.status === 403) {
          setLoading(false);
        }
        if (res.status === 401) {
          dispatch(superAdminLogout());
          setLoading(false);
          navigate("/");
        }
      })
      .catch((error) => {
        console.log("add designation error", error);
      });
    setServerError("");
  };
  // edit designations ------------------------
  const handleEditDasignation = (data) => {
    setLoading(true);
    let payload = {
      id: editData?.id,
      designation_name: data.designation_name,
      department_id: depart_id || editData?.dep_id,
    };
    DesignationServices.editDesignation(payload)
      .then((res) => {
        if (res.data.success === true) {
          getDesignationsfn();
          toast.success(res.data.message);
          setLoading(false);
          handleEditClose();
        }

        if (res.status === 403) {
          setServerError(() => res?.data);
          setLoading(false);
        }
        if (res.status === 401) {
          dispatch(superAdminLogout());
          setLoading(false);
          navigate("/");
        }
      })
      .catch((error) => {
        console.log("edit designation err", error);
      });
  };
  // delete designations  ------------------------
  const handleDelete = () => {
    setLoading(true);
    DesignationServices.deleteDesignation(deleteDesignations)
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
          setLoading(false);
          getDesignationsfn();
          handleDeleteClose();
        }
        if (res.data.success === false) {
          setLoading(false);
          toast.error(res.data.message);
        }
        if (res.status === 403) {
          toast.error(res?.data?.message);
        }
        if (res.status === 401) {
          // con9sole.log()
          dispatch(superAdminLogout());
          setLoading(false);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("delete  designation error: ", err);
      });
  };
  // change department  ------------------------
  const handleChangeDep = (id) => {
    setDepart_id(() => id);
  };
  // get data on edit click
  const handleEditClick = (data) => () => {
    setEditData(()=>data)
    handleEditOpen();
  };
  // get delete designation id 
  const handleDeleteClick = (id) => {
    setDeleteDesignations({ id: id });
    handleDeleteOpen();
  };

  useEffect(() => {
    getDesignationsfn();
    getAllDepartmentsFn();
  }, []);

  useEffect(() => {
    getDesignationsfn();
  }, [page]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {setOpen(false); setServerError(null)};

  const [editopen, setEditOpen] = useState(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => {setEditOpen(false); setServerError(null)}

  const [deleteopen, setDeleteOpen] = useState(false);
  const handleDeleteOpen = () => setDeleteOpen(true);
  const handleDeleteClose = () => setDeleteOpen(false);

  const columns = [
    {
      field: "id",
      headerName: "No. ",
      filterable: false,
      width: 100,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1,
    },
    {
      field: "designation_name",
      headerName: "Designation",
      flex: 1,
      headerClassName: "super-app-theme--header",
      options: { filter: true },
    },
    {
      field: "department_name",
      headerName: "Department",
      flex: 1,
      headerClassName: "super-app-theme--header",
      options: { filter: true },
    },
    {
      field: "emmployees_count",
      headerName: "Employess",
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
        let currentId = params?.id;
        let data ={
          dep : params?.row?.department_name,
          dep_id : params?.row?.department.id,
          id :  params?.id,
          desig : params?.row?.designation_name
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(data )}
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
      flex: 1,
    },
  ];

  return (
    <>
      <Container style={{ padding: 0 }}>
        <Box>
          <DatagridHeader name={"Designation"}>
         
          <AddButton
          startIcon={<AddIcon />}
          variant="contained"
          onClick={handleOpen}
        >
          Add Fields
        </AddButton>
          </DatagridHeader>
         
          <CustDataGrid
            data={getDesig}
            loading={formLoader}
            columns={columns}
            setPage={setPage}
            totalPages={totalPages}
          />
        </Box>
      </Container>
      <CommonModal isOpen={open || editopen} isClose={editopen ? handleEditClose : handleClose}>
  <Typography id="modal-modal-title" variant="h6" component="h2">
    {editopen ? "Edit Designation" : "Add Designation"}
  </Typography>
  <Box
    sx={{
      minWidth: { lg: 450, md: 350, sm: 150, xs: 70, xl: 600 },
      maxWidth: { lg: 600, md: 500, sm: 400, xs: 200, xl: 800 },
    }}
  >
    <DesignationForm
      showDesignation={editopen ? editData?.desig : null}
      showDepartment={editopen ? editData?.dep : null}
      getdep={getdep}
      handleChangeDep={handleChangeDep}
      loading={loading}
      apiFun={editopen ? handleEditDasignation : handleAddDesignation}
      error={serverError}
      btnName={editopen ? "Save Changes" : "Save"}
    />
  </Box>
</CommonModal>

      <DltndConf
        title="Delete Designation"
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
export default Designations;
