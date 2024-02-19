import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { superAdminLogout } from "../../redux/SuperAdminSlice";
import { ClientView } from "./ClientView";
import { toast } from "react-toastify";
import ClientsServices from "../../services/ClientsServices";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TemplateForm from "../Templates/TemplateForm";
import TemplateServices from "../../services/TemplateServices";
import BeatLoader from "react-spinners/ClipLoader";
import { Box } from "@mui/system";
import TemplateCard from "../Templates/TemplateCard";
import { TemplateView } from "../Templates/TemplateView";
const ClientMessage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  const [clientData, setClientData] = useState();
  const [loading, setLoading] = useState(false);
  const [choice, setChoice] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { id } = useParams();
  const clientId = id;
  const ClientSearch = (clientId) => {
    setLoading(true);
    ClientsServices.searchClient({ id: clientId })
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          setClientData(() => res?.data?.data?.data);
        } else {
          setLoading(false);
          setClientData([]);
        }
        if (res.status === 403) {
          setLoading(false);
          toast.error("client not found");
        }
        if (res.status === 401) {
          // con9sole.log()
          dispatch(superAdminLogout());
          setLoading(false);
          navigate("/");
        }
        if (res.status === 404) {
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("SearchClients error", err);
      });
  };

  // get all template  ----------------------------------------------------------------
  const [templData, setTemplData] = useState([]);
  const getAllTemplate = () => {
    setLoading(true);
    TemplateServices.getAllTemplates()
      .then((res) => {
        if (res.status === 200) {
          // console.log(res?.data)
          // setTotalPages(res?.data?.data?.last_page);
          console.log(res?.data?.data);
          setTemplData(res?.data?.data);
          setLoading(false);

          if (res.data.success === false) {
            setLoading(false);
            //   setNoRecord(res?.data?.message);
          }
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
        console.log("getdep error", err);
      });
  };
  // client View ------------------------------
  const viewClientFn = () => {
    setLoading(true);
    const payload = { id: clientId };
    ClientsServices.viewClient(payload)
      .then((res) => {
        // console.log("get client", res?.data?.data?.data);
        if (res.status === 200) {
          // console.log(res?.data?.data)
          setClientData(res?.data?.data);
          setLoading(false);
        } else {
          setLoading(false);
          setClientData([]);
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
        console.log("client view error", err);
      });
  };
  // send email to client
  const sendMessageToClient = (data) => {
    setLoading(true);
    let payload= {
      ...data,
      client_id:clientId,
      message_type:msgType,
    }
    console.log("payload",payload)
    ClientsServices.sendMessageToClient(payload)
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          handleClose();
          toast.success(res?.data?.message);
          // getDepartmentfn();
        }
        if (res.status === 403) {
          console.log(res?.data)
          toast.success(res?.data?.message);
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
      })
      .catch((err) => {
        console.log("addDepartment error: " + err);
      });
  };
  useEffect(() => {
    viewClientFn();
    getAllTemplate();
  }, []);

  useEffect(() => {
    ClientSearch();
  }, []);

  const handleChange = (event) => {
    setChoice(event.target.value);
  };
  const [tempData,setTempdata]=useState()
  const  handleTempData=(data) => {
      handleOpen();
      setTempdata(()=>data)
  }
  const [msgType,setMsgType]=useState('');

  const handleType=(type) => {
    console.log(type)
    setMsgType(type)
  }
  return (
    <Box>
      {clientData && <ClientView viewClient={clientData} />}
      <Grid container justifyContent="space-between">
        <Grid item xs={12} sm={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Message Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={choice}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem onClick={()=>handleType('template')} value={"Template"}>Template</MenuItem>
              <MenuItem onClick={()=>handleType("custom")}  value={"Custom"}>Custom</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Box sx={{ mt: 3 }}>
          {choice && choice === "Custom" && (
            <TemplateForm btnName={"Send"} loading={loading} apiFun={sendMessageToClient}/>
          )}
          {choice &&
            choice === "Template" &&
            templData.length > 0 &&
            templData?.map((i) => {
              return (
                <TemplateCard
                  data={i}
                  key={i.id}
                  func={handleTempData}
                  apiFun={sendMessageToClient}
                  // handleDeleteClick={handleDeleteClick}
                  // handleEditClick={handleEditClick}
                  hide={true}
                />
              );
            })}

          {loading === true && (
            <BeatLoader
              color="#2d94cb"
              cssOverride={{
                position: "absolute",
                display: "block",

                top: "45%",
                left: "55%",
                transform: "translate(-50%, -50%)",
              }}
              loading={loading}
              margin={4}
              size={90}
            />
          )}
        </Box>
      </Grid>
    <TemplateView 
    apiFun={sendMessageToClient}
    data={tempData}
    open={open}
      handleClose={handleClose}/> 
    </Box>
  );
};

export default ClientMessage;
