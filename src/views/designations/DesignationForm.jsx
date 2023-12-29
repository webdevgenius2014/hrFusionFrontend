import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import FormControl from '@mui/material/FormControl';
import * as Yup from "yup";
import { FormInputText } from "../../components/form-components/formInputText";
import Button from "@mui/material/Button";
import { FormSelect } from "../../components/form-components/FormSelect";


const DesignationForm = (props) => {
  const validationSchema = Yup.object().shape({
    designation_name: Yup.string().required("Designation name is required"),
    department_name: Yup.string().required("Designation name is required"),
  })
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm ({ defaultValues: {
    designation_name: props?.showDesignation,
    department_name: props?.showDepartment,},
    resolver: yupResolver(validationSchema),
   
  });
  const newErrors = props?.error;
  useEffect(()=>{
    if(newErrors !== undefined)
    setError ("designation_name", {
      type: "manual",
      message:newErrors?.message
      ,
    });
  },[newErrors])



  return <>
  <form  noValidate  onSubmit={handleSubmit(props?.apiFun)}>

        <FormInputText
        required
        fullWidth4
        id="designation_name"
        label="Designation Name"
        defaultValue={props?.showDesignation}
        name="designation_name"
        size="small"
        error={errors && errors?.designation_name}
        control={control}
      />
      {props?.getdep && props?.getdep?.length>0 && 
        <FormSelect 
          name="department_name"
          data={props?.getdep}
          label='Department Name'
          control={control}
          onchange={onchange}
          fieldaname='department_name'
          def={props?.showDepartment }
          pass_fun={props?.handleChangeDep}
          error={errors && errors?.department_name}   
          required
        />
        
        }

    <Button
    type="submit"
    variant="contained"
    sx={{ marginTop: "13px" }}
  >
    {props?.loading ? <>Loading..</> : <>Submit</>}
  </Button>
        </form>
  
  
  
  
  </>;
};
export default DesignationForm;
