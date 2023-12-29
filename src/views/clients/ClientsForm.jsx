import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import Grid from "@mui/material/Grid";
import { FormSelect } from "../../components/form-components/FormSelect";
import { FormMultiSelect } from "../../components/form-components/FormMultSelect";
import Box from "@mui/material/Box";
import { FormInputEmail } from "../../components/form-components/formInputEmail";
import { FormInputText } from "../../components/form-components/formInputText";
import Button from "@mui/material/Button";
import { FormImage } from "../../components/form-components/FormImage";

const ClientForm = (props) => {
  const [leadVal, setLeadVal] = React.useState();
  const [data, setData] = useState(props?.clientData);
  const serverErrors = props?.serverError;
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(" Name is required"),
    communication_channel: Yup.array()
      .min(1, "Please select at least one option")
      .required(" Communication channel is required"),
    communication_channel: Yup.array().min(
      1,
      "Please select at least one option"
    ),
    useremail: Yup.string().required("Email name is required"),
    lead_from_platform: Yup.string().required("Lead From Platform is required"),
    phone: Yup.string().required("Phone number  is required"),
    profile_image: Yup.string().required("Profile Image is required"),
  });
  const {
    control,
    setError,
    setValue,
    handleSubmit,
    reset,
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
  useEffect(() => {
    if (serverErrors) {
      Object.keys(serverErrors).forEach((field) => {
        console.log(field);
        if (field != "email")
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

  const commChnlOp = [
    { value: "Email" },
    { value: "Whatsapp" },
    { value: "SMS" },
    { value: "slack" },
    { value: "other" },
  ];

  const commChnlOpt = [
    { value: "Email" },
    { value: "Whatsapp" },
    { value: "SMS" },
    { value: "slack" },
  ];
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(props.apiFunc)}
          sx={{ mt: 1 }}
        >
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
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
              <FormMultiSelect
                name="communication_channel"
                data={data?.communication_channel}
                label="Communication Channel"
                control={control}
                onchange={onchange}
                options={commChnlOpt}
                fieldaname="communication_channel"
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
                data={commChnlOp}
                label="Lead From Platform"
                control={control}
                onchange={onchange}
                leadValFn={leadValFn}
                pass_fun={props?.handleLeadPlat}
                fieldaname="value"
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
              <FormImage
                required
                fullWidth
                focused
                id="profile_image"
                label="Profile Image"
                name="profile_image"
                size="small"
                setValue={setValue}
                error={errors && errors.profile_image}
                control={control}
                d_value={data?.profile_image}
                defaultValue={data?.profile_image || ""}
              />
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
  );
};
export default ClientForm;
