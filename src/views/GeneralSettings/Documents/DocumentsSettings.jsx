import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import AddIcon from "@mui/icons-material/Add";
import CommonModal from "../../../components/modal/commonModal";
import {AddButton , Buttons} from  '../../../components/Buttons/AllButtons';
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { toast } from "react-toastify";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { DeleteDilagBox } from "../../../components/modal/DeleteModal";
import { CustDataGrid } from "../../../components/dataGrid/CustDataGrid";
import { DatagridHeader } from "../../../components/dataGrid/DatagridHeader";
import { superAdminLogout } from "../../../redux/SuperAdminSlice";
import GeneralServices from "../../../services/GeneralServices";
import { DocumentForm } from "./DocumentForm";
export const DocumentsSettings = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formLoader, setFormLoader] = useState(false);
    const [getAddChannel, setGetAddChannel] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    const [editopen, setEditOpen] = useState(false);
    const handleEditOpen = () => setEditOpen(true);
    const handleEditClose = () => setEditOpen(false);
  
    const [deleteopen, setDeleteOpen] = useState(false);
    const handleDeleteOpen = () => setDeleteOpen(true);
    const handleDeleteClose = () => setDeleteOpen(false);
  
    // get api channel
    const getAllChannel = () => {
      setFormLoader(true);
      GeneralServices.getAllDocumentTypes()
        .then((res) => {
          if (res.status === 200 && res?.data?.success === true) {
            setFormLoader(false);
            setGetAddChannel(res?.data?.data);
            console.log(res.data.data)
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

     // add api --------------------------------
  const addDocument = (data) => {
    setLoading(true);
    GeneralServices.addDocumentType(data)
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          handleClose();
          toast.success(res?.data?.message);
          getAllChannel();
        }
        if (res.status === 403) {
          console.log(res.data);
          setServerError(res?.data?.errors);
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
        console.log("add Channel error: " + err);
      });
  };
  // Edit api ----------------------------------------------------------------
   // edit api --------------------------------
   const [editDocumentData, setEditDocumentData] = useState();
   const editValue = (documentData) => {
     setEditDocumentData(() => documentData);
     handleEditOpen();
   };
   const handleEdit = (data) => {
     let payload = { ...data, id: editDocumentData?.id };
     console.log(payload);
     setLoading(true);
     GeneralServices.editDocumentType(payload)
       .then((res) => {
         if (res.data.success === true) {
           setLoading(false);
           handleEditClose();
           getAllChannel();
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
         console.log("editDepartment error: " + err);
       });
   };

  // delete api ----------------------------------------------------------------
    const [deleteDocId, setDeleteDocId] = useState();
    const handleDeleteClick = (id) => {
        setDeleteDocId(id);
      handleDeleteOpen();
    };
    const handleDelete = (e) => {
        let id = { id: deleteDocId };
        setLoading(true);
        e.preventDefault();
        GeneralServices.deleteDocumentType(id)
          .then((res) => {
            if (res.status === 200 || res.status === 404) {
              setLoading(false);
              handleDeleteClose();
              toast.success(res?.data?.message);
              getAllChannel();
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
            console.log("delete department error: ", err);
            setLoading(false);
          });
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
    

      useEffect(() => {
        getAllChannel();
      }, [page]);
      useEffect(() => {
        getAllChannel();
      }, []);
    
  return (
    <Container style={{ padding: 0 }}>
    <Box>
      <DatagridHeader name={"Documents  "}>
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
          Add Document 
        </Typography>
        <Box
          sx={{
            minWidth: { lg: 350, md: 250, sm: 150, xs: 70, xl: 500 },
            maxWidth: { lg: 500, md: 400, sm: 350, xs: 200, xl: 700 },
          }}
        >
          <DocumentForm
            loading={loading}
            label={"label"}
            apiFun={addDocument}
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
          Edit DOcument Name
        </Typography>
        <Box
          sx={{
            minWidth: { lg: 350, md: 250, sm: 150, xs: 70, xl: 500 },
            maxWidth: { lg: 500, md: 400, sm: 350, xs: 200, xl: 700 },
          }}
        >
          <DocumentForm
            loading={loading}
            document_name={editDocumentData?.document_name}
            apiFun={handleEdit}
            error={serverError}
            btnName="Save Changes"
          />
        </Box>
      </CommonModal>

      {/*  display grid */}
    </Box>
    <CustDataGrid
      data={getAddChannel}
      loading={formLoader}
      columns={columns}
    />
    <DeleteDilagBox
      title="Delete Channel"
      handleDeleteClose={handleDeleteClose}
      handleDelete={handleDelete}
      loading={loading}
      deleteopen={deleteopen}
    />
  </Container>
  )
}
