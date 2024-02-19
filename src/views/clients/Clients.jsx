import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { DatagridHeader } from "../../components/dataGrid/DatagridHeader";
import CommonModal from "../../components/modal/commonModal";
import BeatLoader from "react-spinners/ClipLoader";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import {AddButton , Buttons} from  '../../components/Buttons/AllButtons';
import SearchIcon from "@mui/icons-material/Search";
import ClientsServices from "../../services/ClientsServices";
import ClientsForm from "./ClientsForm";
import { ClientsCard } from "./ClientsCard";
import { CustomPagination } from "../../components/CustomPagination";
import { Searching } from "../../components/Searching";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import  ClientProfile  from "./ClientProfile";
import { DeleteDilagBox } from "../../components/modal/DeleteModal";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { superAdminLogout } from "../../redux/SuperAdminSlice";
import GeneralServices from "../../services/GeneralServices";
import CsvUploadBtn from "../../components/Buttons/CsvUploadBtn";

const Clients = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = useState(1);
  const [serverError, setServerError] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchFlag, setSearchFlag] = useState(false);
  const [formLoader, setFormLoader] = useState(false);

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
        if (res.status === 403) {
          setServerError(res.data.errors);
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
        setLoading(false);
        console.log("AddClients error: " + err);
      });
  };
  // get  Clients --------------------------------
  const [getClients, setgetClients] = useState();
  const getClientsfn = () => {
    setFormLoader(true);
    ClientsServices.getClients(page)
      .then((res) => {
        // console.log("get client",res?.data?.data?.data)
        if (res.status=== 200 && res?.data?.success=== true) {
          setgetClients(res?.data?.data?.data);
          setTotalPages(res?.data?.data?.last_page);
          setFormLoader(false);
        }
         if (res.status=== 200 && res?.data?.success=== false) {
          setFormLoader(false);
          setRecord(res?.data?.message);
          setgetClients([]);
        }
        if (res.status === 403) {
          setFormLoader(false);
        }
        if (res.status === 401) {
          // con9sole.log()
          dispatch(superAdminLogout());
          setFormLoader(false);
        navigate("/");
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
  // get api channel
  const [getAddChannel,setGetAddChannel]=useState([])
  const getAllChannel = () => {
    GeneralServices.getAllChannels()
      .then((res) => {
        if (res.status === 200 && res?.data?.success === true) {
          setGetAddChannel(res?.data?.data);
        }
        if (res.status === 200 && res?.data?.success === false) {
        }
        if (res.status === 401) {
          dispatch(superAdminLogout());
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("getAllChannel error", err);
      });
  };
  // get api leadplatform -----------------------
  const [getAllLeads,setGetAllLeads] = useState([]);
  const getAllLeadsFun = () => {
    setFormLoader(true);
    GeneralServices.getAllPlatforms()
      .then((res) => {
        console.log(res?.data?.data)
        if (res.status=== 200 && res?.data?.success === true) {
          setFormLoader(false);
          setGetAllLeads(res?.data?.data)
        } 
          if(res.status=== 200 && res?.data?.success === false) {
            setFormLoader(false);
          }
          if(res.status === 401){
            dispatch(superAdminLogout());
            navigate("/");
          }
          if(res.status === 404){
            setFormLoader(false);
            setLoading(false);

          }
        
      })
      .catch((err) => {
        setFormLoader(false);
        console.log("getdep error", err);
      });
  };

  useEffect(() => {
    getClientsfn();
    getAllChannel();
    getAllLeadsFun();
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
    ClientsServices?.editClient(payload)
      .then((res) => {
        if (res?.data?.success === true) {
          setLoading(false);
          handleEditClose();
          getClientsfn();
          toast.success(res?.data?.message);
        }
       else if  (res.status === 401) {
          // con9sole.log()
          dispatch(superAdminLogout());
          setLoading(false);
        navigate("/");
        }
       else if (res.status === 403) {
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
        if (res.status === 200 || res.status === 404) {
          setLoading(false);
          handleDeleteClose();
          toast.success("Client deleted successfully");
          getClientsfn();
        } if (res.status === 401) {
          // con9sole.log()
          dispatch(superAdminLogout());
          setLoading(false);
        navigate("/");
        }
        if (res.status === 403) {
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
    setLoading(true);
    ClientsServices.searchClient(payload,page)
      .then((res) => {
        if (res.status === 200 ) {
          console.log(res?.data?.data)
          setgetClients(() => res?.data?.data);
          handleSearchClose();
        } else {
          setLoading(false);
          setgetClients([]);
          handleSearchClose();
        }
        if (res.status === 403) {
          setLoading(false);
        }
        if(res.status === 404) {
          setLoading(false);

        }
        if (res.status === 401) {
          // con9sole.log()
          dispatch(superAdminLogout());
          setLoading(false);
        navigate("/");
        }
        if (res.status === 404) {
          setRecord(res?.data?.message)
        setLoading(false);
      }
      })
      .catch((err) => {
        setLoading(false);
        console.log("SearchClients error", err);
      });
  };
  //---- end api ------------------
 


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
  return (
    <>
      <Container style={{ padding: 0 }}>
        <DatagridHeader name={"Clients"}>
          <>
            {!srchbtn ? (
              <Buttons
                onClick={() => {
                  handleSearchOpen(true);
                  setSerchBtn(true);

                }}
                startIcon={<SearchIcon />}
                variant="contained"
              >
                Search
              </Buttons>
            ) : (
              <Buttons
                onClick={() => {
                  getClientsfn();
                  setSerchBtn(false);
                  handleSearchClose();
                }}
                variant="contained"
              >
                Clear Search
              </Buttons>
            )}

            <AddButton
              startIcon={<AddIcon />}
              variant="contained"
              onClick={handleOpen}
            >
              Add
            </AddButton>
            <CsvUploadBtn/>
           
          </>
        </DatagridHeader>
        {searchFlag && searchFlag === true && (
         
              <Searching
                fieldLable={["Client Name", "Project Name"]}
                filedName={["name", "project_name"]}
                apiFun={ClientSearch}
              />
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
                width: 850,
                display: "flex",
                height: 440,
               
                overflow: "hidden",
                overflowY: "scroll",
              }}
            >
              <ClientsForm
                apiFunc={handleAddClients}
                getAddChannel={getAddChannel}
                getAllLeads={getAllLeads}
                serverError={serverError}
                btnName={"Save "}
              />
            </Box>
          </CommonModal>
          <Box
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
          </Box>
          {totalPages && totalPages>= 2  &&
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
            getAddChannel={getAddChannel}
            clientData={clientData}
            getAllLeads={getAllLeads}
            serverError={serverError}
            btnName={"Save Changes"}
          />
        </Box>
      </CommonModal>
      {/* delete client */}
 <DeleteDilagBox title='Delete Client' 
      handleDeleteClose={handleDeleteClose}
      handleDelete={handleDelete}
      loading={loading}
      deleteopen={deleteopen} />
       
      {/* viwe client */}
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
