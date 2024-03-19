import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material/";
import { useForm } from "react-hook-form";
import { editValidation, addValidation } from "./validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormDate } from "../../components/form-components/FormDate";
import { FormImage } from "../../components/form-components/FormImage";
import SubmitButton from "../../components/form-components/submitButton";
import { FormSelect } from "../../components/form-components/FormSelect";
import { FileUploader } from "../../components/form-components/FormFileupload";
import CommonModal from "../../components/modal/commonModal";
import { FormInputText } from "../../components/form-components/formInputText";
import { FormInputEmail } from "../../components/form-components/formInputEmail";
import { FormInputPassword } from "../../components/form-components/formInputPassword";
import EmpDocView from './EmpDocView'

const EmployeesForm = (props) => {
  const [data] = useState(() => props?.data);
  let showRole = props?.showRole;
  // console.log("emp edit", data);
  const [files, setFiles] = useState(props?.data?.documents || []);
  const [showDesig, setShowDesig] = useState(props?.showDesig);
  console.log(files,"files")
  const [viewDoc, setViewDoc] = useState(false);
  const openDocView = () => {
    setViewDoc(true);
  };
  const closeDocView = () => {
    setViewDoc(false);
  };

  const {
    control,
    setError,
    getValues,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(props.data ? editValidation : addValidation),
    defaultValues: {
      first_name: data?.first_name,
      last_name: data?.last_name,
      useremail: data?.email,
      username: data?.username,
      employee_id: data?.employee_id,
      joining_date: data?.joining_date,
      dob: data?.dob,
      phone: data?.phone,
      designation: data?.designation_id,
      role: showRole,
      department: data?.department_id,
      profile_image: data?.profile_image,
      documents: data?.documents,
      editForm: props?.editForm || false,
    },
  });

  useEffect(() => {
    if (props?.serverError) {
      Object.keys(props.serverError).forEach((field) => {
        console.log(field);
        if (field !== "email")
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props?.serverError]);

  return (
    <>
      <Box sx={{ flexGrow: 1,}}>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit((data) => {
            props.apiFunc(data);
          })}
          sx={{ mt: 1,mx:1 }}
        >
          <Grid container spacing={1}>
            <Grid item xs={12} sm={4} lg={4}>
            
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
                defaultValue={data?.first_name}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormInputText
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="last_name"
                error={errors && errors?.last_name}
                control={control}
                //autoComplete="family-name"
                defaultValue={data?.last_name}
              />
            </Grid>
            <Grid item xs={12} sm={4} >
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
                defaultValue={data?.email}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormInputText
                name="username"
                control={control}
                label="username"
                error={errors && errors?.username}
                required
                size="small"
                autoComplete="email"
                // size="small"
                defaultValue={data?.username}
              />
            </Grid>
            {!props?.data && (
              <>
                <Grid item xs={12} sm={4}>
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
                <Grid item xs={12} sm={4}>
                  <FormInputPassword
                    name="confirm_password"
                    control={control}
                    label="confirm_password"
                    size="small"
                    required
                    error={errors && errors?.confirm_password}
                    // autoComplete="current-password"
                    // size="small"
                    // defaultValue={'' }
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12} sm={4}>
              <FormInputText
                required
                fullWidth
                id="employee_id"
                label="employee_id"
                name="employee_id"
                size="small"
                error={errors && errors?.employee_id}
                control={control}
                defaultValue={data?.employee_id}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
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
                defaultValue={data?.phone}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
            {props?.getdep && props?.getdep?.length > 0 && (
              <FormSelect
                required
                name="department"
                data={props?.getdep}
                label="Select Department Name"
                control={control}
                setShowDesig={setShowDesig}
                onchange={onchange}
                fieldaname="department_name"
                pass_fun={props?.handleChangeDep}
                error={errors && errors?.department}
                def={data?.department?.department_name}
              />
            )}
          </Grid>
            <Grid item xs={12} sm={4}>
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
                error={errors && errors?.joining_date}
                control={control}
                d_value={data?.joining_date}
                value={data?.joining_date}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
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
                error={errors && errors?.dob}
                control={control}
                d_value={data?.dob}
                defaultValue={data?.dob}
              />
            </Grid>
            {data && (
              <>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ marginTop: "7px" }}>
                    <FormInputText
                      fullWidth
                      id="Leaving Reason"
                      label="Leaving Reason"
                      name="leaving_reason"
                      size="small"
                      // error={errors && errors.employee_id}
                      control={control}
                      // defaultValue={data?.employee_id }
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4} style={{margin:0,padding:0}}>
                  <FormDate
                    fullWidth
                    focused
                    type="date"
                    id="leaving_reason"
                    format="yyyy-MM-dd"
                    label="Date of Leaving"
                    name="leaving_date"
                    size="small"
                    setValue={setValue}
                    control={control}
                    // error={errors && errors?.leaving_date}
                    // d_value={data?.leaving_date}
                    // defaultValue={data?.leaving_date }
                  />
                </Grid>
              </>
            )}
           
            <Grid item xs={12} sm={4}>
              {props?.getRole && props?.getRole?.length > 0 && (
                <FormSelect
                  required
                  name="role"
                  data={props?.getRole}
                  pass_fun={props?.handleChangeRole}
                  label="Select Role"
                  control={control}
                  fieldaname="role"
                  error={errors && errors?.role}
                  def={props?.showRole}
                />
              )}
            </Grid>

            <Grid item xs={12} sm={4}>
              {props?.getDesig && props?.getDesig?.length > 0 ? (
                <FormSelect
                  name="designation"
                  data={props?.getDesig}
                  pass_fun={props?.handleChangeDesig}
                  label="Select Designation"
                  control={control}
                  fieldaname="designation_name"
                  def={showDesig}
                  error={errors && errors?.designation}
                  required
                />
              ) : (
                <FormSelect
                  name="designation"
                  data={[]}
                  pass_fun={props?.handleChangeDesig}
                  label="Select Designation"
                  control={control}
                  value={"No Designation"}
                  fieldaname="designation_name"
                  def={showDesig}
                  error={errors && errors?.designation}
                  required
                />
              )}
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormImage
                required
                fullWidth
                focused
                id="profile_image"
                label="Profile Image"
                name="profile_image"
                size="small"
                setValue={setValue}
                setError={setError}
                error={errors && errors.profile_image}
                control={control}
                d_value={data?.profile_image}
                defaultValue={data?.profile_image || ""}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <FileUploader
               files  ={files}
               setFiles={setFiles}
                fileData={data?.files}
                setValue={setValue}
                control={control}
                getValues={getValues}
                getDocType={props?.getDocType}
              />
              {

              }
            </Grid>
          </Grid>
          <Grid container justifyContent="flex-end">
            <Grid item></Grid>
          </Grid>
           <Grid  container >
           {
            files  && files?.map((file, i) =>{ 
              return <Box key={i}>
              <span onClick={openDocView}>
              {file?.filename}
              </span>
              <CommonModal isOpen={viewDoc} isClose={closeDocView}>
              <EmpDocView doc={file}/>
              </CommonModal>
              </Box> 
            })
          }    
           </Grid>   
         
          <SubmitButton loading={props.loading} btnName={props.btnName} />
        </Box>
      </Box>
      
        
    </>
  );
};
export default EmployeesForm;

// <Grid item xs={12} sm={12}>
// <FileUploader
//   onFileChange={handleFileChange}
//   onRemoveFile={handleRemoveFile}
//   sectionIdentifier="files1"
// />
// </Grid>
