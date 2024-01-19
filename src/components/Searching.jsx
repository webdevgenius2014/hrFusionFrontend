import React ,{useState}from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {FormSelect} from '../components/form-components/FormSelect';
import { useForm } from "react-hook-form";

export const Searching = (props) => {
  const {
    control,
    setError,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm ();
const debounce = (func, delay) => {
  let timeoutId;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
};
const handleChangeDesig= (id)=>{
  const data= {'designation':id}
  debouncedApiCall(data);
  console.log(id)
}
const debouncedApiCall = debounce(props.apiFun, 1000);
const handleChange = (event) => {
  const value = {[event.target.name]: event.target.value};
  debouncedApiCall(value);
};
      const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: "transparent",
        boxShadow: "none",
       
      }));      
      
  return (

    <div>
    <Box sx={{background:'white',margin:'0px',marginY:1 ,}} >
      <Grid  container spacing={{ xs: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}
      sx={{ flexGrow: 1 ,justifyContent: 'center',margin: 'auto'}}
      >
        {props?.fieldLable?.map((i, index) => (
          <Grid  spacing={{ xs: 1, md: 1 }} xs={12} sm={2} md={3} lg={2} xl={2} key={index}
          sx={{py:3}}
          >
            <Item>
          <TextField id="outlined-basic"  variant="outlined" 
          size="small"
          name={props?.filedName[index]}
          label={i}
          // value={inputValue}
          onChange={handleChange}
          />
            </Item>
          </Grid>
        ))}

        {props?.getDesig && props?.getDesig?.length>0 &&(<>
          <Grid item xs={12} sm={2} md={3} lg={4} xl={2} style={{margin: 'auto 0px'}}  >
          
          <Item  >
          <FormSelect 
            name="designation"
            data={props?.getDesig}
            pass_fun={handleChangeDesig}
            label='Select Designation'
            control={control}
            fieldaname='designation_name'
            def={props?.showDesig }
            // error={errors && errors?.designation}   
            
          />
          </Item>
          </Grid>
          </>
          )}
      </Grid>
    </Box>
  
    </div>
  )
}
