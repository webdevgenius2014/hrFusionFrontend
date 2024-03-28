import React, { useEffect, useState } from "react";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import EmployeServices from "../../services/EmployeServices";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import dateFormat from "dateformat";
import { useLocation } from "react-router-dom";
import { superAdminLogout } from "../../redux/SuperAdminSlice";
import { Box } from "@mui/system";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const EmployeeView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // break points 
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  const url = useLocation();
  let location = url.pathname?.split("/")[1];
  const apiURL = `${process.env.REACT_APP_API_BASE_URL}/`;
  const [viewEmployees, setViewEmployees] = useState({});
  const [feedback, setFeedback] = useState();

  const { id } = useParams();
  const employee_id = id;
  const viewEmployee = () => {
    const payload = { id: employee_id };
    let api;
    if (location === "employeesFeedback")
      api = EmployeServices.viewFeedback(payload);
    else api = EmployeServices.viewEmployee(payload);
    api
      .then((res) => {
        if (res.status === 200) {
          console.log(res?.data?.data);
          // setFeedback(res?.data?.data)
          setViewEmployees(() => res?.data?.data);
        }
        if (res.status === 401) {
          // con9sole.log()
          dispatch(superAdminLogout());
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("client view error", err);
      });
  };

  useEffect(() => {
    viewEmployee();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {viewEmployees && (
        <Box>
          <Grid
            container
            // spacing={2}
            sx={{ paddingY:2,margin:'auto',
             background: "aliceblue" ,fontSize:isSmallScreen ? '11px' :'' }}
          >
            {/* Profile Image */}
            <Grid item xs={12} sm={3}>
              <CardMedia
                sx={{
                  height: 150,
                  width: 150,
                  borderRadius: "50%",
                  textAlign: "center",
                  margin: "auto",
                  border: "1px solid #dee2e6",
                }}
                image={`${apiURL}${viewEmployees?.user_meta?.profile_image}`}
                title="Profile Image"
              />
            </Grid>

            {/* Employee Details */}
            <Grid
              item
              sx={{margin:'auto 0 auto 20px',marginLeft:isMediumScreen ?'25px': "",
              marginTop:isSmallScreen ?'15px': ""}}
              xs={12}
              sm={8}
              container
              direction="column"
              justifyContent="center"
              
            >
              {/* Name and Email */}
              <Grid item xs={12} sx={{textAlign:isSmallScreen ?'center':''}}>
                <h2 style={{margin:'1px'}}>
                  {location === "employeesFeedback"
                    ? `${viewEmployees?.user_meta?.first_name} ${viewEmployees?.user_meta?.last_name}`
                    : viewEmployees?.name}
                </h2>
                <span
                  style={{margin:'1px', color: "#0000EE", cursor: "pointer" }}
                  onClick={() =>
                    (window.location = `mailto:${viewEmployees?.email}`)
                  }
                >
                  {location === "employeesFeedback"
                    ? `${viewEmployees?.user_meta?.email} ${viewEmployees?.user_meta?.last_name}`
                    : viewEmployees?.email}
                </span>
                <p style={{ fontWeight: 600 ,marginTop:'5px'}}>
                  Mob. {viewEmployees?.user_meta?.phone}
                </p>
              </Grid>

             </Grid>
          </Grid>

          <Box
            sx={{
              background: "#E2EAF5",
              padding: "10px 10px",
              borderRadius: "10px",
              marginTop: "10px",
              fontSize:isSmallScreen ? '14px' :''
            }}
          >
            Employee Detail
          </Box>
          <Grid container spacing={0} sx={{ padding: 2 ,fontSize:isSmallScreen ? '11px' :''}}>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={5} sm={4} md={2}>
                  <span style={{ fontWeight: 600 }}>User Role :</span>
                </Grid>
                <Grid item xs={7} sm={8} md={4}>
                  <span>{viewEmployees?.user_role?.role}</span>
                </Grid>
                <Grid item xs={5} sm={4} md={2}>
                  <span style={{ fontWeight: 600 }}>Employee Id :</span>
                </Grid>
                <Grid item xs={7} sm={8} md={4}>
                  <span>{viewEmployees?.user_meta?.employee_id}</span>
                </Grid>
                <Grid item xs={5} sm={4} md={2}>
                  <span style={{ fontWeight: 600 }}> Department :</span>
                </Grid>
                <Grid item xs={7} sm={8} md={4}>
                  <span>
                    {viewEmployees?.user_meta?.department?.department_name}{" "}
                  </span>
                </Grid>
                <Grid item xs={5} sm={4} md={2}>
                  <span style={{ fontWeight: 600 }}> Designation : </span>
                </Grid>
                <Grid item xs={7} sm={8} md={4}>
                  <span>
                    {viewEmployees?.user_meta?.designation?.designation_name}
                  </span>
                </Grid>
                <Grid item xs={5} sm={4} md={2}>
                  <span style={{ fontWeight: 600 }}> Date of Birth :</span>
                </Grid>
                <Grid item xs={7} sm={8} md={4}>
                  <span>
                    {dateFormat(viewEmployees?.user_meta?.dob, "dd/mmm/yyyy")}{" "}
                  </span>
                </Grid>
                <Grid item xs={5} sm={4} md={2}>
                  <span style={{ fontWeight: 600 }}>Joining Date :</span>
                </Grid>
                <Grid item xs={7} sm={8} md={4}>
                  <span>
                    {" "}
                    {dateFormat(
                      viewEmployees?.user_meta?.joining_date,
                      "dd/mmm/yyyy"
                    )}
                  </span>
                </Grid>
                <Grid item xs={5} sm={4} md={2}>
                  <span style={{ fontWeight: 600 }}> Uername :</span>
                </Grid>
                <Grid item xs={7} sm={8} md={4}>
                  <span>{viewEmployees?.user_meta?.username} </span>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {location === "employeesFeedback" && (
            <>
              <Box
                sx={{
                  background: "#E2EAF5",
                  padding: "10px 10px",
                  borderRadius: "10px",
                  marginTop: "10px",
                }}
              >
                Employee Feedback
              </Box>
            </>
          )}
          {location === "employeesFeedback" && (
            <Grid container spacing={0} sx={{ padding: 2 }}>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <span style={{ fontWeight: 400 }}>
                      {viewEmployees?.feedback}{" "}
                    </span>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Box>
      )}
    </>
  );
};

export default EmployeeView;

// <Grid item xs={2}>
// <span style={{ fontWeight: 600 }}> Documents :</span>
// </Grid>
// <Grid item xs={4}>
// <span>
//   {viewEmployees?.user_meta?.documents?.map((itr, index) => {
//     return (
//       <>
//         {" "}
//         <>{itr.filename}</>{" "}
//         {index <
//           viewEmployees?.user_meta?.documents?.length - 1 && (
//           <span>,</span>
//         )}
//       </>
//     );
//   })}{" "}
// </span>
// </Grid>  
