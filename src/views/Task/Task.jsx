import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import TaskForm from "./TaskForm";
import React, { useEffect, useState } from "react";
import { GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import CommonModal from "../../components/modal/commonModal";
import { superAdminLogout } from "../../redux/SuperAdminSlice";
import TaskServices from "../../services/TaskServices";
import { AddButton } from "../../components/Buttons/AllButtons";
import { DltndConf } from "../../components/modal/Dlt-Conf-Modal";
import { CustomPagination } from "../../components/CustomPagination";
import { CustDataGrid } from "../../components/dataGrid/CustDataGrid";
import { DatagridHeader } from "../../components/dataGrid/DatagridHeader";
import { Table, TableBody, TableCell, TableHead, TableRow, Checkbox } from '@mui/material';

import {
  allDesignations,
  projByEmployee,
  handleEmpByDesig,
} from "../../helperApis/HelperApis";

function Task() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formLoader, setFormLoader] = useState(false);
  const [count, setCount] = useState(null);

  const [taskList, setTaskList] = useState([]);
  const [project_id, setProject_id] = useState();
  const [deleteId, setDeleteId] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  const [getDesig, setGetDesig] = useState([]);
  const [selectedDesig, setSelectedDesig] = useState(null);

  const [getEmpBydesig, setGetEmpBydesig] = useState([]);
  const [selectedEmp, setSelectedEmp] = useState(null);

  const [getprojByEmp, setProjectByEmp] = useState([]);
  const [selectedProj, setSelectedProj] = useState(null);
  
  const [showProj, setShowProj] = useState(null);
  const [showEmp, setShowEmp] = useState(null);


  // all designations
  const getAllDesignationFn = async () => {
    try {
      const result = await allDesignations();
      // console.log(result)
      setGetDesig(result);
    } catch (error) {
      console.log("getAllDesignationFn", error);
    }
  };
  // all designations
  const getProjByEmployee = async () => {
    try {
      const result = await projByEmployee({ assign_to: selectedEmp });
      // console.log(result)
      setProjectByEmp(result);
    } catch (error) {
      console.log("getProjByEmployee", error);
    }
  };
  // all designations
  const getempByDesignation = async () => {
    try {
      const result = await handleEmpByDesig({ designation: selectedDesig });
      // console.log(result);
      setGetEmpBydesig(result);
    } catch (error) {
      console.log("getempByDesignation", error);
    }
  };

  // api integration -----------------------------------
  const getTaskList = () => {
    setFormLoader(true);
    TaskServices.getTaskList()
      .then((res) => {
        if (res.status === 200 && res?.data?.success === true) {
          setTaskList(res?.data?.data);
          // console.log(res?.data)
          setFormLoader(false);
        }
        if (res.status === 200 && res?.data?.success === false) {
          setFormLoader(false);
          // setTaskList([]);
        }
        if (res.status === 401) {
          dispatch(superAdminLogout());
          setFormLoader(false);
          navigate("/");
        }
      })
      .catch((err) => {
        setFormLoader(false);
        console.log("getTaskList error", err);
      });
  };
  // add task-------------------------------------
  const addTask = (data) => {
    setLoading(true);
    let payload = {
      ...data,
      designation: selectedDesig,
      assign_to: selectedEmp,
      project_id: selectedProj,
    };
    TaskServices.addTask(payload)
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          handleClose();
          toast.success(res?.data?.message);
          getTaskList();
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
        console.log("add task error: " + err);
      });
  };
  // edit task -------------------------------
  const handleEdit = (data) => {
    let payload = {
      id:selectedTask?.id,
      project_id: selectedProj,
      designation: selectedDesig,
      assign_to: selectedEmp,
      ...data,
    };
    setLoading(true);
    TaskServices.editTask(payload)
      .then((res) => {
        if (res.data.success === true) {
          setLoading(false);
          handleEditClose();
          getTaskList();
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
        console.log("edit task error: " + err);
      });
  };
  // delete department -------------------------------
  const handleDelete = (e) => {
    let id = { id: deleteId };
    setLoading(true);
    e.preventDefault();
    TaskServices.deleteTask(id)
      .then((res) => {
        if (res.status === 200 || res.status === 404) {
          setLoading(false);
          handleDeleteClose();
          toast.success(res?.data?.message);
          getTaskList();
        } else if (res.status === 401) {
          toast.error("please login again");
          dispatch(superAdminLogout());
          setLoading(false);
          navigate("/");
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

  useEffect(() => {
    getTaskList();
    getAllDesignationFn();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (selectedDesig) {
      setSelectedEmp(()=>[])
      setProjectByEmp(()=>[])
      getempByDesignation();  
    }
    // eslint-disable-next-line
  }, [selectedDesig]);

  useEffect(() => {
    if (selectedEmp) {
      setProjectByEmp([])
      setShowProj(()=>' select project ')
      getProjByEmployee();
    }
    // eslint-disable-next-line
  }, [selectedEmp]);

  const columns = [
    {
      field: "id",
      headerName: "No.",
      filterable: false,
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1,
    },
    {
      field: "name",
      headerName: "Assign To",
      headerClassName: "super-app-theme--header",
      flex: 1,
      options: { filter: true },
      renderCell: (params) => params?.row?.assign_to?.name,
    },
    {
      field: "project_name",
      headerName: "Project Name",
      headerClassName: "super-app-theme--header",
      flex: 1,
      options: { filter: true },
      renderCell: (params) => params?.row?.project?.project_name,
    },
    {
      field: "title",
      headerName: " Title",
      flex: 1,
      headerClassName: "super-app-theme--header",
      options: { filter: true },
    },
    {
      field: "designation",
      headerName: " Designation",
      flex: 1,
      headerClassName: "super-app-theme--header",
      options: { filter: true },
      renderCell: (params) => params?.row?.designation?.designation_name,
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
              setSelectedTask(params?.row);
              console.log(params?.row)
              setSelectedDesig(params?.row?.designation?.id)
              setSelectedEmp(params?.row?.assign_to?.id)
              setSelectedProj(params?.row?.project?.id)
              handleEditOpen();
              setShowProj(params?.row?.project?.project_name)
              setShowEmp(params?.row?.assign_to?.name)
            }}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => {
              setDeleteId(params?.id);
              handleDeleteOpen();
            }}
            color="inherit"
          />,
        ];
      },
      flex: 1,
    },
  ];

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
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
      <Box>
        <DatagridHeader name={"Task List"}>
          <AddButton
            startIcon={<AddIcon />}
            variant="contained"
            onClick={handleOpen}
          >
            Add Task
          </AddButton>
        </DatagridHeader>
      </Box>

      <CustDataGrid
        data={taskList}
        loading={formLoader}
        columns={columns}
        // totalPages={totalPages}
        // setPage={setPage}
      />
      <CommonModal isOpen={open || editopen} 
      isClose={open ? handleClose : handleEditClose}
      title={open ? "Add Task" : "Edit Task"}
      >
        <TaskForm
          desigList={getDesig}
          getEmpBydesig={getEmpBydesig}
          getprojByEmp={getprojByEmp}
          setSelectedEmp={setSelectedEmp}
          setSelectedProj={setSelectedProj}
          setSelectedDesig={setSelectedDesig}
          apiFun={open ? addTask : handleEdit}
          showProj={editopen ? showProj :null}
          showEmp={editopen ? showEmp :null}
          showData={editopen ? selectedTask : undefined}
        />
    </CommonModal>
    

      <DltndConf
        title="Delete Task"
        handleClose={handleDeleteClose}
        handleDelete={handleDelete}
        loading={loading}
        open={deleteopen}
      />
    </>
  );
}

export default Task;

// {totalPages && totalPages >= 2 && (
//   <div style={{ width: "100%", marginTop: "10px", background: "white" }}>
//     <CustomPagination totalPages={totalPages} setPage={setPage} />
//   </div>
// )}
