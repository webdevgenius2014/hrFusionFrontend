import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import {ImagePath}  from '../../helperFunctions/ImagePath'


export const ClientsCard = (props) => {
  const navigate = useNavigate();
    const [data]=React.useState(props?.data)

    
    const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
 
  const handleNavigate = (id) => {
    navigate(`/clients/${id}`);
  };
  return (
    <Card sx={{ minWidth: '230px',maxWidth:'330px', borderRadius:3}} >
    <div style={{position:'relative',textAlign:'right' ,top:'5px'}}>
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
       <MoreVertIcon/>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={()=>props?.handleEditClient(data?.id,data)}><EditIcon/>Edit</MenuItem>
        <MenuItem onClick={()=>{props?.handleDeleteClick(data?.id)}}> <DeleteIcon/>Delete</MenuItem>
      </Menu>
    </div>
   </div>
      <CardMedia
        sx={{ height: 100, width:100, borderRadius:'50%',textAlign:'center',margin:'auto', border: '1px solid #dee2e6'}}
        image={ImagePath(data.profile_image)}
        title="green iguana"
      />
      <CardContent>
     
        <Typography  variant="h6" component="div" style={{textAlign:'center' ,fontWeight:'bold',fontSize:'17px'}}>
          {data.name}  
        </Typography>
        <Typography  component="div" style={{textAlign:'center',fontSize:'13px'}}>
        {data.email}
        </Typography>
        <Typography gutterBottom variant="h5" component="div" style={{textAlign:'center',gap:'5px',}}>
        <Button  style={{margin: '5px 0px',fontSize:'12px' }} onClick={()=>{handleNavigate(data.id)}} variant="contained">Profile</Button><br/>
        <Button  style={{fontSize:'12px'}} variant="contained">Message</Button>

        </Typography>
      </CardContent>
      <CardActions >
      <div style={{width: '50%',
        borderRight: '1px solid',
        textAlign:'center',
    }}>
      <label >Project</label>
      <h4 style={{margin:'2px'}}>{data && data?.projects?.length>0 ? (data.projects.length) : '0'}</h4>
      </div>
      <div style={{width: '50%',
      textAlign:'center'}}>
      <label>Deal</label>
      <h4 style={{margin:'2px'}}>Amount</h4>
      </div>
       

       </CardActions>
    </Card>
  )
}
