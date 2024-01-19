import React, {useState, useEffect } from 'react'
import Container from "@mui/material/Container";
import BeatLoader from "react-spinners/ClipLoader";
import { useDispatch } from "react-redux";
import { DepData,RoleData } from '../../redux/DepRoleSlice';
import DepartmentServices from "../../services/DepartmentServices";
import commonServices  from '../../services/CommonServices'
import DashboardCard from './DashboardCard';
import Box from "@mui/material/Box";



const Dashboard = () => {
  const [loading, setLoading] = useState(false);

  // department to  redux
  const getDepartmentfn = () => {
    DepartmentServices.getAllDepartments()
      .then((res) => {
        if (res) {
          // console.log(res.data.data)
          dispatch(DepData(res?.data?.data));
        } 
      })
      .catch((err) => {
        console.log("getdep error", err);
      });
  };
  // get roles ---------------------------------------------------
  const getRoles = () => {
    setLoading(true);
    commonServices.getRole()
    .then((res) => {
      if (res.status === 200) {
        // console.log(res.data.data)
        dispatch(RoleData(res?.data?.data));

        // EmployeServices.getEmployee();
      } else {
      }
    })
    .catch((err) => {
      console.log("get roles", err);
    });

};

  // get Dashboard ------------------------------------------------
  const [dashboardData ,setDashboardData] =useState()
  const Dashboardata = () => {
    setLoading(true);
    commonServices.dashboard()
    .then((res) => {
      if (res.status === 200) {
        setDashboardData(res?.data?.data)
        // console.log(res?.data?.data)
        setLoading(false);
      } else {
        setLoading(false);

        console.log('dashboard data error')
      }
    })
    .catch((err) => {
      console.log("get roles", err);
    });

};



  // end Dashboard --------------------------------
  useEffect(() => {
    getDepartmentfn();
    getRoles();
    Dashboardata();
  }, []);



  // redux
  // const dep = useSelector((state) => state.DepRole);
  // console.log("sAdminData",dep)
  const dispatch = useDispatch();
  //----------------------------------------------------------------
  return (
    <Container style={{ padding: 0 }}>
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
       
      </Box>
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
      {dashboardData && dashboardData?.length > 0 ? (
        dashboardData?.map((i,index) => {
          return (
            <DashboardCard  data={i} key={index}/>
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
        <p>temp</p>
      )}
    </Box>
     {/* {getClients &&
      <div
        style={{ width: "100%", marginTop: "10px", background: "white" }}
      >
        <CustomPagination totalPages={totalPages} setPage={setPage} />
      </div>
      } */}
    </Box>
    </Container>
  );
}
export default Dashboard;
