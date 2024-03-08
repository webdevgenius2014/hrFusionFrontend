import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
import BeatLoader from "react-spinners/ClipLoader";
import ClientsServices from "../../services/ClientsServices";
import dateFormat from "dateformat";
import { ClientView } from "./ClientView";
import { Box } from "@mui/system";

const ClientProfile = () => {
  const { id } = useParams();
  const clientId = id;
  
  const [viewClient, setViewClient] = useState();
  const [loading, setLoading] = useState(false);
  
  // view client api
  const viewClientFn = () => {
    setLoading(true);
    const payload = { id: clientId };
    ClientsServices.viewClient(payload)
      .then((res) => {
        if (res.status === 200) {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  
  // const team_members = viewClient?.projects?.team_members?.map((i, index) => {
  //   return <span key={index}>{i?.name}</span>;
  // });
  return (
    <>
      {loading && (
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
      )}
      {viewClient && (
        <>
          <Box>
            <ClientView viewClient={viewClient} />
          </Box>

          {viewClient?.projects?.length > 0 && (
            <h2 style={{ marginTop: "20px" }}>Projects :-</h2>
          )}
          {viewClient?.projects.map((itr, index) => {
            return (
              <Grid
                key={index}
                container
                spacing={0}
                sx={{
                  marginTop: "10px",
                  boxShadow: 2,
                  padding: 2,
                  background: "white",
                }}
              >
                <Grid item xs={12}>
                  <span>
                    <h3 style={{ margin: "0", fontSize: "17px" }}>
                      {itr?.project_name}
                    </h3>
                  </span>
                </Grid>
                <Grid item sx={{ fontSize: "12px" }} xs={12}>
                  <p> {itr?.description}</p>
                </Grid>
                <Grid item sx={{ fontSize: "12px" }} xs={12}>
                  <Grid container spacing={1}>
                    <Grid item xs={6} sm={6} md={6} lg={2}>
                      <span style={{ fontWeight: 600 }}> Language:</span>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={4}>
                      <span>{itr?.language} </span>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={2}>
                      <span style={{ fontWeight: 600 }}> Status</span>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={4}>
                      <span>
                        {" "}
                        {itr?.status === 0
                          ? " In Process"
                          : itr.status === 1
                          ? "Completed "
                          : " On hold"}
                      </span>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={2}>
                      <span style={{ fontWeight: 600 }}> Team Lead </span>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={4}>
                      <span>{itr?.team_lead?.name} </span>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={2}>
                      <span style={{ fontWeight: 600 }}>Team Members</span>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={4}>
                      <span>
                        
                        {itr?.team_members?.map((i, index) => {
                          return <>
                          {i?.name}
                          {index < itr?.team_members?.length - 1  && (
                            <span> ,</span>
                           )}
                           </>
                        })}
                        
                      </span>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={2}>
                      <span style={{ fontWeight: 600 }}> Deadline</span>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={4}>
                      <span>{dateFormat(itr?.deadline, "dd/mmm/yyyy")} </span>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={2}>
                      <span style={{ fontWeight: 600 }}>Payment Status</span>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={2}>
                      <span>{itr?.payment_status}</span>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
        </>
      )}
    </>
  );
};
export default ClientProfile;
