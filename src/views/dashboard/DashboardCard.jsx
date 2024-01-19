import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


 const DashboardCard = (props) => {
   const key = Object.keys(props.data)
   const value = props.data[key]
    
  return (
    <>    <Card sx={{ minWidth: 230 }}  variant="outlined" >
    <CardContent>
      
      <Typography variant="h5" component="div">
       <h4 style={{margin:'auto',display:'flex', justifyContent:'center'}}>{key}</h4>
      </Typography>
      
      <Typography variant="span">
        <h2 style={{margin:'auto',display:'flex', justifyContent:'center'}}>{value}</h2>
      </Typography>
    </CardContent>
   
  </Card>
</>
  )
}

export default DashboardCard