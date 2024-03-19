/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import dateFormat from "dateformat";
import Loader  from '../../components/Loader'
import { CustDataGrid } from "../../components/dataGrid/CustDataGrid";
import ProjectServices from "../../services/ProjectServices";

const ProjectView = () => {
  const { id } = useParams();
  const projectId = id;
  const [loading, setLoading] = useState(false);

  // api state
  const [viewProject, setViewProject] = useState([]);

  // view project api
  const ViewProject = () => {
    setLoading(true);
    const payload = { id: projectId };
    ProjectServices.viewProjects(payload)
      .then((res) => {
        if (res.status === 200) {
          setViewProject(res?.data?.data);
          setLoading(false);
        } else {
          setLoading(false);
          setViewProject([]);
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
        console.log("project view error", err);
      });
  };

  useEffect(() => {
    ViewProject();
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
      field: "project_status",
      headerName: " Project Status",
      headerClassName: "super-app-theme--header",
      flex: 1,
      options: { filter: true },
      
    },
    {
      field: "payment_status",
      headerName: "Payment Status",
      headerClassName: "super-app-theme--header",
      flex: 1,
      options: { filter: true },
    },
    {
      field: "created_at",
      headerName: "Date ",
      flex: 1,
      headerClassName: "super-app-theme--header",
      options: { filter: true },
      renderCell: (params) => (
        <strong style={{display:'flex'}}> 
         {dateFormat(params?.row?.created_at, "dd/mmm/yyyy  hh:mm:ss ") }
        </strong>
      ),
    },
  ];
  return (
    <>
      {loading ? (
        <Loader/>
      ) : (
        <>  
        <Box sx={{background:'#E2EAF5' , padding:'10px 10px',borderRadius:'10px'}}>
          Project Detail
          </Box>
          <Grid container spacing={2} sx={{ paddingY: 2, background: "" }}>
            <Grid
              container
              spacing={0}
              sx={{
                
                padding: 2,
                background: "white",
              }}
            >
              <Grid item xs={12}>
                <span>
                  <h3 style={{ margin: "0", fontSize: "17px" }}>
                    {viewProject?.project_name}
                  </h3>
                </span>
              </Grid>
              <Grid item sx={{ fontSize: "12px" }} xs={12}>
                <p> {viewProject?.description}</p>
              </Grid>
              <Grid item sx={{ fontSize: "12px" }} xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={6} sm={6} md={6} lg={2}>
                    <span style={{ fontWeight: 600 }}> Language:</span>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={4}>
                    <span>{viewProject?.language} </span>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={2}>
                    <span style={{ fontWeight: 600 }}> Status</span>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={4}>
                    <span>
                      {" "}
                      {viewProject?.status === 0
                        ? " In Process"
                        : viewProject?.status === 1
                        ? "Completed "
                        : " On hold"}
                    </span>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={2}>
                    <span style={{ fontWeight: 600 }}> Team Lead </span>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={4}>
                    <span>{viewProject?.team_lead?.name} </span>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={2}>
                    <span style={{ fontWeight: 600 }}>Team Members</span>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={4}>
                    <span>
                      {" "}
                      {viewProject?.team_members?.map((itr, index) => {
                        return (
                          <Box key={index}>
                            {itr.name}
                            {index < viewProject?.team_members?.length - 1 && (
                              <span>,</span>
                            )}
                          </Box>
                        );
                      })}
                    </span>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={2}>
                    <span style={{ fontWeight: 600 }}> Deadline</span>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={4}>
                    <span>
                      {dateFormat(viewProject?.deadline, "dd/mmm/yyyy")}{" "}
                    </span>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={2}>
                    <span style={{ fontWeight: 600 }}>Payment Status</span>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={2}>
                    <span>{viewProject?.payment_status}</span>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Box sx={{background:'#E2EAF5' , padding:'10px 10px',borderRadius:'10px', marginTop:'10px'}}>
          Projects History
          </Box>
          <CustDataGrid
            data={viewProject?.project_history || []}
            loading={false}
            columns={columns}
            totalPages={0}
          />
        </>
      )}
    </>
  );
};

export default ProjectView;
