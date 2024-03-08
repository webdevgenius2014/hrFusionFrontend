import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import BeatLoader from "react-spinners/ClipLoader";
import commonServices from "../../services/CommonServices";
import DashboardCard from "./DashboardCard";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector  } from "react-redux";
import { superAdminLogout ,superAdminData} from "../../redux/SuperAdminSlice";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [noRecord, setNoRecord] = useState();
  const [greeting, setGreeting] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector(superAdminData);
  const [useName]=useState(userData?.payload?.SuperAdmin?.name)
  // get Dashboard ------------------------------------------------
  const [dashboardData, setDashboardData] = useState();
  // dashboard api
  const dashboarData = () => {
    setLoading(true);
    commonServices.dashboard()
      .then((res) => {
        if (res.status === 200) {
          setDashboardData(res?.data?.data);
          setLoading(false);
          if (res.status === 200 && res?.success === false) {
            setLoading(false);
            setNoRecord(res.data?.message);
          }
        }
        if (res.status === 401) {
          setLoading(false);
          dispatch(superAdminLogout());
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("dashboard", err);
      });
  }
// date and time 
  const getCurrentTime = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      setGreeting('Good Morning');
    } else if (currentHour >= 12 && currentHour < 17) {
      setGreeting('Good Afternoon');
    } else if (currentHour >= 17 && currentHour < 21) {
      setGreeting('Good Evening');
    } else {
      setGreeting('Good Night');
    }
  };
  
  useEffect(() => {
    dashboarData();
    getCurrentTime();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <Box sx={{marginBottom:'10px'}}>
            <Box sx={{fontWeight:'600',fontSize:'18px',}}>{greeting}, {useName}!</Box>
            <Box sx={{color:'#BDBDBD',fontWeight:'400',fontSize:'14px',}}>Here's what's happening with your store today.</Box>
          </Box>
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
            dashboardData?.map((i, index) => {
              return <DashboardCard data={i} key={index} />;
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
      </Box>
    </Container>
  );
};
export default Dashboard;
