import React from "react";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";

export const EmployeeView = (props) => {
  const apiURL = `${process.env.REACT_APP_API_BASE_URL}/`;
  const data = props?.data;

  console.log(props.data);
  return (
    <div>
      <Grid
        container
        spacing={2}
        sx={{ paddingBottom: 3, paddingTop: 3, background: "aliceblue" }}
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
            image={`${apiURL}${data?.user_meta?.profile_image} `}
            title="green iguana"
          />
        </Grid>
        <Grid
          item
          xs={8}
          style={{ display: "flex", alignContent: "center", flexWrap: "wrap" }}
        >
          <Grid item xs={12}>
            <h2 style={{ margin: "auto" }}>{data?.name}</h2>
            <span>{data?.email}</span>
          </Grid>
          <Grid container spacing={0} sx={{ paddingTop: "10px" }}>
            <Grid item xs={4}>
              <span style={{ fontWeight: 600 }}>
                Mob. {data?.user_meta?.phone}{" "}
              </span>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
     
     
          <Grid
            container
            spacing={0}
            sx={{ marginTop: "10px", boxShadow: 2, padding: 2 }}
          >
            <Grid item xs={12}>
              <span>
                <h3 style={{ margin: "0" }}><u>Details:-</u></h3>
              </span>
            </Grid>
          
            <Grid item xs={12}>
              <Grid container spacing={1}>
              <Grid item xs={2}>
              <span style={{fontWeight: 600}}>User Role
              </span>
            </Grid>
            <Grid item xs={4}>
             <span>{data?.user_role?.role}</span> 
            </Grid>
            <Grid item xs={2}>
            <span style={{fontWeight: 600}}>Employee Id
            </span>
          </Grid>
          <Grid item xs={4}>
           <span>{data?.user_meta?.employee_id}</span> 
          </Grid>
                <Grid item xs={2}>
                  <span style={{fontWeight: 600}}> Department:</span>
                </Grid>
                <Grid item xs={4}>
                  <span>{data?.user_meta?.department?.department_name} </span>
                </Grid>
                <Grid item xs={2}>
                <span style={{fontWeight: 600}}>  Designation</span>
                </Grid>
                <Grid item xs={4}>
                 <span> {data?.user_meta?.designation?.designation_name}</span>
                </Grid>
                <Grid item xs={2}>
                  <span style={{fontWeight: 600}}> Date of Birth </span>
                </Grid>
                <Grid item xs={4}>
                  <span>{data?.user_meta?.dob} </span>
                </Grid>
                <Grid item xs={2}>
                  <span style={{fontWeight: 600}}>Joining Date</span>
                </Grid>
                <Grid item xs={4}>
                 <span> {data?.user_meta?.joining_date}</span>
                </Grid>
                <Grid item xs={2}>
                  <span style={{fontWeight: 600}}> Uername</span>
                </Grid>
                <Grid item xs={4}>
                  <span>{data?.user_meta?.username} </span>
                </Grid>
               
              </Grid>
            </Grid>
          </Grid>

    </div>
  );
};
