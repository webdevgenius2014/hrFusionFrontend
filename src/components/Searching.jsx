import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import dateFormat from "dateformat";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useForm } from "react-hook-form";
import { styled } from "@mui/material/styles";
import TextField from '@mui/material/TextField';
import {FormSelect} from '../components/form-components/FormSelect';
import { FormDate } from "../components/form-components/FormDate";

export const Searching = (props) => {
  const {
    control,
    getValue,
    handleSubmit,
  } = useForm ();
 const [filed , setField]=useState({})
 const [searchFlag , setSearchFlag]=useState(false)
 const [callFunc , setCallFunc]=useState(null)

useEffect(() => {
  
}, [searchFlag]);

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
  handleSubmit((data)=>setField({...filed,data}))
  setCallFunc(()=>debouncedApiCall(data));
}

const handleChangeDate= (date)=>{
   const newDate =dateFormat(date, "yyyy-mm-dd")
  const data= {'leave_date':newDate}
  setCallFunc(()=>debouncedApiCall(data));
  setField({...filed,'leave_date':newDate})
  // console.log(newDate)
}

const debouncedApiCall = debounce(props.apiFun, 2000);
const handleChange = (event) => {
  event.preventDefault();
  const { name, value } = event.target;
  setCallFunc(()=>debouncedApiCall({[name]: value}));
  // setField((prevField) => ({ ...prevField, [name]: value }));

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
         sx={{paddingY: 1,}}
          >
            <Item>
          <TextField id="outlined-basic"  variant="outlined" 
          size="small"
          name={props?.filedName[index]}
          label={i}
          defaultValue={filed[props?.filedName[index]]}
          onChange={handleChange}
          />
            </Item>
          </Grid>
        ))}
        { props?.date ==='true'  &&
          <Grid item xs={12} sm={2} md={3} lg={4} xl={2} style={{margin: '-7px'}}  >
          <FormDate
                required
                fullWidth
                focused
                type="date"
                id="dob"
                onChange={handleChangeDate}
                format="yyyy-MM-dd"
                label="Search By Date"
                name="dob"
                size="small"
                // setValue={setValue}
                // error={errors && errors?.dob}
                control={control}
                d_value={filed?.leave_date}
                // defaultValue={data?.dob}
              />        
          </Grid>

        }  
        {props?.getDesig && props?.getDesig?.length>0 &&(<>
          <Grid item xs={12} sm={2} md={3} lg={4} xl={2} style={{marginTop: '2px',padding:"0px"}}  >
          <Item  >
          <FormSelect 
            name="designation"
            data={props?.getDesig}
            setData={handleChangeDesig}
            label='Select Designation'
            control={control}
            fieldaname='designation_name'
            // def={filed?.designation_name}
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
