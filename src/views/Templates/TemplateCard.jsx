import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from '@mui/material/Typography';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import parser from "react-html-parser";
import { stateToHTML } from "draft-js-export-html";



 const TemplateCard = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
    

  return (
    <> 
   
  
    <Card sx={{ minWidth: 230 ,maxWidth:400 }}  xs={12} sm={12} md={6}  variant="outlined" >
    <div
    
  >
    <h4 style={{ margin: "auto 0 auto 10px", color: "#333" }}>{props?.data?.title}</h4>
    <div style={{ textAlign: "right" }}>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
            sx={{justifyContent: "end",margin:'auto'}}
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
      <MenuItem onClick={()=>props?.handleEditClick(props?.data?.id,props?.data)}><EditIcon/>Edit</MenuItem>

        <MenuItem onClick={()=>props?.handleDeleteClick(props?.data?.id)}
        >
          <DeleteIcon />
          Delete
        </MenuItem>
      </Menu>
    </div>
  </div>
  <div>
    <CardContent>
      <Typography variant="h5" component="div">
      </Typography>
      <Typography sx={{ mb: 1.5  }} color="text.primary" fontSize={22}>
        {props.data.subject}
      </Typography>
      <Typography variant="body2">
        {parser(props?.data?.message)}
      </Typography>
    </CardContent>
    
    </div>
  </Card>
</>
  )
}

export default TemplateCard