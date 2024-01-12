import React from 'react'
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
export const Footer = (props) => {
    return (
        <Typography variant="body2" color="text.secondary"  sx={{ mt: '25px' }}  align="center" {...props}>
          {'Copyright © '}
          <Link color="inherit" href="/">
            HRSuite
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
    );
}
