import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import ToolTip from "../../components/ToolTip";
import { useNavigate } from "react-router-dom";
import DoneIcon from "@mui/icons-material/Done";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import LeavesForm from "./LeaveForm";
import Typography from "@mui/material/Typography";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { Searching } from "../../components/Searching";
import LeaveServices from "../../services/LeavesServices";
import CommonModal from "../../components/modal/commonModal";
import { Buttons } from "../../components/Buttons/AllButtons";
import { AddButton } from "../../components/Buttons/AllButtons";
import { superAdminLogout } from "../../redux/SuperAdminSlice";
import { DltndConf } from "../../components/modal/Dlt-Conf-Modal";
import { CustDataGrid } from "../../components/dataGrid/CustDataGrid";
import EditIcon from "@mui/icons-material/Edit";
import { FormSelect } from "../../components/form-components/FormSelect";
import { DatagridHeader } from "../../components/dataGrid/DatagridHeader";
import { allRoles } from "../../helperApis/HelperApis";
import { useSelector } from "react-redux";
import { superAdminData } from "../../redux/SuperAdminSlice";

function Leaves() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { control } = useForm();

  // user Role
  const userData = useSelector(superAdminData);
  const userRole = React.useMemo(
    () => userData?.payload?.SuperAdmin?.role?.role,
    [userData]
  );

  const selectOptions = [
    { id: 3, name: "All" },
    { id: 0, name: "Pending" },
    { id: 1, name: "Accepted" },
    { id: 2, name: "Rejected" },
  ];

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState([]);

  const [renderApi, setRenderApi] = useState(3);
  const [getLeaves, setGetLeaves] = useState([]);
  const [selectedLeave, setSelectedLeave] = useState();
  const [leaveSatus, setLeaveSatus] = useState({ status: null, id: null });
  // all roles
  const [getRole, setRole] = useState([]);
  const getAllRole = async () => {
    try {
      const result = await allRoles();
      console.log(result);
      setRole(result);
    } catch (error) {
      console.log("all roles", error);
    }
  };

  // get leaves  all and by  leave status
  const getLeavesFn = () => {
    setLoading(true);
    let api;
    if (renderApi < 3) {
      api = LeaveServices.getLeaveByStatus({ status: renderApi });
    } else {
      api = LeaveServices.getLeaves();
    }
    api
      .then((res) => {
        if (res?.status === 200 && res?.data?.success === true) {
          setGetLeaves(res?.data?.data);
        }
        if (res.status === 200 && res?.data?.success === false) {
          setLoading(false);
          setGetLeaves([]);
        }
        if (res.status === 403) {
          setLoading(false);
        }
        if (res.status === 401) {
          dispatch(superAdminLogout());
          setLoading(false);
          navigate("/");
        }
        if (res.status === 404) {
          setLoading(false);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log("getClients error", err);
      });
  };
  // add Projects-------------------------------------
  const addLeaves = (data) => {
    setLoading(true);
    LeaveServices.addLeave(data)
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          getLeavesFn();
          toast.success(res?.data?.message);
          handleClose();
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
        console.log("addProjects error: " + err);
      });
  };
    // edit Leave  -------------------------------
    const EditLeave = (data) => {
      let payload = { ...data, id: selectedLeave?.id }
      setLoading(true);
      LeaveServices.editLeave(payload)
        .then((res) => {
          if (res?.data?.success === true) {
            setLoading(false);
            getLeavesFn();
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
  // updateLeaveStatus  accept or reject
  const updateLeaveStatus = () => {
    setLoading(true);
    LeaveServices.updateLeaveStatus(leaveSatus)
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          handleConfirmClose();
          toast.success(res?.data?.message);
          getLeavesFn();
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
        console.log("addHolidays error: " + err);
      });
  };
  // Search api -------------------------
  const leaveSearch = (payload) => {
    setLoading(true);
    LeaveServices.searchLeave(payload)
      .then((res) => {
        if (res.status === 200) {
          console.log(res?.data?.data);
          setGetLeaves(() => res?.data?.data);
        } else {
          setLoading(false);
          setGetLeaves([]);
        }
        if (res.status === 403) {
          setLoading(false);
        }
        if (res.status === 404) {
          setLoading(false);
        }
        if (res.status === 401) {
          // con9sole.log()
          dispatch(superAdminLogout());
          setLoading(false);
          navigate("/");
        }
        if (res.status === 404) {
          // setRecord(res?.data?.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("SearchClients error", err);
      });
  };
  useEffect(() => {
    getLeavesFn();
    getAllRole();
    // eslint-disable-next-line
  }, [renderApi]);

  const handleShowData = (data) => {
    setRenderApi(() => data);
  };

  const leaveStatus = (data) => {
    setLeaveSatus(() => data);
    handleConfirmOpne();
  };

  const [confirm, setConfirm] = useState(false);
  const handleConfirmOpne = () => setConfirm(true);
  const handleConfirmClose = () => {
    setConfirm(false);
    setServerError(null);
  };

  const [searchFlag, setSearchFlag] = useState(false);
  const handleSearchOpen = () => setSearchFlag(true);
  const handleSearchClose = () => {
    setSearchFlag(false);
    setServerError(null);
  };

  const [srchbtn, setSerchBtn] = useState(false);
  const handleSrchbtnOpen = () => setSerchBtn(true);
  const handleSrchbtnClose = () => {
    setSerchBtn(false);
    setServerError(null);
  };

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
      // field: "name",
      headerName: "Employee Name",
      headerClassName: "super-app-theme--header",
      flex: 1,
      options: { filter: true },
      valueGetter: (params) => params.row.get_user?.name,
    },
    {
      field: "message",
      headerName: "Leave Reason",
      headerClassName: "super-app-theme--header",
      flex: 1,
      options: { filter: true },
    },
    {
      field: "from_date",
      headerName: "Leave From",
      headerClassName: "super-app-theme--header",
      flex: 1,
      options: { filter: true },
    },
    {
      field: "to_date",
      headerName: " To Date  ",
      headerClassName: "super-app-theme--header",
      flex: 1,
      options: { filter: true },
    },
    {
      field: "status",
      headerName: " Leave status  ",
      headerClassName: "super-app-theme--header",
      flex: 1,
      options: { filter: true },
      renderCell: (params) => {
        const status = params?.value;
        return status === 1 ? (
          <span style={{ color: "green" }}>Accepted</span>
        ) : status === 2 ? (
          <span style={{ color: "red" }}>Rejected</span>
        ) : (
          <span>pending</span>
        );
      },
    },
  ];
  if (userRole === "Admin" || userRole === "HR") {
    columns.push({
      field: "action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      type: "actions",
      getActions: (params) => {
        const status = params?.row?.status;

        // Show actions only when status is 1
        if (status === 1) {
          return [
            <GridActionsCellItem
              icon={
                <ToolTip title="Reject">
                  <IconButton>
                    <CloseIcon />
                  </IconButton>
                </ToolTip>
              }
              label="Edit"
              className="textPrimary"
              onClickCapture={() => {
                leaveStatus({ status: 2, id: params?.id });
              }}
              color="inherit"
            />,
            // You can add more actions here if needed
          ];
        }
        if (status === 2) {
          return [
            <GridActionsCellItem
              icon={
                <ToolTip title="Accept">
                  <IconButton>
                    <DoneIcon />
                  </IconButton>
                </ToolTip>
              }
              onClick={() => {
                leaveStatus({ status: 1, id: params?.id });
              }}
              color="inherit"
            />,
            // You can add more actions here if needed
          ];
        }
        if (status === 3) {
          return [
            <GridActionsCellItem
              icon={
                <ToolTip title="Accept">
                  <IconButton>
                    <DoneIcon />
                  </IconButton>
                </ToolTip>
              }
              label="Edit"
              className="textPrimary"
              onClickCapture={() => {
                leaveStatus({ status: 1, id: params?.id });
              }}
              color="inherit"
            />,
            <GridActionsCellItem
              icon={
                <ToolTip title="Reject">
                  <IconButton>
                    <CloseIcon />
                  </IconButton>
                </ToolTip>
              }
              onClick={() => {
                leaveStatus({ status: 2, id: params?.id });
              }}
              color="inherit"
            />,
          ];
        } else {
          return [
            <GridActionsCellItem
              icon={
                <ToolTip title="Accept">
                  <IconButton>
                    <DoneIcon />
                  </IconButton>
                </ToolTip>
              }
              onClick={() => {
                leaveStatus({ status: 1, id: params?.id });
              }}
              color="inherit"
            />,
            <GridActionsCellItem
              icon={
                <ToolTip title="Reject">
                  <IconButton>
                    <CloseIcon />
                  </IconButton>
                </ToolTip>
              }
              label="Edit"
              className="textPrimary"
              onClickCapture={() => {
                leaveStatus({ status: 2, id: params?.id });
              }}
              color="inherit"
            />,
            // You can add more actions here if needed
          ];
        }
      },
      flex: 1,
    });
  } else {
    columns.push({
      field: "action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      type: "actions",
      getActions: (params) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={()=>{setSelectedLeave(params?.row);handleEditOpen();}}
            color="inherit"
          />,
        ];
      },
      flex: 1,
    });
  }
  return (
    <Box>
      <DatagridHeader name={"Leaves"}>
        <>
          <AddButton
            startIcon={<AddIcon />}
            variant="contained"
            onClick={handleOpen}
          >
            Add Leave
          </AddButton>
          <Box sx={{ marginLeft: "0px" }}>
            {!srchbtn ? (
              <Buttons
                sx={{ margin: 0, height: "auto", padding: "0 16px 0 16px" }}
                onClick={() => {
                  handleSearchOpen();
                  handleSrchbtnOpen();
                }}
                startIcon={<SearchIcon />}
                variant="contained"
              >
                Search
              </Buttons>
            ) : (
              <Buttons
                onClick={() => {
                  getLeavesFn();
                  setSerchBtn(false);
                  handleSearchClose();
                }}
                variant="contained"
              >
                Clear
              </Buttons>
            )}
          </Box>
          <ToolTip title="Sort Leaves By ">
            <Box sx={{ minWidth: "150px", maxWid: "200px" }}>
              <FormSelect
                name="name"
                stylee={{ width: "150px", marginTop: "5px" }}
                data={selectOptions}
                pass_fun={handleShowData}
                label="Select options"
                control={control}
                fieldaname="name"
                def={"All"}
              />
            </Box>
          </ToolTip>
        </>
      </DatagridHeader>
      {searchFlag && searchFlag === true && (
        <Searching
          fieldLable={["Search By Employee Name"]}
          filedName={["employee_name"]}
          date="true"
          apiFun={leaveSearch}
        />
      )}
      <CustDataGrid data={getLeaves} loading={loading} columns={columns} />
      {/* confermation */}
      <DltndConf
        title="Leave Status"
        btnName={leaveSatus.status === 1 ? "Accept" : "Reject"}
        handleClose={handleConfirmClose}
        handleDelete={updateLeaveStatus}
        message={
          leaveSatus.status === 1
            ? `Are you sure want to Accept Leaves ?`
            : `Are you sure want to 
        Reject Leave ?`
        }
        loading={loading}
        open={confirm}
      />
      <CommonModal isOpen={open || editopen} 
      isClose={open ? handleClose : handleEditClose}
      title={open ? 'Add Task' : 'Edit Task'}
      >
        <LeavesForm
          apiFun={open ? addLeaves : EditLeave}
          getRole={getRole}
          data={open ? null : selectedLeave}
        />
    </CommonModal>
    
    </Box>
  );
}

export default Leaves;
