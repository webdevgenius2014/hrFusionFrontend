import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import ClientsForm from "./ClientsForm";
import { useDispatch } from "react-redux";
import ClientProfile from "./ClientProfile";
import { ClientsCard } from "./ClientsCard";
import AddIcon from "@mui/icons-material/Add";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import SearchIcon from "@mui/icons-material/Search";
import { Searching } from "../../components/Searching";
import GeneralServices from "../../services/GeneralServices";
import CommonModal from "../../components/modal/commonModal";
import ClientsServices from "../../services/ClientsServices";
import { superAdminLogout } from "../../redux/SuperAdminSlice";
import CsvUploadBtn from "../../components/Buttons/CsvUploadBtn";
import { DltndConf } from "../../components/modal/Dlt-Conf-Modal";
import { CustomPagination } from "../../components/CustomPagination";
import { AddButton, Buttons } from "../../components/Buttons/AllButtons";
import { DemoCsv } from "../../helperFunctions/HelperFunction"; 
import { DatagridHeader } from "../../components/dataGrid/DatagridHeader";
import { ButtonBase } from "@material-ui/core";
import Menu from '@mui/material/Menu';
import { useTheme } from '@mui/material/styles';
import { IconButton,MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import useMediaQuery from '@mui/material/useMediaQuery';

const Clients = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = useState(1);
  const [serverError, setServerError] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formLoader, setFormLoader] = useState(false);
  const [csvFile, setCsvFile] = useState();
  const [srchbtn, setSerchBtn] = useState(false);

  // api states
  const [getClients, setgetClients] = useState();
  const [getAddChannel, setGetAddChannel] = useState([]);
  const [getAllLeads, setGetAllLeads] = useState([]);
  const [Client_id, setClientId] = useState();
  const [clientData, setClientData] = useState();
  const [profileData, setProfileData] = useState();
  const [record, setRecord] = useState();

  // api integration -----------------------------------
  // get api channel
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
        console.log("getdep error", err);
      });
  };
  // get  Clients --------------------------------
  const getClientsfn = () => {
    setFormLoader(true);
    ClientsServices.getClients(page)
      .then((res) => {
        if (res.status === 200 && res?.data?.success === true) {
          setgetClients(res?.data?.data?.data);
          setTotalPages(res?.data?.data?.last_page);
          setFormLoader(false);
        }
        if (res.status === 200 && res?.data?.success === false) {
          setFormLoader(false);
          setRecord(res?.data?.message);
          setgetClients([]);
        }
        if (res.status === 403) {
          setFormLoader(false);
        }
        if (res.status === 401) {
          dispatch(superAdminLogout());
          setFormLoader(false);
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
  // add Clients-------------------------------------
  const handleAddClients = (data) => {
    let payload = { ...data, email: data?.useremail };
    setLoading(true);
    ClientsServices.addClient(payload)
      .then((res) => {
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
  // edit Clients -------------------------------
  const handleClientEdit = (data) => {
    let payload = { ...data, email: data.useremail, id: Client_id };
    setLoading(true);
    ClientsServices?.editClient(payload)
      .then((res) => {
        if (res?.data?.success === true) {
          setLoading(false);
          handleEditClose();
          getClientsfn();
          toast.success(res?.data?.message);
        } else if (res.status === 401) {
          dispatch(superAdminLogout());
          setLoading(false);
          navigate("/");
        } else if (res.status === 403) {
          setServerError(() => res.data.errors);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("edit client error: " + err);
      });
  };
  const handleClientData = (id, clientData) => {
    setClientId(id);
    setClientData(() => clientData);
    handleEditOpen();
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
          handleDeleteClose();
          getClientsfn();
          setLoading(false);
          toast.success("Client deleted successfully");
        }
        if (res.status === 401) {
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
  // Search api -------------------------
  const clientSearch = (payload) => {
    setLoading(true);
    ClientsServices.searchClient(payload, page)
      .then((res) => {
        if (res.status === 200) {
          console.log(res?.data?.data);
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
          setRecord(res?.data?.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("SearchClients error", err);
      });
  };
  // csv Upload api -------------------------
  const csvUpload = () => {
    setLoading(true);
    ClientsServices.uploadClientCSV({ csv: csvFile })
      .then((res) => {
        if (res?.data?.success === true) {
          setLoading(false);
          handleConfirmClose();
          getClientsfn();
          toast.success(res?.data?.message);
        } else if (res.status === 401) {
          dispatch(superAdminLogout());
          setLoading(false);
          navigate("/");
        } else if (res.status === 403) {
          setServerError(() => res.data.errors);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("SearchClients error", err);
      });
  };
  //---- end api ------------------

  useEffect(() => {
    getClientsfn();
    getAllChannel();
    getAllLeadsFun();
    // eslint-disable-next-line
  }, [page]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setServerError(null);
    setOpen(false);
  };

  const [editopen, setEditOpen] = useState(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => {
    setServerError(null);
    setEditOpen(false);
  };

  const [deleteopen, setDeleteOpen] = useState(false);
  const handleDeleteOpen = () => setDeleteOpen(true);
  const handleDeleteClose = () => setDeleteOpen(false);

  const [viewopen, setViewOpen] = useState(false);
  const handleViewOpen = () => setViewOpen(true);
  const handleViewClose = () => setViewOpen(false);

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

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>


      <Container style={{ padding: 0 }}>
        <DatagridHeader name={"Clients"} >
        { isSmallScreen ? <Box >
          <>
      <IconButton onClick={handleMenuOpen} aria-label="Menu">
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
      <MenuItem
      onClick={() => {
        handleOpen();
        handleMenuClose();
      }}
    >
    <AddIcon />
       Add Clients
    </MenuItem>
        {searchFlag ? (
          <MenuItem onClick={()=>{handleSearchClose();handleMenuClose();}}> Clear Search</MenuItem>
        ) : (
          <MenuItem onClick={()=>{handleSearchOpen();handleMenuClose();}  }> Search</MenuItem>
        )}
        <MenuItem
        onClick={() => {
          DemoCsv("download/ClientCsc.csv");
          handleMenuClose();
        }}
      >
        Sample Csv
      </MenuItem>
        <MenuItem>
          <CsvUploadBtn
            setCsvFile={setCsvFile}
            handleConfirmOpne={handleConfirmOpne}
          />
        </MenuItem>
        
      </Menu>
    </>
          </Box>
          :
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
              
              <CsvUploadBtn
                setCsvFile={setCsvFile}
                handleConfirmOpne={handleConfirmOpne}
              />
              <Buttons
                variant="contained"
                onClick={() => DemoCsv("download/EmployeeCsv.csv")}
              >
                Sample Csv
              </Buttons>
            </>}
        </DatagridHeader>
        {searchFlag && searchFlag === true && (
          <Searching
            fieldLable={["Client Name", "Project Name"]}
            filedName={["name", "project_name"]}
            apiFun={clientSearch}
          />
        )}
        <Box>
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
            ) : formLoader === true ? (
              <Loader />
            ) : (
              <p>{record}</p>
            )}
          </Box>
          {totalPages && totalPages >= 2 && (
            <div
              style={{ width: "100%", marginTop: "10px", background: "white" }}
            >
              <CustomPagination totalPages={totalPages} setPage={setPage} />
            </div>
          )}
        </Box>
      </Container>
      <CommonModal
        isOpen={open || editopen}
        isClose={open ? handleClose : handleEditClose}
        title={open ?  'Add Client' : 'Edit Client'}
      >
       
          <ClientsForm
            apiFunc={open ? handleAddClients : handleClientEdit}
            getAddChannel={getAddChannel}
            clientData={editopen ? clientData : null}
            getAllLeads={getAllLeads}
            serverError={serverError}
            btnName={open ? "Save" : "Save Changes"}
          />
       
      </CommonModal>

      {/* delete client  uplod csv file*/}
      <DltndConf
        title={deleteopen ? "Delete Client" : "Csv Upload"}
        btnName={confirm ? "Confirm" : ""}
        handleClose={deleteopen ? handleDeleteClose : handleConfirmClose}
        handleDelete={deleteopen ? handleDelete : csvUpload}
        message={confirm ? `Are you sure want to upload ${csvFile?.name}` : ""}
        loading={loading}
        open={deleteopen || confirm}
      />
    </>
  );
};
export default Clients;
