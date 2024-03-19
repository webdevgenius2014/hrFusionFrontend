import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import { FormSelect } from "../../components/form-components/FormSelect";
import { FormMultiSelect } from "../../components/form-components/FormMultSelect";
import Box from "@mui/material/Box";
import { FormInputEmail } from "../../components/form-components/formInputEmail";
import { FormInputText } from "../../components/form-components/formInputText";
import { FormImage } from "../../components/form-components/FormImage";
import FormHelperText from "@mui/material/FormHelperText";
import SubmitButton from "../../components/form-components/submitButton";


const ClientForm = (props) => {
  const [leadVal, setLeadVal] = React.useState();
  const [data] = useState(props?.clientData);
  const serverErrors = props?.serverError;
  const [inputFields, setInputFields] = useState([]);
  const [inputFieldsData, setInputFieldsData] = useState([]);
  
  // split key and values in arrays 
  const getSocialMedia=()=>{
   let mediaFields=[];
   let mediaValues=[];
  data?.social_links?.map((i)=>{
    mediaFields=[...mediaFields,...Object.keys(i)];
    mediaValues=[...mediaValues,...Object.values(i)];
  })
  setInputFields(()=>mediaFields)
  setInputFieldsData(()=>mediaValues)
 }


// console.log(inputFields)
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(" Name is required"),
    communication_channel: Yup.array().min(
      1,
      "Please select at least one option"
    ),
    useremail: Yup.string().required("Email name is required"),
    lead_from_platform: Yup.string().required("Lead From Platform is required"),
    phone: Yup.string().required("Phone number  is required"),
    profile_image: Yup.mixed()
    .required("Required")
    


   });
  const {
    control,
    setError,
    setValue,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: data?.name,
      communication_channel: data?.communication_channel,
      useremail: data?.email,
      lead_from_platform: data?.lead_from_platform,
      phone: data?.phone,
      profile_image: data?.profile_image,
      project_id: data?.project_id,
      
    },
    resolver: yupResolver(validationSchema),
    
  });

  const leadValFn = (data) => {
    setLeadVal(() => data);
  };


  const addInputField = () => {
    setInputFields([...inputFields, '']);  
  };
  const handleInputChange = (index, value) => {
    const updatedInputFields = [...inputFields];
    updatedInputFields[index] = value;
    setInputFields(updatedInputFields);
    
  };
  const handleDatafield = (index, value) => {
    const inputFieldsDataAry = [...inputFieldsData];
    inputFieldsDataAry[index] = value;
    setInputFieldsData(inputFieldsDataAry);
  };
  const handleDeleteField = (index) => {
    const inputFieldsDataAry = [...inputFieldsData];
    const updatedInputFields = [...inputFields];   
    inputFieldsDataAry.splice(index, 1);
    setInputFields(updatedInputFields);
    updatedInputFields.splice(index, 1);   
    setInputFieldsData(inputFieldsDataAry);  
  };
// conbine link and platform name as key and value pair
// call api in this function 
  const combine =(data) => {
  const socialMedia = inputFields?.map((key, index) => (  
    {[key]: inputFieldsData[index]}
    ));
    let flag;
  setValue('social_links',socialMedia);
    if(socialMedia.length === 0)
      flag=false;
  
  if(socialMedia.length !==0) {
    socialMedia.map((key, index) =>{
    Object.keys(key).map((k, index) =>{
      let url= Object.values(key)[0]
      console.log(url)
      if(k===''|| url=== '')
       return flag=true;
      else 
       flag=false;
    })
  })
     if(flag=== true){
      setError('social_links', {
        type: "manual",
        message:'fill all social links',
      });
     }
    
  }
   if(flag===false)
  props.apiFunc(data ,socialMedia)
    flag =null;
}

useEffect(() => {
  if (serverErrors) {
    Object.keys(serverErrors).forEach((field) => {
      if (field !== "email")
        setError(field, {
          type: "manual",
          message: serverErrors[field],
        });
      else
        setError("useremail", {
          type: "manual",
          message: serverErrors[field],
        });
    });
  }
}, [serverErrors]);

useEffect(()=>{
  getSocialMedia();
},[])

  return (
    <>
     <Box sx={{ flexGrow: 1, }}>
    <Box
    component="form"
    noValidate
    onSubmit={handleSubmit((data)=>{combine(data); })}
        sx={{ mt: 1,mx:1 }}
      >
        <Grid container spacing={1}>
            <Grid  xs={12} sm={6} sx={{mt:1,pl:1}} >
              <FormInputText
                autoComplete="given-name"
                name="name"
                id="Name"
                label="Name"
                required
                fullWidth
                error={errors && errors?.name}
                control={control}
                //autoFocus
                defaultValue={data?.name || ""}
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
                defaultValue={data?.email || ""}
              />
            </Grid>
          
            <Grid item xs={12} sm={6}>
              <FormMultiSelect
                name="communication_channel"
                data={data?.communication_channel}
                label="Communication Channel"
                control={control}
                onchange={onchange}
                options={props?.getAddChannel}
                fieldaname="channel_name"
                def={data?.communication_channel}
                getValues={getValues}
                setValue={setValue}
                error={errors && errors?.communication_channel}
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormSelect
                name="lead_from_platform"
                data={props?.getAllLeads}
                label="Lead From Platform"
                control={control}
                onchange={onchange}
                pass_fun={props?.handleLeadPlat}
                fieldaname="platform_name"
                getValue={getValues}
                def={data?.lead_from_platform}
                error={errors && errors?.lead_from_platform}
                required
              />
              {leadVal && leadVal === "other" && (
                <>
                  <FormInputText
                    fullWidth
                    id="lead_from_platform"
                    label="Lead From Platform"
                    name="lead_from_platform"
                    size="small"
                    error={errors && errors?.lead_from_platform}
                    control={control}
                    defaultValue={data?.lead_from_platform}
                  />
                </>
              )}
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
              defaultValue={data?.phone || ""}
            />
          </Grid>
            <Grid item xs={12} sm={6}>
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
                getValues={getValues}
                error={errors && errors.profile_image}
                control={control}
                d_value={data?.profile_image}
                defaultValue={data?.profile_image || ""}
              />
              </Grid>
              <Grid item xs={12} mt={2} sm={12}>
              <Button variant="contained" onClick={addInputField}>Add Social Media</Button> 
                </Grid>
                  <Grid  container spacing={0}  >
                <div  style={{width:'100%',}}>
                {inputFields?.map((ivalue, index) =>{
                  return(
                    <div key={index} style={{display:'flex',gap:'5px', margin:'10px'}}>
                    <TextField id="outlined-basic" size='small' name={ivalue} defaultValue={ivalue} value={ivalue}  label='Platform Name' variant="outlined" fullWidth
                    onChange={(e) => handleInputChange(index, e.target.value)}/>
                    
                    <TextField id="outlined-basic" size='small' name={inputFieldsData[index]} defaultValue={inputFieldsData[index]} label='Url of your Profile'  variant="outlined" fullWidth
                    onChange={(e) => handleDatafield(index, e.target.value)}/>
                    <Button variant="contained"  onClick={() => handleDeleteField(index)}>Delete</Button>
                    </div>
  
                  )}
                )}
              </div>
              {errors?.social_links &&  <FormHelperText style={{ marginLeft:'15px', color: errors?.social_links?.message ? "#f79277" : "" }}>
              {errors?.social_links?.message}
            </FormHelperText>}
              </Grid>
              </Grid>
              
              <SubmitButton loading={props?.loading} btnName={props?.btnName}/>

              </Box>
              </Box>
            </>
            );
          };
export default ClientForm;
