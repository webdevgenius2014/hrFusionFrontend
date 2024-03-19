import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import AddIcon from "@mui/icons-material/Add";
import CommonModal from "../../../components/modal/commonModal";
import { AddButton, Buttons } from "../../../components/Buttons/AllButtons";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { toast } from "react-toastify";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { DltndConf } from "../../../components/modal/Dlt-Conf-Modal";
import { CustDataGrid } from "../../../components/dataGrid/CustDataGrid";
import { DatagridHeader } from "../../../components/dataGrid/DatagridHeader";
import { superAdminLogout } from "../../../redux/SuperAdminSlice";
import GeneralServices from "../../../services/GeneralServices";
import { LeadPlatformForm } from "./LeadPlatformForm";
export const LeadPlatform = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [formLoader, setFormLoader] = useState(false);
  const [serverError, setServerError] = useState();

  // api state
  const [getAllLeads, setGetAllLeads] = useState([]);
  const [editLeadData, setEditLeadData] = useState();

  // get api channel
  const getAllLeadsFun = () => {
    setFormLoader(true);
    GeneralServices.getAllPlatforms()
      .then((res) => {
        if (res.status === 200 && res?.data?.success === true) {
          setFormLoader(false);
          setGetAllLeads(res?.data?.data);
        }
        if (res.status === 200 && res?.data?.success === false) {
          setFormLoader(false);
        }
        if (res.status === 401) {
          dispatch(superAdminLogout());
          navigate("/");
        }
        if (res.status === 404) {
          setFormLoader(false);
          setLoading(false);
        }
      })
      .catch((err) => {
        setFormLoader(false);
        console.log("get error", err);
      });
  };
  // add api --------------------------------
  const addLeadPlatform = (data) => {
    setLoading(true);
    GeneralServices.addPlatform(data)
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          handleClose();
          toast.success(res?.data?.message);
          getAllLeadsFun();
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
        console.log("add  error: " + err);
      });
  };
  // edit api --------------------------------
  const handleEdit = (data) => {
    let payload = { ...data, id: editLeadData?.id };
    setLoading(true);
    GeneralServices.editPlatform(payload)
      .then((res) => {
        if (res.data.success === true) {
          setLoading(false);
          handleEditClose();
          getAllLeadsFun();
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
        console.log("editPlatform error: " + err);
      });
  };
  // delete api --------------------------------------
  const handleDelete = (e) => {
    let id = { id: deleteDep };
    setLoading(true);
    e.preventDefault();
    GeneralServices.deletePlatform(id)
      .then((res) => {
        if (res.status === 200 || res.status === 404) {
          setLoading(false);
          handleDeleteClose();
          toast.success(res?.data?.message);
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
        console.log("delete  error: ", err);
        setLoading(false);
      });
  };
  // edit click
  const editValue = (LeadPlatform) => {
    setEditLeadData(() => LeadPlatform);
    handleEditOpen();
  };
  // delete click
  const [deleteDep, setDeleteDep] = useState();
  const handleDeleteClick = (id) => {
    setDeleteDep(id);
    handleDeleteOpen();
  };

  useEffect(() => {
    getAllLeadsFun();
  }, []);

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
      field: "platform_name",
      headerName: "Leading Platform",
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
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClickCapture={() => {
              editValue(params.row);
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
  const handleOpen = () => setOpen(true);
  const handleClose = () => {setOpen(false); setServerError(null) }

  const [editopen, setEditOpen] = useState(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => {setEditOpen(false); setServerError(null) }

  const [deleteopen, setDeleteOpen] = useState(false);
  const handleDeleteOpen = () => setDeleteOpen(true);
  const handleDeleteClose = () => setDeleteOpen(false);
  return (
    <Container style={{ padding: 0 }}>
      <Box>
        <DatagridHeader name={"Lead Platform "}>
          <AddButton
            startIcon={<AddIcon />}
            variant="contained"
            onClick={handleOpen}
          >
            Add
          </AddButton>
        </DatagridHeader>
        <CommonModal isOpen={open} isClose={handleClose}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ marginBottom: "20px", fontWeight: "600" }}
          >
            Add Lead Platform
          </Typography>
          <Box
            sx={{
              minWidth: { lg: 350, md: 250, sm: 150, xs: 70, xl: 500 },
              maxWidth: { lg: 500, md: 400, sm: 350, xs: 200, xl: 700 },
            }}
          >
            <LeadPlatformForm
              loading={loading}
              apiFun={addLeadPlatform}
              error={serverError}
              btnName="Save"
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
            Edit Lead Platform
          </Typography>
          <Box
            sx={{
              minWidth: { lg: 350, md: 250, sm: 150, xs: 70, xl: 500 },
              maxWidth: { lg: 500, md: 400, sm: 350, xs: 200, xl: 700 },
            }}
          >
            <LeadPlatformForm
              loading={loading}
              apiFun={handleEdit}
              platform_name={editLeadData?.platform_name}
              error={serverError}
              btnName="Save"
            />
          </Box>
        </CommonModal>

        {/*  display grid */}
      </Box>
      <CustDataGrid data={getAllLeads} loading={formLoader} columns={columns} />
      <DltndConf
        title="Delete Lead Platform"
        handleClose={handleDeleteClose}
        handleDelete={handleDelete}
        loading={loading}
        open={deleteopen}
      />
    </Container>
  );
};
