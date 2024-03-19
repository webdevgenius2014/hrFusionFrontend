/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { Grid, Box } from "@mui/material";
import { FormSelect } from "../../components/form-components/FormSelect";
import { FormMultiSelect } from "../../components/form-components/FormMultSelect";
import { FormDate } from "../../components/form-components/FormDate";
import { FormInputText } from "../../components/form-components/formInputText";
import SubmitButton from "../../components/form-components/submitButton";

const ProjectForm = (props) => {
  // console.log(props.employeesData)
  const serverErrors = props?.serverError;
  const [data] = useState(props?.projectData);
  const [team_membersView] = useState(
    data?.team_members?.map((i) => {
      return i?.name;
    })
  );
  const [empID, setEmpId] = useState(
    data?.team_members?.map((i) => {
      return i?.id;
    }) || []
  );
  const statusData = [
    { id: 1, value: "completed" },
    { id: 0, value: "In progress" },
    { id: 2, value: "On hold" },
  ];

  const validationSchema = Yup.object().shape({
    client_name: Yup.string().required("Client name is required"),
    cost: Yup.string().required("Lead From Platform is required"),
    deadline: Yup.string().required("Phone number  is required"),
    language: Yup.string().required("Language is required"),
    payment_status: Yup.string().required("Payment status is required"),
    project_name: Yup.string().required("Project name is required"),
    team_lead: Yup.string().required("Team lead is required"),
    team_members: Yup.array().min(1, "Please select at least one option"),
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
      client_id: data?.client?.id,
      cost: data?.cost,
      deadline: data?.deadline,
      language: data?.language,
      payment_status: data?.payment_status,
      team_members: empID,
      description: data?.description,
      team_lead: data?.team_lead?.id,
      project_name: data?.project_name,
      status: data?.status,
    },
    resolver: yupResolver(validationSchema),
  });

  const handleClintId = (id) => {
    setValue("client_id", id || data?.client?.id);
  };

  const handleStatusId = (status) => {
    setValue("status", status || data?.status);
  };

  const handleTeamleadId = (id) => {
    setValue("team_lead", id || data?.team_lead?.id);
  };

  const handlePaymentStatus = (name) => {
    setValue("payment_status", name || data?.payment_status);
  };

  const handleEmployeesId = (id) => {
    let selectedData = empID;
    if (empID.includes(id)) {
      selectedData = selectedData.filter((selected) => selected !== id);
      setValue("team_members", selectedData || team_membersView);
    } else {
      selectedData = [...selectedData, id];
      setValue("team_members", selectedData || team_membersView);
    }
    setEmpId(selectedData);
  };

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
          onSubmit={handleSubmit(props.apiFun)}
          sx={{ mt: 1, mx: 1 }}
        >
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <FormInputText
                label="Project Name"
                required
                fullWidth
                id="project_name"
                name="project_name"
                size="small"
                error={errors && errors?.project_name}
                control={control}
                defaultValue={data?.project_name || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormInputText
                name="cost"
                required
                fullWidth
                type="number"
                id="cost"
                label="Cost "
                size="small"
                error={errors && errors?.cost}
                control={control}
                defaultValue={data?.cost || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ marginTop: "5px" }}>
              <FormInputText
                name="language"
                required
                fullWidth
                id="language"
                label="Language "
                size="small"
                error={errors && errors?.language}
                control={control}
                defaultValue={data?.language || ""}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormMultiSelect
                label="Team Members"
                name="team_members_names"
                options={props?.employeesData}
                fieldaname="name"
                pass_fun={handleEmployeesId}
                def={team_membersView}
                setValue={setValue}
                error={errors && errors?.team_members}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormSelect
                label="Team Lead"
                name={"team_lead_name"}
                fieldaname="name"
                data={props?.getTeamlead}
                control={control}
                onchange={onchange}
                pass_fun={handleTeamleadId}
                // getValue={getValues}
                def={data?.team_lead?.name}
                error={errors && errors?.team_lead}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormSelect
                label="Payment Status"
                name={"payment_status_name"}
                fieldaname="name"
                data={[
                  { id: "pending", name: "Pending" },
                  { id: "completed", name: "Completed" },
                ]}
                control={control}
                onchange={onchange}
                pass_fun={handlePaymentStatus}
                // getValue={getValues}
                def={data?.payment_status}
                error={errors && errors?.payment_status}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormSelect
                label="Status"
                name={"status"}
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
                error={errors && errors?.client_name}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormDate
                label="Deadline "
                required
                fullWidth
                focused
                // format="yyyy-MM-dd"
                type="date"
                id="deadline"
                name="deadline"
                size="small"
                setValue={setValue}
                error={errors && errors?.deadline}
                control={control}
                d_value={data?.deadline}
                value={data?.deadline || ""}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormInputText
                label="Description "
                required
                multiline
                rows={3}
                fullWidth
                id="description"
                name="description"
                size="small"
                error={errors && errors?.description}
                control={control}
                defaultValue={data?.description || ""}
              />
            </Grid>
          </Grid>
          <SubmitButton loading={props?.loading} btnName={props?.btnName} />
        </Box>
      </Box>
    </>
  );
};
export default ProjectForm;
