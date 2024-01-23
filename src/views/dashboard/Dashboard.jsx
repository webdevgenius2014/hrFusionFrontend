import React, {useState, useEffect } from 'react'
import Container from "@mui/material/Container";
import BeatLoader from "react-spinners/ClipLoader";
import { DepData,RoleData } from '../../redux/DepRoleSlice';
import DepartmentServices from "../../services/DepartmentServices";
import commonServices  from '../../services/CommonServices'
import DashboardCard from './DashboardCard';
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { superAdminLogout } from "../../redux/SuperAdminSlice";



const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [noRecord, setNoRecord] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // get Dashboard ------------------------------------------------
  const [dashboardData ,setDashboardData] =useState()
  const dashboarData = () => {
    setLoading(true);
    commonServices.dashboard()
    .then((res) => {
      
      if (res.status === 200) {
        setDashboardData(res?.data?.data)
        // console.log(res?.data?.data)
        setLoading(false); 
        if (res.status === 200 && res?.success=== false) {
          setLoading(false); 
         setNoRecord(res.data?.message)
        }
      } 
      if ( res.status === 401){
        console.log("entred 401")
        setLoading(false); 
        dispatch(superAdminLogout());
        navigate("/");
      }
    })
    .catch((err) => {
      console.log("dashboard", err);
    });

  };



  // end Dashboard --------------------------------
  useEffect(() => {    
    dashboarData();
  }, []);



  // redux
  // const dep = useSelector((state) => state.DepRole);
  // console.log("sAdminData",dep)
  // const dispatch = useDispatch();
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
        <p>{noRecord}</p>
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
