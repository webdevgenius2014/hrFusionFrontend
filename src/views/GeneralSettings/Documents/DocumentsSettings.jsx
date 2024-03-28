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
import { DocumentForm } from "./DocumentForm";
import { useTheme } from '@mui/material/styles';
import Menu3Dot from '../../../components/Menu3Dot';
import useMediaQuery from '@mui/material/useMediaQuery';

export const DocumentsSettings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [formLoader, setFormLoader] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState();
  // api state
  const [getAddChannel, setGetAddChannel] = useState([]);
  const [editDocumentData, setEditDocumentData] = useState();
  const [deleteDocId, setDeleteDocId] = useState();

  // get api channel
  const getAllChannel = () => {
    setFormLoader(true);
    GeneralServices.getAllDocumentTypes()
      .then((res) => {
        if (res.status === 200 && res?.data?.success === true) {
          setFormLoader(false);
          setGetAddChannel(res?.data?.data);
        }
        if (res.status === 200 && res?.data?.success === false) {
          setFormLoader(false);
        }
        if (res.status === 401) {
          dispatch(superAdminLogout());
          navigate("/");
        }
      })
      .catch((err) => {
        setFormLoader(false);
        console.log("getdep error", err);
      });
  };
  const handleDocumentOperation = (data, operationType) => {
    setLoading(true);
    let apiCall;
    let successMessage;

    if (operationType === "add") {
      apiCall = GeneralServices.addDocumentType;
      successMessage = "Document added successfully!";
    } else if (operationType === "edit") {
      apiCall = GeneralServices.editDocumentType;
      successMessage = "Document edited successfully!";
    } else if (operationType === "delete") {
      apiCall = GeneralServices.deleteDocumentType;
      successMessage = "Document deleted successfully!";
    }
    apiCall(data)
      .then((res) => {
        if (res.status === 200 || (res.data && res.data.success === true)) {
          setLoading(false);
          handleClose();
          handleEditClose();
          handleDeleteClose();
          getAllChannel();
          toast.success(res?.data?.message || successMessage);
        } else if (res.status === 401) {
          dispatch(superAdminLogout());
          setLoading(false);
          navigate("/");
          toast.error("Please login again");
        } else if (res.status === 403) {
          setLoading(false);
          setServerError(res?.data?.errors);
          if (operationType === "delete") {
            toast?.error(res.data.message);
          }
        }
      })
      .catch((err) => {
        console.log("API error: " + err);
        setLoading(false);
      });
  };

  // Usage for adding a document
  const addDocument = (data) => {
    handleDocumentOperation(data, "add");
  };

  // Usage for editing a document
  const handleEdit = (data) => {
    let payload = { ...data, id: editDocumentData?.id };
    handleDocumentOperation(payload, "edit");
  };

  // Usage for deleting a document
  const handleDelete = () => {
    let id = { id: deleteDocId };
    handleDocumentOperation(id, "delete");
  };

  // edit click --------------------------------
  const editValue = (documentData) => {
    setEditDocumentData(() => documentData);
    handleEditOpen();
  };
  // delete click --------------------------------
  const handleDeleteClick = (id) => {
    setDeleteDocId(id);
    handleDeleteOpen();
  };

  useEffect(() => {
    getAllChannel();
  }, [page]);
  useEffect(() => {
    getAllChannel();
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
      field: "document_name",
      headerName: "Document Name",
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
    <Container style={{ padding: 0 }}>
      <Box>
        <DatagridHeader name={"Documents  "}>
        {isSmallScreen ? <>
          <Menu3Dot option={[{value:'Add Documents',onClick:handleOpen}]}/>
          </>
          :
          <AddButton onClick={handleOpen}>Add Documents</AddButton>
        }
        </DatagridHeader>
        <CommonModal
          isOpen={open || editopen}
          isClose={open ? handleClose : handleEditClose}
          title={editopen ? "Edit Document Name" : "Add Document"}
        >
            <DocumentForm
              loading={loading}
              apiFun={editopen ? handleEdit : addDocument}
              error={serverError}
              document_name={
                editopen ? editDocumentData?.document_name : undefined
              }
              btnName={editopen ? "Save Changes" : "Save"}
            />
        </CommonModal>

        {/*  display grid */}
      </Box>
      <CustDataGrid
        data={getAddChannel}
        loading={formLoader}
        columns={columns}
      />
      <DltndConf
        title="Delete Channel"
        handleClose={handleDeleteClose}
        handleDelete={handleDelete}
        loading={loading}
        open={deleteopen}
      />
    </Container>
  );
};
