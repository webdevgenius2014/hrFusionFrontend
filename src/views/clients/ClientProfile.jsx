import React,{useState,useEffect} from "react";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import { useParams } from 'react-router-dom';
import ClientsServices from "../../services/ClientsServices";


const ClientProfile = () => {
  const apiURL = `${process.env.REACT_APP_API_BASE_URL}/`;
  const [viewClient, setViewClient] = useState();
  const [loading, setLoading] = useState(false);
  const  {id } = useParams();
  const clientId =id;
  console.log(clientId);

  const viewClientFn = () => {
    setLoading(true);
   const  payload={id:clientId}
    ClientsServices.viewClient(payload)
      .then((res) => {
        // console.log("get client",res?.data?.data?.data)
        if (res) {
          console.log(res?.data?.data)
          setViewClient(res?.data?.data);
          setLoading(false);
        } else {
          setLoading(false);
          setViewClient([]);
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

  useEffect(() => {
    viewClientFn();
  }, []);
  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{ paddingBottom: 3,paddingTop:3,     background: "white" }}
      >
        <Grid item xs={4}>
          <CardMedia
            sx={{
              height: 150,
              width: 150,
              borderRadius: "50%",
              textAlign: "center",
              margin: "auto",
             
              border: "1px solid #dee2e6",
            }}
            image={`${apiURL}${viewClient?.profile_image} `}
            title="green iguana"
          />
        </Grid>
        <Grid item xs={8}>
          <Grid item xs={12}>
            <h2 style={{ margin: "auto" }}>{viewClient?.name}</h2>
            <span>{viewClient?.email}</span>
          </Grid>
          <Grid container spacing={0} sx={{ paddingTop: "10px" }}>
            <Grid item xs={4}>
              <span style={{fontWeight: 600}}>Phone Number </span>
            </Grid>
            <Grid item xs={6}>
              <span>{viewClient?.phone}</span>
            </Grid>
            <Grid item xs={4}>
              <span style={{fontWeight: 600}}>Communication </span>
            </Grid>
            <Grid item xs={6}>
              <span>{viewClient?.communication_channel}</span>
            </Grid>
            <Grid item xs={4}>
              <span style={{fontWeight: 600}}>lead platform</span>
            </Grid>
            <Grid item xs={6}>
              <span>{viewClient?.lead_from_platform}</span>
            </Grid>
            <Grid item xs={4}>
              <span style={{fontWeight: 600}}>social_links</span>
            </Grid>
            <Grid item xs={6}>
              <span>
               
              </span>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {viewClient?.projects.length>0 &&<h2 style={{ margin: "0" }}>projects :-</h2>}
      {viewClient?.projects.map((itr) => {
        return (
          <Grid
            container
            spacing={0}
            sx={{ marginTop: "10px", boxShadow: 2, padding: 2 }}
          >
            <Grid item xs={12}>
              <span>
                <h3 style={{ margin: "0" }}>{itr?.project_name}</h3>
              </span>
            </Grid>
            <Grid item  xs={12}>
             <p> {itr?.description}</p>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={2}>
                  <span style={{fontWeight: 600}}> Language:</span>
                </Grid>
                <Grid item xs={4}>
                  <span>{itr?.language} </span>
                </Grid>
                <Grid item xs={2}>
                <span style={{fontWeight: 600}}>  Status</span>
                </Grid>
                <Grid item xs={4}>
                 <span> {itr?.status}</span>
                </Grid>
                <Grid item xs={2}>
                  <span style={{fontWeight: 600}}> Team Lead </span>
                </Grid>
                <Grid item xs={4}>
                  <span>{itr?.team_lead} </span>
                </Grid>
                <Grid item xs={2}>
                  <span style={{fontWeight: 600}}>Team Members</span>
                </Grid>
                <Grid item xs={4}>
                 <span> {itr?.team_members}</span>
                </Grid>
                <Grid item xs={2}>
                  <span style={{fontWeight: 600}}> Deadline</span>
                </Grid>
                <Grid item xs={4}>
                  <span>{itr?.deadline} </span>
                </Grid>
                <Grid item xs={2}>
                  <span style={{fontWeight: 600}}>Payment Status</span>
                </Grid>
                <Grid item xs={4}>
                 <span>{itr?.payment_status}</span> 
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        );
      })}
    </>
  );
};
export default ClientProfile