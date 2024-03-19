import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { FormInputText } from "../../components/form-components/formInputText";
import { FormMultiSelect } from "../../components/form-components/FormMultSelect";
import SubmitButton from "../../components/form-components/submitButton";
import { Box, Grid } from "@mui/material/";

function ConcernForm(props) {
  const newErrors = props?.error;
  const data = props?.selectedConcern;
  console.log(data)
  const validationSchema = Yup.object().shape({
    concern_title: Yup.string().required("Concern Title  is required"),
    message: Yup.string().required("Message is required"),
    notify_to: Yup.array().min(1, "Please select at least one option"),
  });

  const [team_membersView] = useState(
    // data?.team_members?.map((i) => {
    //   return i?.name;
    // })
  );
  const [empID, setEmpId] = useState(
    // data?.team_members?.map((i) => {
    //   return i?.id;
    // }) ||
     []
  );
  console.log(empID)

  const handleEmployeesId = (id) => {
    let selectedData = empID;
    if (empID.includes(id)) {
      selectedData = selectedData.filter((selected) => selected !== id);
      setValue("notify_to", selectedData || team_membersView);
    } else {
      selectedData = [...selectedData, id];
      setValue("notify_to", selectedData || team_membersView);
    }
    setEmpId(selectedData);
  };

  const {
    control,
    setError,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      concern_title: props?.showDepartment,
      message: props?.showDepartment,
      notify_to: props?.showDepartment,
    },
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (newErrors) {
      setError("message", {
        type: "manual",
        message: newErrors?.message,
      });
    }
    // eslint-disable-next-line
  }, [newErrors]);

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
            <Grid item xs={12} sm={12} lg={12}>
              {props?.getRole && props?.getRole?.length > 0 && (
                <FormMultiSelect
                name="notify_to_name"
                label="Notify To"
                options={props?.getRole}
                fieldaname="role"
                pass_fun={handleEmployeesId}
                // def={team_membersView}
                setValue={setValue}
                error={errors && errors?.notify_to}
                required
              />
              )}
            </Grid>
            <Grid item xs={12} sm={12} lg={12}>
              <FormInputText
                required
                fullWidth
                id="department"
                label="Concern Title"
                name="concern_title"
                size="small"
                focused
                defaultValue={data?.concern_title}
                error={errors && errors?.concern_title}
                control={control}
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12} sm={12} lg={12}>
              <FormInputText
                required
                fullWidth
                id="department"
                label="Message"
                name="message"
                size="small"
                focused
                multiline
                rows={3}
                defaultValue={data?.message}
                error={errors && errors?.message}
                control={control}
                autoComplete="family-name"
              />
            </Grid>
            <SubmitButton loading={props.loading} btnName={props?.btnName} />
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default ConcernForm;
