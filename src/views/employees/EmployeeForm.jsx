import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FormSelect } from "../../components/form-components/FormSelect";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import validationSchema from "./validation";
import { FormInputText } from "../../components/form-components/formInputText";
import { FormDate } from "../../components/form-components/FormDate";
import { FormInputEmail } from "../../components/form-components/formInputEmail";
import { FormInputPassword } from "../../components/form-components/formInputPassword";
import Button from "@mui/material/Button";

const EmployeesForm = (props)=>{
 useEffect (()=>{
   if(props.serverError){
    Object.keys(props.serverError).forEach((field) => {
      console.log(field);
      if (field != "email")
        setError(field, {
          type: "manual",
          message: props.serverError[field],
        });
      else
        setError("useremail", {
          type: "manual",
          message: props.serverError[field],
        });
    });
  }

  },[props.serverError])

  let showRole=props.showRole;
  const[data,setData]=useState(()=>props.data)
    const {
      formState,
      control,
      setError,
      handleSubmit,  
      setValue,  
      formState: { errors },
    } = useForm({
      resolver: yupResolver(validationSchema),
      defaultValues: {
        first_name: data?.first_name,
        last_name: data?.last_name,
        useremail: data?.email,
        username: data?.username,
        employee_id: data?.employee_id,
        joining_date: data?.joining_date,
        dob: data?.dob,
        phone: data?.phone,
        designation: data?.designation?.id,
        role: showRole,
        department: data?.department?.id,
      },
    });
  // ?console.log(data.departent)
    
    return <>
    <Box sx={{ flexGrow: 1 }}>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(props.apiFunc)}
            sx={{ mt: 1 }}
          >
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6} lg={6}>
                <FormInputText
                  autoComplete="given-name"
                  name="first_name"
                  id="firstName"
                  label="First Name"
                  required
                  fullWidth
                  error={errors && errors?.first_name}
                  control={control}
                  //autoFocus
                  defaultValue={data?.first_name }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormInputText
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="last_name"
                  error={errors && errors?.last_name}
                  control={control}
                  //autoComplete="family-name"
                  defaultValue={data?.last_name }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormInputEmail
                  fullWidth
                  id="username"
                  label="Email Address"
                  name="useremail"
                  required
                  error={errors && errors?.useremail}
                  control={control}
                  size="small"
                  margin="normal"
                  defaultValue={data?.email }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormInputText
                  name="username"
                  control={control}
                  label="username"
                  error={errors && errors?.username}
                  required
                  size="small"
                  autoComplete="email"
                  // size="small"
                  defaultValue={data?.username }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormInputPassword
                  name="password"
                  control={control}
                  label="Password"
                  required
                  size="small"
                  error={errors && errors?.password}
                  // autoComplete="current-password"
                  // size="small"
                  // defaultValue={''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormInputPassword
                  name="confirm_password"
                  control={control}
                  label="confirm_password"
                  size="small"
                  required
                  error={errors && errors?.confirm_password }
                  // autoComplete="current-password"
                  // size="small"
                  // defaultValue={'' }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormInputText
                  required
                  fullWidth
                  id="employee_id"
                  label="employee_id"
                  name="employee_id"
                  size="small"
                  error={errors && errors.employee_id}
                  control={control}
                  defaultValue={data?.employee_id }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <FormInputText
                required
                fullWidth
                id="phone"
                label="Phone Number"
                name="phone"
                size="small"
                type="number"
                error={errors && errors?.phone}
                control={control}
                defaultValue={data?.phone }
              />
            </Grid>
              <Grid item xs={12} sm={6}>
                <FormDate
                  required
                  fullWidth
                  focused
                  // format="yyyy-MM-dd" 
                  type="date"
                  id="joining_date"
                  label="Joining Date"
                  name="joining_date"
                  size="small"
                  setValue={setValue}
                  error={errors && errors.joining_date}
                  control={control}
                  d_value={data?.joining_date}
                  value={data?.joining_date }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormDate
                  required
                  fullWidth
                  focused
                  type="date"
                  id="dob"
                  format="yyyy-MM-dd" 
                  label="Date of Birth"
                  name="dob"
                  size="small"
                  setValue={setValue}
                  error={errors && errors.dob}
                  control={control}
                  d_value={data?.dob}
                  defaultValue={data?.dob }
                />
              </Grid>
             
             
              <Grid item xs={12} sm={6}>
              {props?.getdep && props?.getdep?.length>0 && 
                <FormSelect 
                required
                  name="department"
                  data={props?.getdep}
                  label='Select Department Name'
                  control={control}
                  onchange={onchange}
                  fieldaname='department_name'
                  pass_fun={props?.handleChangeDep}
                  error={errors && errors.department}   
                  def={data?.department?.department_name }
                />
                }
              </Grid>
              <Grid item xs={12} sm={6}>
              {props?.getRole && props?.getRole?.length>0 && 
                <FormSelect 
                required
                  name="role"
                  data={props?.getRole}
                  pass_fun={props?.handleChangeRole}
                  label='Select Role'
                  control={control}
                  fieldaname='role'
                  error={errors && errors?.role}   
                  def={props?.showRole }
                />
                
                }
           
            </Grid>
              <Grid item xs={12} sm={6}>
              {props?.getDesig && props?.getDesig?.length>0 && 
                <FormSelect 
                  name="designation"
                  data={props?.getDesig}
                  pass_fun={props?.handleChangeDesig}
                  label='Select Designation'
                  control={control}
                  fieldaname='designation_name'
                  def={props?.showDesig }
                  error={errors && errors?.designation}   
                  required
                />
                }
           
            </Grid>
            </Grid>
            <Grid container justifyContent="flex-end">
              <Grid item></Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
    </>
}
export default EmployeesForm;