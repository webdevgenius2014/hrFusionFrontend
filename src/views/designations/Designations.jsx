import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import DesignationForm from "./DesignationForm";
import CommonModal from "../../components/commonModal";
import { CustDataGrid } from "../../components/form-components/CustDataGrid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DesignationServices from "../../services/DesignationServices";
import DepartmentServices from "../../services/DepartmentServices";
import { DatagridHeader } from "../../components/DatagridHeader";
import { CustomPagination } from "../../components/PaginationMui";


import "react-toastify/dist/ReactToastify.css";
const Designations = () => {
  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = useState(1);
  const [serverError, setServerError] = useState();
  const [loading, setLoading] = useState(false);
  const [formLoader, setFormLoader] = useState(false);

  const navigate = useNavigate();

  // api integration ----------------------------------------------------
  // Getdepartments --------------------
  const [getdep, setGetdep] = useState([]);
  const getDepartmentfn = async () => {
    await DepartmentServices.getAllDepartments()
      .then((res) => {
        if (res) {
          setGetdep(res?.data?.data);
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
    setFormLoader(true);
    await DesignationServices.getDesignations(page)
      .then((res) => {
        if (res.status == 200) {
          setTotalPages(res?.data?.data?.last_page);
          setGetDesig(res?.data?.data.data);
          setFormLoader(false);
          // EmployeServices.getEmployee();
        }
        if (res.status == 401) {
          navigate("/");
          setGetDesig([]);
        }
        setFormLoader(false);
      })
      .catch((err) => {
        console.log("getDesignations", err);
        setFormLoader(false);
      });
  };
  useEffect(() => {
    getDesignationsfn();
    getDepartmentfn();
  }, []);
  useEffect(() => {
    getDesignationsfn();
  }, [page]);
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
          setServerError(res.data);
        }
        if (res.status == 403) {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("add designation error", error);
      });
    setServerError("");
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
    // console.log(depart_id, showDepartment);
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
          setServerError(() => res.data);
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

  // end api integration -----------------------------------------------

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
    {
      field: "id",
      headerName: "No. ",
      filterable: false,
      width: 100,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1,
    },
    // { field: 'id', headerName: 'ID', width: 100, options: { filter: true } },
    {
      field: "designation_name",
      headerName: "Designation",
      width: 200,
      headerClassName: "super-app-theme--header",
      options: { filter: true },
    },
    {
      field: "department_name",
      headerName: "Department",
      width: 200,
      headerClassName: "super-app-theme--header",
      options: { filter: true },
    },
    {
      field: "emmployees_count",
      headerName: "Employess",
      width: 100,
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
      width: 374,
    },
  ];

  const styles = {
    backgroundColor: "white",
  };
  return (
    <>
      <ToastContainer />
      <Container style={{ padding: 0 }}>
        <Box>
          <DatagridHeader name={"Designation"} >
          <Button
          startIcon={<AddIcon />}
          variant="contained"
          onClick={handleOpen}
        >
          Add
        </Button>
          </DatagridHeader>
          <CommonModal isOpen={open} isClose={handleClose}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add Designation
            </Typography>
            <Box
              sx={{
                width: 500,
                maxWidth: "100%",
              }}
            >
              <DesignationForm
                getdep={getdep}
                handleChangeDep={handleChangeDep}
                loading={loading}
                apiFun={handleAddDesignation}
                error={serverError}
                BtnName={"Save "}
              />
            </Box>
          </CommonModal>
          <CustDataGrid data={getDesig} loading={formLoader}  columns={columns} setPage={setPage} totalPages={totalPages}/>
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
            BtnName={"Save Changes "}
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
      {  getDesig &&  getDesig.length>0 && <div
        style={{ width: "100%", marginTop: "10px", background: "white" }}
      >
        <CustomPagination totalPages={totalPages} setPage={setPage} />
      </div>}
    </>
  );
};
export default Designations;
