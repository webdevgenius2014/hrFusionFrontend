import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DatagridHeader } from "../../components/DatagridHeader";
import { CustDataGrid } from "../../components/form-components/CustDataGrid";
import DepartmentForm from "./DepartmentForm";
import CommonModal from "../../components/commonModal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { GridActionsCellItem } from "@mui/x-data-grid";
import DepartmentServices from "../../services/DepartmentServices";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";
import "react-toastify/dist/ReactToastify.css";
import { CustomPagination } from "../../components/PaginationMui";


const Deartments = () => {
  const navigate = useNavigate();
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
          toast.success(res.data.message);
          getDepartmentfn();
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
    setFormLoader(true);
    DepartmentServices.getDepartments(page)
      .then((res) => {
        if (res) {
          console.log(res.data);
          setTotalPages(res.data.data.last_page);
          setGetdep(res.data.data.data);
          setFormLoader(false);
        } else {
          setFormLoader(false);
          setGetdep([]);
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

    const search=(e)=>{
      let input=e.target.value;
      const filteredData = getdep.filter((el) => {
        //if no input the return the original
        if (input === '') {
            return el;
        }
        //return the item which contains the user input
        else {
            return el.toLowerCase().includes(input)
        }
    })
    }
  const columns = [
    {
      field: "id",
      headerName: "No.",
      filterable: false,
      width: 100,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1,
    },
    {
      field: "department_name",
      headerName: "Departments",
      headerClassName: "super-app-theme--header",
      width: 298,
      options: { filter: true },
    },
    {
      field: "designations_count",
      headerName: "No. Designations",
      headerClassName: "super-app-theme--header",
      width: 150,
      options: { filter: true },
    },
    {
      field: "employees_count",
      headerName: " No. Employess",
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
      width: 325,
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
      <ToastContainer />
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
                width: 500,
                maxWidth: "100%",
              }}
            >
              <DepartmentForm
                // dep_name={dep_name}
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
            setPage={setPage}
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
            btnName={"Save Changes"}
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
      {  getdep &&  getdep.length>0 && <div
        style={{ width: "100%", marginTop: "10px", background: "white" }}
      >
        <CustomPagination totalPages={totalPages} setPage={setPage} />
      </div>}
    </>
  );
};
export default Deartments;
