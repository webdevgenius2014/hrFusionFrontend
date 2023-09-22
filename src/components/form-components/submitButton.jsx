import React from 'react'
import {Button } from '@mui/material';
const SubmitButton = (props) => {
  return (
    <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
    > {props.btnText }</Button>
  )
}

export default SubmitButton;