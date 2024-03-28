import React, { useState, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
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
import { useTheme } from '@mui/material/styles';
import Menu3Dot from '../../components/Menu3Dot';
import useMediaQuery from '@mui/material/useMediaQuery';

function EmpFeedback() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
     

      const detailEmployee = (data) => {
        let id = data?.id;
        // console.log(id)
        navigate(`/employeesFeedback/${id}`);

        // setVewData(()=>data)
      };

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
          field: "Data",
          headerName: "Employee Name",
          headerClassName: "super-app-theme--header",
          flex: 1,
          options: { filter: true },
        valueGetter: (params) =>  `${params?.row?.user_meta?.first_name} ${params?.row?.user_meta?.last_name}`,
        },
        {
          field: "feedback",
          headerName: " Feedback",
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
              onClick={() => detailEmployee(params?.row)}
            />,
              // <GridActionsCellItem
              //   icon={<EditIcon />}
              //   label="Edit"
              //   className="textPrimary"
              //   // onClickCapture={() => {
              //   //   handleChangedDepVal(params?.id, params?.row.department_name);
              //   // }}
              //   color="inherit"
              // />,
              // <GridActionsCellItem
              //   icon={<DeleteIcon />}
              //   label="Delete"
              //   // onClick={() => {
              //   //   handleDeleteClick(params?.id);
              //   // }}
              //   color="inherit"
              // />,
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
    {isSmallScreen ? <>
      <Menu3Dot option={[{value:'Add Feedback',onClick:handleOpen}]}/>
      </>
      :
      <AddButton onClick={handleOpen}>Add Feedback</AddButton>
    }
          </>
    </DatagridHeader>
    
    <CommonModal isOpen={open || editopen} 
      isClose={open ? handleClose : handleEditClose} 
      title={editopen ? "Edit Feedback" : "Add Feedback"}>
 
    <EmpFeedForm
      allEmployees={getEmployees}
      handleChangeEmp={handleChangeEmp}
      apiFun={editopen ? null : addFeedback}
    />
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
