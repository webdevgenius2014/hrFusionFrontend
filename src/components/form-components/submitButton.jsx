import React from 'react'
import {Button } from '@mui/material';
const SubmitButton = (props) => {
  return (
    <Button
        type="submit" 
        variant="contained"
        sx={{ mt: 3, mb: 2 ,px:7 ,display:'flex',margin:'8px auto 8px auto' ,boxShadow:'0px 4px 20px 0px #5D87FF8C'}}
        > {props.loading ? <>Loading..</> : <>{props.btnName || 'save'}</>}</Button>
  )
}


export default SubmitButton;