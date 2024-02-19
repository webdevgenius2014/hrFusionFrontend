import React, { useState, useMemo } from "react";
import { Card, Box } from "@mui/material/";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { department, designations,Employees,Clients, } from "../../components/Svg/AllSvgFiles";
import { hr, team_Managers, team_Leaders ,Projects} from "../../components/Svg/AllSvgFiles";
import { Link } from "react-router-dom";

const DashboardCard = (props) => {
  const key = Object.keys(props.data)[0];
  const value = props.data[key];
  const [link, setLink] = useState("");

  const svgSelector = (key) => {
    if (key.toString() === "Departments") {
      setLink(()=>'/departments')
      return <> {department} </>;
    }
   else if (key.toString() === "Designations") {
    setLink(()=>'/designations')
      return <> {designations} </>;
    }
   else if (key.toString() === "HR") {
    setLink(()=>'/hr')
      return <> {hr} </>;
    }
   else if (key.toString() === "Team Managers") {
    setLink(()=>'/team-managers')
      return <> {team_Managers} </>;
    }
   else if (key.toString() === "Team Leaders") {
    setLink(()=>'/team-leaders')
     return <> {team_Leaders} </>;
    }
   else if (key.toString() === "Employees") {
    setLink(()=>'/employees')
      return <> {Employees} </>;
    }
   else if (key.toString() === "Clients") {
    setLink(()=>'/clients')
      return <> {Clients} </>;
    }
   else if (key.toString() === "Projects") {
    setLink(()=>'/Projects')
      return <> {Projects} </>;
    }
  };
  const svg = useMemo(() => svgSelector(key), [key]);

  return (
    <>
    
      
      <Card sx={{ minWidth: 230, border: "1px solid #DFEAF2" }} variant="outlined">
        <CardContent>
          <Typography variant="div" component="div">
            <h4 style={{ margin: "auto", color: "#647691" }}>{key}</h4>
          </Typography>

          <Typography variant="span">
            <h2 style={{ margin: "auto" }}>{value}</h2>
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <Link style={{ fontSize: "14px", fontWeight: "600", color: "#BDBDBD" }} to={link}>
                {" "}
                See All
              </Link>
            </Box>
            <Box>{svg}</Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default DashboardCard;
