import React, { useState, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import CommonModal from "../../components/modal/commonModal";
import { CustDataGrid } from "../../components/dataGrid/CustDataGrid";
import { AddButton } from "../../components/Buttons/AllButtons";
import { DatagridHeader } from "../../components/dataGrid/DatagridHeader";
import Box from "@mui/material/Box";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EmpFeedForm from "./EmpFeedForm";
import { CustomPagination } from "../../components/CustomPagination";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { superAdminLogout } from "../../redux/SuperAdminSlice";
import EmployeServices from '../../services/EmployeServices'
import {allEmployees,} from "../../helperApis/HelperApis";

function EmpFeedback() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [page, setPage] = useState(1);
    const [formLoader, setFormLoader] = useState(false);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState();
    const [getAllFeedback,setAllFeedback] = useState([]);
    const [getEmployees, setGetEmployees] = useState([]);
    const [empData,setEmpData]=useState(null);
    // api integration 
     // get all employees ----------------------------
  const getAllEmployees = async () => {
    try {
      const result = await allEmployees();
      setGetEmployees(result);
    } catch (error) {
      console.log("getAllDepartmentsFn", error);
    }
  };
    // get all feedback 
    const getFeedbackfn = () => {
        setFormLoader(true);
        EmployeServices.listFeedback()
          .then((res) => {
            if (res.status === 200 && res?.data?.success === true) {
              setTotalPages(res?.data?.data?.last_page);
              setAllFeedback(res?.data?.data?.data);
              setFormLoader(false);
            }
            if (res.status === 200 && res?.data?.success === false) {
              setFormLoader(false);
              setAllFeedback([]);
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
    // add feedback
    const addFeedback = (data) => {
        let payload = {...data , user_id:empData}
        setLoading(true);
        EmployeServices.addFeedback(payload)
          .then((res) => {
            if (res.status === 200) {
              setLoading(false);
              handleClose();
              toast.success(res?.data?.message);
              getFeedbackfn();
            }
            if (res.status === 403) {
            //   getFeedbackfn(res?.data);
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
    // View feedback
      
      useEffect(() => {
        getFeedbackfn();
        getAllEmployees();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [page]);
      
      const handleChangeEmp = (data) => {
         setEmpData(data);
        // console.log("data",data)
      }
      const empFeedView =(data)=>{
        console.log(data)
      }
    const columns = [
        {
          field: "id",
          headerName: "No.",
          filterable: false,
          width:100,
          headerClassName: "super-app-theme--header",
          renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1,
        },
        {
          field: "user_Data",
          headerName: "Employee id",
          headerClassName: "super-app-theme--header",
          flex: 1,
          options: { filter: true },
          valueGetter: (params) => params.row?.user_data?.name,
        },
        {
          field: "feedback",
          headerName: "Employee Feedback",
          headerClassName: "super-app-theme--header",
          flex: 1,
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
              icon={<VisibilityIcon />}
              label="View"
              color="inherit"
              onClick={() => empFeedView(params?.row)}
            />,
              <GridActionsCellItem
                icon={<EditIcon />}
                label="Edit"
                className="textPrimary"
                // onClickCapture={() => {
                //   handleChangedDepVal(params?.id, params?.row.department_name);
                // }}
                color="inherit"
              />,
              <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                // onClick={() => {
                //   handleDeleteClick(params?.id);
                // }}
                color="inherit"
              />,
            ];
          },
          flex: 1,
        },
      ];

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {setOpen(false);};

    const [editopen, setEditOpen] = useState(false);
    const handleEditOpen = () => setEditOpen(true);
    const handleEditClose = () => {setEditOpen(false); }

    // const [deleteopen, setDeleteOpen] = useState(false);
    // const handleDeleteOpen = () => setDeleteOpen(true);
    // const handleDeleteClose = () => setDeleteOpen(false);
  return (
    <Box>
    <DatagridHeader name={"Employees Feedback"}>
    <>
        <Tooltip title="Sort Leaves By ">
        <AddButton
        startIcon={<AddIcon />}
        variant="contained"
        onClick={handleOpen}
      >
        Add Fields
      </AddButton>
          </Tooltip>          
          </>
    </DatagridHeader>
    
    <CommonModal isOpen={open} isClose={handleClose}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ marginBottom: "20px", fontWeight: "600" }}
          >
            Add Feedback
          </Typography>
          <Box
            sx={{
              minWidth: { lg: 350, md: 250, sm: 150, xs: 70, xl: 500 },
              maxWidth: { lg: 500, md: 400, sm: 350, xs: 200, xl: 700 },
            }}
          >
            <EmpFeedForm
            allEmployees={getEmployees}
            handleChangeEmp={handleChangeEmp}
            apiFun={addFeedback}
            />

          </Box>
        </CommonModal>

        <CommonModal isOpen={editopen} isClose={handleEditClose}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ marginBottom: "20px", fontWeight: "600" }}
        >
          Add Feedback
        </Typography>
        <Box
          sx={{
            minWidth: { lg: 350, md: 250, sm: 150, xs: 70, xl: 500 },
            maxWidth: { lg: 500, md: 400, sm: 350, xs: 200, xl: 700 },
          }}
        >
          <EmpFeedForm
          allEmployees={getEmployees}
          handleChangeEmp={handleChangeEmp}
          apiFun={addFeedback}
          />

        </Box>
      </CommonModal>
        <CustDataGrid
        data={getAllFeedback}
        loading={formLoader}
        columns={columns}
      />

      {totalPages && totalPages >= 2 && (
        <div
          style={{ width: "100%", marginTop: "10px", background: "white" }}
        >
          <CustomPagination totalPages={totalPages} setPage={setPage} />
        </div>
      )}
    </Box>
  )
}

export default EmpFeedback
