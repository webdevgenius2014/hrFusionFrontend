import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import SearchIcon from '@mui/icons-material/Search';
import {FormInputText} from '../components/form-components/formInputText'
import {FormSelect} from '../components/form-components/FormSelect';
import { useForm } from "react-hook-form";
export const Searching = (props) => {
    const {
        control,
        setError,
        setValue,
        handleSubmit,
        getValues,
        formState: { errors },
      } = useForm();

      const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: "transparent",
        boxShadow: "none",
      }));      
  return (

    <div>
    <Grid container >
    <form onSubmit={handleSubmit(props?.apiFun)}>
    <p style={{margin:'0px'}}>Please enter any one field</p>
    {props?.fieldLable?.map((i,index)=>{
      let errorData= props?.filedName[index]
      return <><grid   xs={12} style={{margin:'auto'}} key={index} >
      <FormInputText
               autoComplete="given-name"
               name={props?.filedName[index]}
               id="Name"
               label={i}
               
               fullWidth
               error={errors && errors[errorData]}
               control={control}
               //autoFocus
               // defaultValue={data?.name || ""}
             />
             </grid>
     </>
    })}  
      <grid  xs={12} style={{margin:'auto'}}>
      {props?.getDesig && props?.getDesig?.length>0 &&(<>
        <FormSelect 
          name="designation"
          data={props?.getDesig}
          pass_fun={props?.handleChangeDesig}
          label='Select Designation'
          control={control}
          fieldaname='designation_name'
          def={props?.showDesig }
          error={errors && errors?.designation}   
          
        /></>)}
      </grid>
      <grid  xs={3} style={{ margin: ' auto'}}>
      <Item align="center">
      <Button sx={{ marginTop: '10px'}}
            startIcon={<SearchIcon />
          }
          type="submit"
            variant="contained"  
          > 
            Search
          </Button>

        </Item>
      </grid>
      </form>
      </Grid>
    </div>
  )
}
