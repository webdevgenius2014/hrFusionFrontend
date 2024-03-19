/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from "react";
import Container from "@mui/material/Container";
import commonServices from "../../services/CommonServices";
import DashboardCard from "./DashboardCard";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { superAdminLogout, superAdminData } from "../../redux/SuperAdminSlice";
import Loader from "../../components/Loader";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [noRecord, setNoRecord] = useState("");
  const [greeting, setGreeting] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector(superAdminData);
  const useName = useMemo(() => userData?.payload?.SuperAdmin?.name, [userData]);

  const [dashboardData, setDashboardData] = useState([]);

  const dashboarData = () => {
    setLoading(true);
    commonServices.dashboard()
      .then((res) => {
        if (res.status === 200) {
          setDashboardData(res?.data?.data || []);
          setLoading(false);
          if (res?.success === false) {
            setNoRecord(res.data?.message);
          }
        }
        if (res.status === 401) {
          dispatch(superAdminLogout());
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("dashboard", err);
      });
  };

  const getCurrentTime = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      setGreeting("Good Morning");
    } else if (currentHour >= 12 && currentHour < 17) {
      setGreeting("Good Afternoon");
    } else if (currentHour >= 17 && currentHour < 21) {
      setGreeting("Good Evening");
    } else {
      setGreeting("Good Night");
    }
  };

  useEffect(() => {
    dashboarData();
    getCurrentTime();
  }, []);

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
          <Box sx={{ marginBottom: "10px" }}>
            <Box sx={{ fontWeight: "600", fontSize: "18px" }}>{greeting}, {useName}!</Box>
            <Box sx={{ color: "#BDBDBD", fontWeight: "400", fontSize: "14px" }}>Here's what's happening with your store today.</Box>
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
          {dashboardData.length > 0 ? (
            dashboardData.map((data, index) => (
              <DashboardCard  key={index} data={data}  />
            ))
          ) : loading ? (
            <Loader />
          ) : (
            <p>{noRecord}</p>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Dashboard;
