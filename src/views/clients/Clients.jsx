import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import { DatagridHeader } from "../../components/DatagridHeader";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CommonModal from "../../components/commonModal";
import Button from "@mui/material/Button";
import BeatLoader from "react-spinners/ClipLoader";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { GridActionsCellItem } from "@mui/x-data-grid";
import ClientsServices from "../../services/ClientsServices";
import ClientsForm from "./ClientsForm";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { ClientsCard } from "./ClientsCard";
import { CustomPagination } from "../../components/PaginationMui";
import { Searching } from "../../components/Searching";
import "react-toastify/dist/ReactToastify.css";
import  ClientProfile  from "./ClientProfile";

const Clients = () => {
  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = useState(1);
  const [serverError, setServerError] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchFlag, setSearchFlag] = useState(false);
  const apiURL = `${process.env.REACT_APP_API_BASE_URL}/`;
  const navigate = useNavigate();
  // api integration -----------------------------------

  // add Clients-------------------------------------
  const handleAddClients = (data) => {
    let payload = { ...data, email: data?.useremail };
    setLoading(true);

    console.log("client api payload", payload);

    ClientsServices.addClient(payload)
      .then((res) => {
        // console.log(res)
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
        setLoading(false);
        console.log("AddClients error: " + err);
      });
  };
  // get  Clients --------------------------------
  const [getClients, setgetClients] = useState();
  const getClientsfn = () => {
    setLoading(true);
    ClientsServices.getClients(page)
      .then((res) => {
        // console.log("get client",res?.data?.data?.data)
        if (res) {
          setgetClients(res?.data?.data?.data);
          setTotalPages(res?.data?.data?.last_page);
          setLoading(false);
        } else {
          setLoading(false);
          setgetClients([]);
        }
        if (res.status === 403) {
          setLoading(false);
        }
        if (res.status === 404) {
            console.log(res.data.message);
          setLoading(false);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log("getClients error", err);
      });
  };
  useEffect(() => {
    getClientsfn();
  }, [page]);

  // edit Clients -------------------------------
  const [Client_id, setClientId] = useState();
  const [clientData, setClientData] = useState();
  const [profileData, setProfileData] = useState();

  const handleClientData = (id, clientData) => {
    console.log(id, clientData);
    setClientId(id);
    setClientData(() => clientData);
    handleEditOpen();
  };
  const handleClientEdit = (data) => {
    console.log(data);
    let payload = { ...data, email: data.useremail, id: Client_id };
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
          setServerError(() => res.data.errors);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
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
const  [record,setRecord]=useState();
  // Search api -------------------------
  const ClientSearch = (payload) => {
    setSerchBtn(true);
    setLoading(true);
    ClientsServices.searchClient(payload)
      .then((res) => {
        if (res) {
          console.log(res?.data?.data?.data);
          setgetClients(() => res?.data?.data?.data);
          handleSearchClose();
        } else {
          setLoading(false);
          setgetClients([]);
          handleSearchClose();
        }
        if (res.status === 403) {
          setLoading(false);
        }
        if (res.status === 404) {
          setRecord(res.data.message)
        setLoading(false);
      }
      })
      .catch((err) => {
        setLoading(false);
        console.log("SearchClients error", err);
      });
  };
  //---- end api ------------------
  const detailEmployee = (row) => {
    handleViewOpen();
    console.log("client data", row);
  };

  const columns = [
    // {  headerName: "ID", width: 100, options: { filter: true } },
    {
      field: "id",
      headerName: "No.",
      filterable: false,
      width: 50,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1,
    },
    {
      field: "profile_image",
      headerName: "Profile ",
      headerClassName: "super-app-theme--header",
      width: 100,
      options: { filter: true },
      renderCell: (params) => (
        <Avatar
          alt="Profile Image"
          src={apiURL + params?.value}
          sx={{ width: 40, height: 40 }}
        />
      ),
    },
    {
      field: "name",
      headerClassName: "super-app-theme--header",
      headerName: "Name",
      width: 200,
      options: { filter: true },
    },
    {
      field: "email",
      headerClassName: "super-app-theme--header",
      headerName: "Email Id",
      width: 248,
      options: { filter: true },
    },
    {
      field: "communication_channel",
      headerName: "Communication ",
      headerClassName: "super-app-theme--header",
      width: 200,
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
            onClick={() => detailEmployee(params?.row)}
          />,
        ];
      },
      width: 192,
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

  const [viewopen, setViewOpen] = useState(false);
  const handleViewOpen = () => setViewOpen(true);
  const handleViewClose = () => setViewOpen(false);

  const handleSearchOpen = () => setSearchFlag(true);
  const handleSearchClose = () => setSearchFlag(false);
  const [srchbtn, setSerchBtn] = useState(false);

  const styles = {
    backgroundColor: "white",
  };
  return (
    <>
      <ToastContainer />
      <Container style={{ padding: 0 }}>
        <DatagridHeader name={"Clients"}>
          <>
            {!srchbtn ? (
              <Button
                onClick={() => {
                  handleSearchOpen(true);
                }}
                startIcon={<SearchIcon />}
                variant="contained"
              >
                Search
              </Button>
            ) : (
              <Button
                onClick={() => {
                  getClientsfn();
                  setSerchBtn(false);
                }}
                variant="contained"
              >
                Clear Search
              </Button>
            )}

            <Button
              startIcon={<AddIcon />}
              variant="contained"
              onClick={handleOpen}
            >
              Add
            </Button>
          </>
        </DatagridHeader>
        {searchFlag && searchFlag === true && (
          <CommonModal
            isOpen={searchFlag}
            noValidate
            isClose={handleSearchClose}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ marginBottom: "20px", fontWeight: "600" }}
            >
              Search Client
            </Typography>
            <Box
              sx={{
                mb: 2,
                width: "230px",
                display: "flex",

                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              <Searching
                fieldLable={["Client Name", "Project Name"]}
                filedName={["name", "project_name"]}
                apiFun={ClientSearch}
              />
            </Box>
          </CommonModal>
        )}
        <Box>
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
                width: 650,
                display: "flex",
                height: 440,
                overflow: "hidden",
                overflowY: "scroll",
              }}
            >
              <ClientsForm
                apiFunc={handleAddClients}
                serverError={serverError}
                BtnName={"Save "}
              />
            </Box>
          </CommonModal>
          <box
            maxWidth="sm"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            {getClients && getClients?.length > 0 ? (
              getClients?.map((i) => {
                return (
                  <ClientsCard
                    data={i}
                    handleEditClient={handleClientData}
                    handleDeleteClick={handleDeleteClick}
                    key={i.id}
                    profileData={setProfileData}
                    handleViewOpen={handleViewOpen}
                    viewopen={viewopen}
                  />
                );
              })
            ) : loading === true ? (
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
              <p>{record}</p>
            )}
          </box>
          {getClients &&
          <div
            style={{ width: "100%", marginTop: "10px", background: "white" }}
          >
            <CustomPagination totalPages={totalPages} setPage={setPage} />
          </div>
          }
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
            height: 440,
            flexDirection: "column",
            overflow: "hidden",
            overflowY: "scroll",
          }}
        >
          <ClientsForm
            apiFunc={handleClientEdit}
            clientData={clientData}
            serverError={serverError}
            BtnName={"Save Changes"}
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
      <CommonModal isOpen={viewopen} noValidate isClose={handleViewClose}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ marginBottom: "20px", fontWeight: "600" }}
        >
        Client Profile
        </Typography>
        <Box
          sx={{
            mb: 2,
            width: 800,
            display: "flex",
            height: 440,
            flexDirection: "column",
            // overflow: "hidden",
            overflowY: "scroll",
          }}
        >
          <ClientProfile data={profileData} />
        </Box>
      </CommonModal>
    </>
  );
};
export default Clients;
