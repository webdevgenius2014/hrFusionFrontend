import React, { useEffect, useState } from "react";
import BeatLoader from "react-spinners/ClipLoader";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";  
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CommonModal from "../../components/commonModal";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { GridActionsCellItem } from "@mui/x-data-grid";
import ClientsServices from '../../services/clientsServices/ClientsServices'
import ClientsForm from "./ClientsForm";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Clients = () => {
  const apiURL = `${process.env.REACT_APP_API_BASE_URL}/`; 
  console.log("apiurl: " , apiURL);
  const navigate = useNavigate();
  const [serverError,setServerError] =useState([]);
  const [loading, setLoading] = useState(false);
  // api integration -----------------------------------

  // add Clients-------------------------------------
  const handleAddClients = (data) => {
    console.log(data);
    let payload={...data ,email: data.useremail}
    console.log("Add Client payload",payload)
    setLoading(true);
    const formData = new FormData();
    // formData.append('profile_image', data.profile_image[0]);
    console.log("payload",payload)
    ClientsServices.addClient(payload)
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          getClientsfn();
          toast.success(res.data.message);
          handleClose();
        }
        if (res.status == 403) {
          setServerError(res.data.errors);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log("AddClients error: " + err);
      });
  };
  // get all Clients --------------------------------
  const [getClients, setgetClients] = useState([]);
  const getClientsfn = () => {
    setLoading(true);
    ClientsServices.getClients()
      .then((res) => {
        if (res) {
          setgetClients(res?.data?.data?.data);
          setLoading(false);
        } else {
          loading(false);
          setgetClients([]);
        }
        if(res.status === 403) {
          console.log('first')
          setLoading(false);

        }
      })
      .catch((err) => {
        console.log("getClients error", err);
      });
  };
  useEffect(() => {
    getClientsfn();
  }, []);

  // edit Clients -------------------------------
  const [Client_id, setClientId] = useState();
  const [clientData, setClientData] = useState();

  const handleClientData = (id, clientData) => {
    
    console.log(id, clientData);
    setClientId(id);
    setClientData(() => clientData);
      handleEditOpen();
    
  };
  const handleClientEdit = (data) => {
    console.log(data);
    let payload = { ...data, email:data.useremail, id: Client_id };
    console.log(payload);
    setLoading(true);
    ClientsServices.editClient(payload)
      .then((res) => {
        if (res.data.success == true) {
          setLoading(false);
          handleEditClose();
          getClientsfn();
          toast.success(res.data.message);
        }
        
        if (res.status === 403) {
        
          setServerError(()=>res.data.errors);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log("edit client error: " + err);
      });
  };

  // delete Clients -------------------------------
  const handleDeleteClick = (id) => {
    setClientId(id);
    handleDeleteOpen();
  };
  const handleDelete = (e) => {
    let id = { id: Client_id };
    setLoading(true);
    e.preventDefault();
    ClientsServices.deleteClient(id)
      .then((res) => {
        if (res.status == 200 || res.status == 404) {
          setLoading(false);
          handleDeleteClose();
          toast.success("Client deleted successfully");
          getClientsfn();
        } else if (res.status == 401) {
          navigate("/");
          setLoading(false);

          toast.error("please login again");
        }
        if (res.status == 403) {
          setLoading(false);
          setServerError(res.data.message); 
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log("delete Client error: ", err);
        setLoading(false);
    });
};

//---- end api ------------------
const [leadP,setLeadP]= useState(``)
const handleLeadPlat = (value) => {
  setLeadP (() => value);
};


  const Item = styled(Paper)(({ theme }) => ({
      backgroundColor: "transparent",
      boxShadow: "none",
    }));
    const detailEmployee = () => {};
    const columns = [
        // {  headerName: "ID", width: 100, options: { filter: true } },
        {
          field: "profile_image",
          headerName: "profile ",
          width: 100,
          options: { filter: true },
          renderCell: (params) => (
            <Avatar alt="Profile Image" src={apiURL+params?.value} sx={{ width: 40, height: 40 }} />
          ),
        },
        {
            field: "name",
            headerName: "Name",
            width: 200,
            options: { filter: true },
        },
        {
            field: "email",
      headerName: "Email Id",
      width: 200,
      options: { filter: true },
    },
    {
      field: "communication_channel",
      headerName: "Communication ",
      width: 200,
      options: { filter: true },
    },
    {
      field: "action",
      headerName: "Action",
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
              handleClientData(params?.id, params?.row);
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
          <GridActionsCellItem
            icon={<VisibilityIcon />}
            label="View"
            color="inherit"
            onClick={() => detailEmployee(params?.id)}
          />
        ];
      },
      width: 200,
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

  const styles = {
    backgroundColor: "white",
  };
  return (
    <>
      <ToastContainer />
      <Container>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Item>
                <h2>Clients</h2>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item align="right">
                <Button
                  startIcon={<AddIcon />}
                  variant="contained"
                  onClick={handleOpen}
                >
                  Add
                </Button>
              </Item>
            </Grid>
          </Grid>
          <CommonModal isOpen={open} isClose={handleClose}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ marginBottom: "20px", fontWeight: "600" }}
            >
              Add Client
            </Typography>
            <Box
            sx={{
              mb: 2,
              width: 700,
              display: "flex",
              height:440,
              flexDirection: "column",
              overflow: "hidden",
              overflowY: "scroll",
            }}
            >
              <ClientsForm 
              apiFunc={handleAddClients}
              handleLeadPlat={handleLeadPlat}
              serverError={serverError}
              />
            </Box>
          </CommonModal>
          {getClients && getClients?.length > 0 ? (
            <>
              <DataGrid
                style={styles}
                rows={getClients}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                  },
                }}
                pageSizeOptions={[5, 10]}
              />
              {/* checkboxSelection  upline */}
            </>
          ) : loading == true ? (
            <BeatLoader
              color="#2d94cb"
              cssOverride={{
                position: "absolute",
                display: "block",
                top: "45%",
                left: "55%",
                transform: "translate(-50%, -50%)",
              }}
              loading
              margin={4}
              size={90}
            />
          ) : (
            <p>No Client found</p>
          )}
        </Box>
      </Container>
      <CommonModal isOpen={editopen} noValidate isClose={handleEditClose}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ marginBottom: "20px", fontWeight: "600" }}
        >
          Edit Client
        </Typography>
        <Box
        sx={{
          mb: 2,
              width: 700,
              display: "flex",
              height:440,
              flexDirection: "column",
              overflow: "hidden",
              overflowY: "scroll",
        }}
        >
        <ClientsForm 
              apiFunc={handleClientEdit}
              handleLeadPlat={handleLeadPlat}
              clientData={clientData}
              serverError={serverError}
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
          Delete Client
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
    </>
  );
};
export default Clients;
