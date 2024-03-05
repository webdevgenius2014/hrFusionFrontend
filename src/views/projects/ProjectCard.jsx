import * as React from "react";
import Card from "@mui/material/Card";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import ProgressBar from "../../components/ProgressBar";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Grid, Box } from "@mui/material/";
import { useNavigate } from "react-router-dom";

export const ProjectCard = (props) => {
  const navigate = useNavigate();
  const data = props?.data;

  const [daysLeft, setDaysLeft] = React.useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  // open menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  // navigate to project view
  const handleNavigate = (id) => {
    navigate(`/Projects/${id}`);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    let date1 = new Date();
    let date2 = new Date(data?.deadline);
    let Difference_In_Time = date2.getTime() - date1.getTime();
    let Difference_In_Days = Math.round(
      Difference_In_Time / (1000 * 3600 * 24)
    );
    setDaysLeft(() => Difference_In_Days);
  }, []);

  return (
    <Card
      columns={{ xs: 4, sm: 8, md: 12 }}
      style={{
        width: "100%",
        maxWidth: "300px",
        padding: "16px",
        position: "relative",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          marginBottom: "10px",
          justifyContent: "space-between",
        }}
      >
        <h4 style={{ margin: "2px", color: "#333" }}>{data.project_name}</h4>
        <Box sx={{ textAlign: "right" }}>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            style={{ marginBottom: "10px" }}
          >
            <MoreHorizIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => props?.handleEditProject(data)}>
              <EditIcon />
              Edit
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleNavigate(data?.id);
              }}
            >
              <VisibilityIcon />
              View
            </MenuItem>
            <MenuItem
              onClick={() => {
                props?.handleDeleteClick(data.id);
              }}
            >
              <DeleteIcon />
              Delete
            </MenuItem>
          </Menu>
        </Box>
      </Box>

      <Box style={{ position: "relative", bottom: 0 }}>
        <ProgressBar />
      </Box>

      <Grid
        container
        spacing={{ xs: 0, md: 0 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{ marginBottom: "10px" }}
      >
        <Grid item xs={2} sm={4} md={6}>
          <strong>Payment Status</strong>
        </Grid>
        <Grid item xs={2} sm={4} md={6}>
          <span>{data?.payment_status}</span>
        </Grid>
        <Grid item xs={2} sm={4} md={6}>
          <strong>Status</strong>
        </Grid>
        <Grid item xs={2} sm={4} md={6}>
          <span>{data?.status}</span>
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <span
          style={{
            background: "#8ab0cd",
            padding: "4px",
            fontSize: "11px",
            borderRadius: "4px",
            fontWeight: "700",
            position: "",
            textAlign: "center",
            bottom: "10px",
            color: "white",
            margin: "auto 0",
          }}
        >
          {daysLeft > 0 ? `${daysLeft} Days left` : "Project Ended"}
        </span>
        <span
          style={{
            padding: "5px",
            borderRadius: "4px",
            color: "white",
            background: "#5d87ff",
          }}
        >
          {data.language}
        </span>
      </Box>
    </Card>
  );
};
