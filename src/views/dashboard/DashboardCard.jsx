import React, { useState, useMemo } from "react";
import { Card, Box } from "@mui/material/";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {department,designations,Employees,Clients,} from "../../components/Svg/AllSvgFiles";
import {hr,team_Managers,team_Leaders,Projects,} from "../../components/Svg/AllSvgFiles";
import { Link } from "react-router-dom";

const DashboardCard = (props) => {
  const theme = useTheme();
const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  // get dashboard values and key seprate them
  const key = Object.keys(props.data)[0];
  const value = props.data[key];

  const [link, setLink] = useState("");

  // set svg and link to card
  const svgSelector = (key) => {
    if (key.toString() === "Departments") {
      setLink(() => "/departments");
      return <> {department} </>;
    } else if (key.toString() === "Designations") {
      setLink(() => "/designations");
      return <> {designations} </>;
    } else if (key.toString() === "HR") {
      setLink(() => "/hr");
      return <> {hr} </>;
    } else if (key.toString() === "Team Managers") {
      setLink(() => "/team-managers");
      return <> {team_Managers} </>;
    } else if (key.toString() === "Team Leaders") {
      setLink(() => "/team-leaders");
      return <> {team_Leaders} </>;
    } else if (key.toString() === "Employees") {
      setLink(() => "/employees");
      return <> {Employees} </>;
    } else if (key.toString() === "Clients") {
      setLink(() => "/clients");
      return <> {Clients} </>;
    } else if (key.toString() === "Projects") {
      setLink(() => "/Projects");
      return <> {Projects} </>;
    }
  };

  const svg = useMemo(() => svgSelector(key), [key]);

  return (
    <>
    <Card
     sx={{
      display: 'flex',
      width: isSmallScreen ? "100%" : (isMediumScreen ? "200px" : 275),
      margin:'5px',
      minWidth: isSmallScreen ? 0 : (isMediumScreen ? 0 : 0),
      maxWidth: isSmallScreen ? 340 : (isMediumScreen ? 340 : 400),
  }}
     variant="outlined"
  >
        <CardContent sx={{width:'100%'}}>
          <Typography variant="div" component="div">
            <h4 style={{ margin: "auto", color: "#647691" }}>{key}</h4>
          </Typography>

          <Typography variant="span">
            <h2 style={{ margin: "auto" }}>{value}</h2>
          </Typography>

          <Box sx={{ display: "flex", margin:'auto', justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems:"flex-end" }}>
              <Link
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#BDBDBD",
                }}
                to={link}
              >
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
