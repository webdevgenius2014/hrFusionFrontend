import * as Yup from "yup";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import SubmitButton from "../../components/form-components/submitButton";
import { FormSelect } from "../../components/form-components/FormSelect";
import { FormInputText } from "../../components/form-components/formInputText";

function EmpFeedForm(props) {
  const serverErrors = props?.serverError;
  const [data] = useState(props?.projectData);

  const validationSchema = Yup.object().shape({
    user_id: Yup.string().required(" Employee name is required"),
    feedback: Yup.string().required(" Feedback  is required"),
  });

  const {
    control,
    setError,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      //   department_name: props?.showDepartment,
    },
    resolver: yupResolver(validationSchema),
  });
  const dataa = (data) => {
    console.log(data);
  };
  return (
    <Box sx={{ flexGrow: 1,pr:1 }}>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(props?.apiFun)}
        sx={{ mt: 1, mx: 1 }}
      >
        <Grid container spacing={1}>
        <Grid item xs={12} sm={12} lg={12}>
        {props?.allEmployees && props?.allEmployees?.length > 0 && (
          <FormSelect
            name="user_id"
            data={props?.allEmployees}
            label="Employee Name"
            control={control}
            onchange={onchange}
            setValue={setValue}
            fieldaname="name"
            def={props?.allEmployees?.name}
            pass_fun={props?.handleChangeEmp}
            error={errors && errors?.user_id}
            required
          />
        )}
        </Grid>
        <Grid item xs={12} sm={12} lg={12}>
          <FormInputText
            required
            fullWidth
            id="id"
            multiline
            rows={3}
            label="Feedback Name"
            name="feedback"
            size="small"
            defaultValue={props?.data?.feedback}
            error={errors && errors?.feedback}
            control={control}
            autoComplete="family-name"
          />
          </Grid>
          <SubmitButton loading={props?.loading} btnName={props?.btnName} />
        </Grid>
      </Box>
    </Box>
  );
}

export default EmpFeedForm;
