import React from 'react'
import {Button } from '@mui/material';
const SubmitButton = (props) => {
  return (
    <Button
        type="submit" 
        variant="contained"
        sx={{ mt: 3, mb: 2 ,px:7 ,display:'flex',margin:'8px auto 8px auto'}}
        > {props.loading ? <>Loading..</> : <>{props.btnName}</>}</Button>
  )
}


export default SubmitButton;