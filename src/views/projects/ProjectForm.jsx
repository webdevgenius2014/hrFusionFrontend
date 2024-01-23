import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import Grid from "@mui/material/Grid";
import { FormSelect } from "../../components/form-components/FormSelect";
import { FormMultiSelect } from "../../components/form-components/FormMultSelect";
import Box from "@mui/material/Box";
import { FormDate } from "../../components/form-components/FormDate";
import { FormInputText } from "../../components/form-components/formInputText";
import SubmitButton from "../../components/form-components/submitButton";

const ProjectForm = (props) => {
  const [data, setData] = useState(props?.projectData);
  const statusData=[{id:1,value:'completed'},{id:0,value:'inProgress'},{id:2,value:`pending`}]
  const serverErrors = props?.serverError;
  // console.log(data)
  const validationSchema = Yup.object().shape({
    client_id: Yup.string().required("Client name is required"),
    cost: Yup.string().required("Lead From Platform is required"),
    deadline: Yup.string().required("Phone number  is required"),
    language: Yup.string().required("Language is required"),
    payment_status: Yup.string().required("Payment status is required"),
    project_name: Yup.string().required("Project name is required"),
    team_lead: Yup.string().required("Team lead is required"),
    team_members: Yup.array().min(
        1,
        "Please select at least one option"
      ),

      status: Yup.string().required("Status is required"),
    description: Yup.string().required("Description is required"),
  });
  const {
    control,
    setError,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
        client_name: data?.client?.name,
        cost: data?.cost,
        deadline: data?.deadline,
        language: data?.language,
        payment_status: data?.payment_status,
        team_members: data?.team_members,
        description: data?.description,
        team_lead: data?.team_lead,
        project_name: data?.project_name,
        status:data?.status,
    },
    resolver: yupResolver(validationSchema),
  });
   const handleClintId =(id) => {
    // console.log(id)
      setValue('client_id',id)
   }
   const handleStatusId =(id) => {
  //  console.log(id)
   setValue('status',id)
   }
   const handlePaymentStatus =(name) => {
   console.log(name)
   setValue('payment_status',name)
   }
   const [empID,setEmpId]= useState([])
   const handleEmployeesId =(id) => {
    let selectedData = empID;
    // console.log(empID)
    if (empID.includes(id)) {
      selectedData = selectedData.filter((selected) => selected !== id)
      setValue('team_members', selectedData)

      // setEmpId(()=>empID.filter((selected) => selected !== id));
    } else {
      selectedData = [...selectedData, id]
      // setEmpId([...empID, id]);
      setValue('team_members', selectedData)
    }
    setEmpId(selectedData)
  }
    


   
  useEffect(() => {
    if (serverErrors) {
      Object.keys(serverErrors).forEach((field) => {
        console.log(field);
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

  
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit((data)=>{console.log(data)})}
          sx={{ mt: 1 }}
        >
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <FormInputText
                required
                fullWidth
                id="project_name"
                label="Project Name"
                name="project_name"
                size="small"
                error={errors && errors?.project_name}
                control={control}
                defaultValue={data?.project_name || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormInputText
                required
                fullWidth
                id="description"
                label="Description "
                name="description"
                size="small"
                error={errors && errors?.description}
                control={control}
                defaultValue={data?.description || ""}
              />
            </Grid>
          
          
            <Grid item xs={12} sm={6}>
              <FormInputText
                required
                fullWidth
                id="team_lead"
                label="Team Lead "
                name="team_lead"
                size="small"
                error={errors && errors?.team_lead}
                control={control}
                defaultValue={data?.team_lead || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormInputText
                required
                fullWidth
                id="language"
                label="Language "
                name="language"
                size="small"
                error={errors && errors?.language}
                control={control}
                defaultValue={data?.language || ""}
              />
            </Grid>

         
            <Grid item xs={12} sm={6}>
              <FormSelect
                label="Client Name"
                name={"client_name"}
                fieldaname="name"
                data={props?.clientsData}
                control={control}
                onchange={onchange}
                pass_fun={handleClintId}
                // getValue={getValues}
                def={data?.client?.name}
                error={errors && errors?.client_id}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <FormMultiSelect
              name="team_members_names"
              data={data?.team_members}
              label="Team Members"
              options={props?.employeesData}
              fieldaname="name"
              pass_fun={handleEmployeesId}
              def={data?.team_members}
              setValue={setValue}
              error={errors && errors?.team_members}
              required
            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <FormInputText
                          required
                          fullWidth
                          id="cost"
                          label="Cost "
                          name="cost"
                          size="small"
                          error={errors && errors?.cost}
                          control={control}
                          defaultValue={data?.cost || ""}
                        />
                      </Grid>
            <Grid item xs={12} sm={6}>
            <FormSelect
            label="Payment Status"
            name={"payment_status_name"}
            fieldaname="name"
            data={[{id:'pending',name:'Pending'},{name:'Completed',name:'completed'}]}
            control={control}
            onchange={onchange}
            pass_fun={handlePaymentStatus}
            // getValue={getValues}
            def={data?.payment_status}
            error={errors && errors?.payment_status}
            required
          />          
            </Grid>
          
            <Grid item xs={12} sm={6} sx={{marginTop:'18px'}}>
            <FormSelect
            label="Status"
            name={"statusValue"}
            fieldaname="value"
            data={statusData}
            control={control}
            onchange={onchange}
            pass_fun={handleStatusId}
            // getValue={getValues}
            def={data?.status}
            error={errors && errors?.status}
            required
          />          
            </Grid>
         
            
            <Grid item xs={12} sm={6}>
              <FormDate
                required
                fullWidth
                focused
                // format="yyyy-MM-dd"
                type="date"
                id="deadline"
                label="Deadline "
                name="deadline"
                size="small"
                setValue={setValue}
                error={errors && errors?.deadline}
                control={control}
                d_value={data?.deadline}
                value={data?.deadline || ""}
              />
            </Grid>
          </Grid>
          <SubmitButton loading={props.loading} btnName={props.btnName}/>

        </Box>
      </Box>
    </>
  );
};
export default ProjectForm;
