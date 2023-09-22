import React from 'react';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { Box, Typography } from '@mui/material';
import Logo from './Logo';
import hrDashboardStyles from '../styles/styles';
const Brand = props => {
  const classes= hrDashboardStyles();
  return (
    <Stack direction="row" sx={{display:'flex', alignItems:'center', flexGrow:1, paddingLeft: '0.5rem'}} spacing={2}  className={classes.brand} {...props}>      
      <Logo height={26} style={{ width:'auto', height:26 }} />      
      <Link to="/" style={{ textDecoration:'none'}}>        
        <Typography component="h1" variant="h6" className={classes.brand_text}><Box color='red' as='span'>HR</Box> Suite</Typography>
      </Link>      
    </Stack>
  );
};
export default Brand;