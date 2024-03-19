import React, { useState,useMemo } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { TemplateView } from "./TemplateView";
import parser from "react-html-parser";
import {useSelector  } from "react-redux";
import {superAdminData} from "../../redux/SuperAdminSlice";

const TemplateCard = (props) => {

    // user role 
    const userData = useSelector(superAdminData);
    const userRole = useMemo(() => userData?.payload?.SuperAdmin?.role?.role, [userData]);
    
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openView, setOpenView] = useState(false);
  const handleOpenView = () => setOpenView(true);
  const handleCloseView = () => setOpenView(false);

  return (
    <>
      <Card
        sx={{ minWidth: 470, maxWidth: 400 }}
        xs={12}
        sm={12}
        md={6}
        variant="outlined"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "auto",
          }}
        >
          {!props.hide && (
            <>
              <Box>
                <h4 style={{ margin: "auto 0 auto 10px", color: "#333" }}>
                  {props?.data?.title}
                </h4>
              </Box>

              <Box>
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  sx={{ justifyContent: "end", margin: "auto" }}
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
                  <MenuItem
                    onClick={() =>
                      props?.handleEditClick(props?.data)
                    }
                  >
                    <EditIcon />
                    Edit
                  </MenuItem>

                  <MenuItem
                    onClick={() => props?.handleDeleteClick(props?.data?.id)}
                  >
                    <DeleteIcon />
                    Delete
                  </MenuItem>
                  <MenuItem onClick={() => handleOpenView()}>
                    <VisibilityIcon />
                    View
                  </MenuItem>
                </Menu>
              </Box>
            </>
          )}
        </Box>
        <Box>
          <CardContent>
            <Typography sx={{ mb: 1.5 }} color="text.primary" fontSize={22}>
              <span> {props?.data?.subject}</span>
            </Typography>
            <Typography variant="span">
              <span>{parser(props?.data?.short_message)}</span>
            </Typography>
          </CardContent>
          {props?.hide && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "right",
                pr: 3,
                mb: 2,
                gap: "10px",
              }}
            >
              <Button
                variant="contained"
                onClick={() => props?.func(props?.data)}
              >
                Preview
              </Button>
              <Button
                variant="contained"
                onClick={() => props?.apiFun({ template_id: props?.data?.id })}
              >
                Send
              </Button>
            </Box>
          )}
        </Box>
      </Card>
      <TemplateView
        data={props?.data}
        open={openView}
        handleClose={handleCloseView}
      />
    </>
  );
};

export default TemplateCard;
