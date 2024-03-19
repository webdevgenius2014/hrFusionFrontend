import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { Grid, Box } from "@mui/material";
import { FormDate } from "../../components/form-components/FormDate";
import { FormSelect } from "../../components/form-components/FormSelect";
import { FormMultiSelect } from "../../components/form-components/FormMultSelect";
import { FormInputText } from "../../components/form-components/formInputText";
import SubmitButton from "../../components/form-components/submitButton";

const LeavesForm = (props) => {
  const newErrors = props?.error;
  const [data] = useState(props?.projectData);
  const validationSchema = Yup.object().shape({
    subject: Yup.string().required("subject  is required"),
    message: Yup.string().required("message  is required"),
    from_date: Yup.string().required("start  is required"),
    to_date: Yup.string().required("end  is required"),
    notify_to: Yup.array().min(1, "Please select at least one option"),

  });

  const {
    control,
    setError,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      subject: props?.showDepartment,
      message: props?.showDepartment,
    },
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (newErrors) {
      setError("subject", {
        type: "manual",
        message: newErrors?.message,
      });
    }
    // eslint-disable-next-line
  }, [newErrors]);

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
            <Grid item xs={12} sm={12}>
            <FormMultiSelect
              label="Notify To "
              name="notify_to_name"
              options={props?.getRole}
              fieldaname="role" 
              pass_fun={handleEmployeesId}
              def={team_membersView}
              setValue={setValue}
              error={errors && errors?.notify_to_name}
              required
            />
          </Grid>
            <Grid item xs={6} sm={6}>
            <FormDate
              label="Leave From "
              required
              fullWidth
              focused
              // format="yyyy-MM-dd"
              type="date"
              id="from_date"
              name="from_date"
              size="small"
              setValue={setValue}
              error={errors && errors?.from_date}
              control={control}
              d_value={data?.deadline}
              value={data?.deadline || ""}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <FormDate
              label="Leave To "
              required
              fullWidth
              focused
              // format="yyyy-MM-dd"
              type="date"
              id="to_date"
              name="to_date"
              size="small"
              setValue={setValue}
              error={errors && errors?.to_date}
              control={control}
              d_value={data?.deadline}
              value={data?.deadline || ""}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormInputText
              label="Subject"
              required
              fullWidth
              id="subject"
              name="subject"
              size="small"
              focused
              defaultValue={props?.dep_name}
              error={errors && errors?.subject}
              control={control}
              autoComplete="family-name"
            />
          </Grid>
            <Grid item xs={12} sm={12}>
              <FormInputText
                label="Message"
                required
                fullWidth
                id="message"
                name="message"
                size="small"
                focused
                multiline
                rows={3}
                defaultValue={props?.dep_name}
                error={errors && errors?.message}
                control={control}
                autoComplete="family-name"
              />
            </Grid>
           
           

            <SubmitButton loading={props.loading} btnName={props.btnName} />
          </Grid>
        </Box>
      </Box>
    </>
  );
};
export default LeavesForm;
