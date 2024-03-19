import { Box } from "@mui/system";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ConcernForm from "./ConcernForm";
import Container from "@mui/material/Container";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import ToolTip from "../../components/ToolTip";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import React, { useEffect, useState } from "react";
import { GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import CommonModal from "../../components/modal/commonModal";
import { superAdminLogout } from "../../redux/SuperAdminSlice";
import { AddButton } from "../../components/Buttons/AllButtons";
import { DltndConf } from "../../components/modal/Dlt-Conf-Modal";
import { allRoles } from "../../helperApis/HelperApis";
import { CustDataGrid } from "../../components/dataGrid/CustDataGrid";
import { DatagridHeader } from "../../components/dataGrid/DatagridHeader";
import ConcernServices from "../../services/ConcernServices";
function Concern() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = useState(1);
  const [formLoader, setFormLoader] = useState(false);
  
  const [ConcernData, setConcernData] = useState([]);
  const [getRole, setRole] = useState([]);
  const [selectedConcern, setSelectedConcern] = useState(null);


  // api integration -----------------------------------
  const getAllConcern = () => {
    setFormLoader(true);
    ConcernServices.getAllConcern(page)
      .then((res) => {
        if (res.status === 200 && res?.data?.success === true) {
          setTotalPages(res?.data?.data?.last_page);
          console.log("ss", res?.data.data);
          setConcernData(res?.data?.data);
          setFormLoader(false);
        }
        if (res.status === 200 && res?.data?.success === false) {
          setFormLoader(false);
          // setConcernData([]);
        }
        if (res.status === 401) {
          dispatch(superAdminLogout());
          setFormLoader(false);
          navigate("/");
        }
      })
      .catch((err) => {
        setFormLoader(false);
        console.log("Concern error", err);
      });
  };

  // add Concern -------------------------------------
  const addConcern = (data) => {
    setLoading(true);
    ConcernServices.addConcern(data)
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          handleClose();
          toast.success(res?.data?.message);
          getAllConcern();
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
        console.log("add concern error: " + err);
      });
  };
    // edit department -------------------------------
    const updateConcernStatus = (data) => {
      
      setLoading(true);
      ConcernServices.editConcern({...concernConfirm})
        .then((res) => {
          if (res.data.success === true) {
            setLoading(false);
            handleConfirmClose();
            getAllConcern();
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
          handleConfirmClose();
        });
    };

  // get roles ---------------------------------------------------
  const getAllRole = async () => {
    try {
      const result = await allRoles();
      setRole(result);
    } catch (error) {
      console.log("getAllDepartmentsFn", error);
    }
  };

  useEffect(() => {
    getAllConcern();
    getAllRole();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

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

  const [confirm, setConfirm] = useState(false);
  const handleConfirmOpne = () => setConfirm(true);
  const handleConfirmClose = () =>{ setConfirm(false);setServerError(null);};

  const [concernConfirm, setConcernConfirm] = useState({status:null,id:null});

  const hnadleConcernConfirm = (data)=>{
    console.log(data)
    setConcernConfirm((()=>data))
    handleConfirmOpne();

  }

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
      headerName: "Employee Name ",
      headerClassName: "super-app-theme--header",
      flex: 1,
      options: { filter: true },
      valueGetter: (params) => params.row?.user_data?.name,
    },
    {
      field: "role",
      headerName: "Employee Role ",
      headerClassName: "super-app-theme--header",
      flex: 1,
      options: { filter: true },
      valueGetter: (params) => params.row?.user_data?.role,
    },
    {
      field: "concern_title",
      headerName: "Concern Title ",
      headerClassName: "super-app-theme--header",
      flex: 1,
      options: { filter: true },
    },
    {
      field: "message",
      headerName: "Message ",
      headerClassName: "super-app-theme--header",
      flex: 1,
      options: { filter: true },
    },
    {
      field: "status",
      headerName: " Concern status  ",
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
    {
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
              hnadleConcernConfirm({ status: 2, id: params?.id });
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
            <ToolTip title="Accept"
            >
              <IconButton>
              <DoneIcon />
                
              </IconButton>
            </ToolTip>
          }
          onClick={() => {
            hnadleConcernConfirm({status:1,id:params?.id})
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
              <ToolTip title="Accept"
              >
                <IconButton>
                  <DoneIcon />
                </IconButton>
              </ToolTip>
            }
            label="Edit"
            className="textPrimary"
            onClickCapture={() => {
              hnadleConcernConfirm({status:1,id:params?.id})
            }}

            color="inherit"
          />,
          <GridActionsCellItem
            icon={
              <ToolTip title="Reject"
              >
                <IconButton>
                  <CloseIcon />
                </IconButton>
              </ToolTip>
            }
            onClick={() => {
              hnadleConcernConfirm({status:2,id:params?.id})
            }}
            color="inherit"
          />,
        ]
      } 
      else  {
        return [
          <GridActionsCellItem
          icon={
            <ToolTip title="Accept"
            >
              <IconButton>
              <DoneIcon />
                
              </IconButton>
            </ToolTip>
          }
          onClick={() => {
            hnadleConcernConfirm({status:1,id:params?.id})
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
              hnadleConcernConfirm({ status: 2, id: params?.id });
            }}
            color="inherit"
          />,
          // You can add more actions here if needed
        ];
      }
    },
    flex: 1,
  },
  ];
  return (
    <Box>
      <Container style={{ padding: 0 }}>
        <DatagridHeader name={"Concern"}>
          <AddButton
            startIcon={<AddIcon />}
            variant="contained"
            onClick={handleOpen}
          >
            Add Concern
          </AddButton>
        </DatagridHeader>

        <CustDataGrid
          data={ConcernData}
          loading={formLoader}
          columns={columns}
          totalPages={totalPages}
          setPage={setPage}
        />

        <CommonModal isOpen={open} isClose={handleClose}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ marginBottom: "20px", fontWeight: "600" }}
          >
            Add Concern
          </Typography>
          <Box
            sx={{
              minWidth: { lg: 350, md: 250, sm: 150, xs: 70, xl: 500 },
              maxWidth: { lg: 500, md: 400, sm: 350, xs: 200, xl: 700 },
            }}
          >
            <ConcernForm
              apiFun={addConcern}
              btnName="Save"
              getRole={getRole}
              loading={loading}
            />
          </Box>
        </CommonModal>

        <CommonModal isOpen={editopen} noValidate isClose={handleEditClose}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ marginBottom: "20px", fontWeight: "600" }}
          >
            Edit Concern
          </Typography>
          <Box
            sx={{
              minWidth: { lg: 350, md: 250, sm: 150, xs: 70, xl: 500 },
              maxWidth: { lg: 500, md: 400, sm: 350, xs: 200, xl: 700 },
            }}
          >
            <ConcernForm
              apiFun={addConcern}
              btnName="Save Changes"
              getRole={getRole}
              loading={loading}
              selectedConcern={selectedConcern}
            />
          </Box>
        </CommonModal>
      </Container>
      <DltndConf
      title="Concern Status"
      btnName= {concernConfirm?.status === 1 ? "Accept" : "Reject"}
      handleClose={handleConfirmClose}
      handleDelete={updateConcernStatus}
      message={concernConfirm?.status === 1 ? `Are you sure want to Accept Concern ?` : `Are you sure want to 
      Reject Concern ?`}
      loading={loading}
      open={confirm}
    />  
    </Box>
  );
}

export default Concern;
