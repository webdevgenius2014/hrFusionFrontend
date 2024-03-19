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

const EmployeeView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const url = useLocation();
  let location = url.pathname?.split("/")[1];
  console.log(location);
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
                image={`${apiURL}${viewEmployees?.user_meta?.profile_image} `}
                title="green iguana"
              />
            </Grid>

            <Grid
              item
              xs={8}
              style={{
                display: "flex",
                alignContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Grid item xs={12}>
                <h2 style={{ margin: "auto" }}>
                  {location === "employeesFeedback"
                    ? `${viewEmployees?.user_meta?.first_name} ${viewEmployees?.user_meta?.last_name}`
                    : viewEmployees?.name}
                </h2>
                <span
                  style={{ color: "#0000EE" }}
                  onClick={() =>
                    (window.location = "mailto:yourmail@domain.com")
                  }
                >
                  {location === "employeesFeedback"
                    ? viewEmployees?.user_meta?.email +
                      viewEmployees?.user_meta?.last_name
                    : viewEmployees?.email}
                </span>
              </Grid>

              <Grid container spacing={0} sx={{ paddingTop: "10px" }}>
                <Grid item xs={4}>
                  <span style={{ fontWeight: 600 }}>
                    Mob. {viewEmployees?.user_meta?.phone}{" "}
                  </span>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Box
            sx={{
              background: "#E2EAF5",
              padding: "10px 10px",
              borderRadius: "10px",
              marginTop: "10px",
            }}
          >
            Employee Detail
          </Box>
          <Grid container spacing={0} sx={{ padding: 2 }}>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={2}>
                  <span style={{ fontWeight: 600 }}>User Role :</span>
                </Grid>
                <Grid item xs={4}>
                  <span>{viewEmployees?.user_role?.role}</span>
                </Grid> 
                <Grid item xs={2}>
                  <span style={{ fontWeight: 600 }}>Employee Id :</span>
                </Grid>
                <Grid item xs={4}>
                  <span>{viewEmployees?.user_meta?.employee_id}</span>
                </Grid>
                <Grid item xs={2}>
                  <span style={{ fontWeight: 600 }}> Department :</span>
                </Grid>
                <Grid item xs={4}>
                  <span>
                    {viewEmployees?.user_meta?.department?.department_name}{" "}
                  </span>
                </Grid>
                <Grid item xs={2}>
                  <span style={{ fontWeight: 600 }}> Designation : </span>
                </Grid>
                <Grid item xs={4}>
                  <span>
                    {viewEmployees?.user_meta?.designation?.designation_name}
                  </span>
                </Grid>
                <Grid item xs={2}>
                  <span style={{ fontWeight: 600 }}> Date of Birth :</span>
                </Grid>
                <Grid item xs={4}>
                  <span>
                    {dateFormat(viewEmployees?.user_meta?.dob, "dd/mmm/yyyy")}{" "}
                  </span>
                </Grid>
                <Grid item xs={2}>
                  <span style={{ fontWeight: 600 }}>Joining Date :</span>
                </Grid>
                <Grid item xs={4}>
                  <span>
                    {" "}
                    {dateFormat(
                      viewEmployees?.user_meta?.joining_date,
                      "dd/mmm/yyyy"
                    )}
                  </span>
                </Grid>
                <Grid item xs={2}>
                  <span style={{ fontWeight: 600 }}> Uername :</span>
                </Grid>
                <Grid item xs={4}>
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
            <Grid
              container
              spacing={0}
              sx={{ padding: 2 }}
            >
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
