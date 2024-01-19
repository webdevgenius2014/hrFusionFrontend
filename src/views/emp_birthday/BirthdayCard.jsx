import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import {ImagePath} from '../../helperFunctions/ImagePath'
import { useNavigate } from "react-router-dom";

export default function BirthdayCard(props) {
    const data=props.data;
    const navigate = useNavigate();
    function Profile(){
        navigate(`/employees/${data?.id}`);

    }

    console.log(data)
  return (
    <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, maxWidth: 500 }} onClick={Profile}>
    <CardActionArea sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
      <CardMedia
        component="img"
        height="168"    
        image={ImagePath(data?.user_meta?.profile_image)}
        alt={data?.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data?.name}
        </Typography>
        <Typography gutterBottom variant="h6"  component="div">
          {data?.email}
        </Typography>
        <Typography gutterBottom variant="p"  component="div">
           {data?.user_meta?.dob}
    
        </Typography>
        <Typography gutterBottom variant="p"  component="div">
         Phone: {data?.user_meta?.phone
          }
    
        </Typography>
        <Typography variant="" color="text.secondary">
         Designation:{data?.user_meta?.designation?.designation_name}
        </Typography>
        
      </CardContent>
    </CardActionArea>
  </Card>
  );
}
