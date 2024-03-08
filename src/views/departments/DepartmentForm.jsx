import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { FormInputText } from "../../components/form-components/formInputText";
import SubmitButton from "../../components/form-components/submitButton";

const DeartmentsForm = (props) => {
  const newErrors = props?.error;
  const validationSchema = Yup.object().shape({
    department_name: Yup.string().required("Department name is required"),
  });

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      department_name: props?.showDepartment,
    },
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if(newErrors){
      setError("department_name", {
        type: "manual",
        message: newErrors?.message,
      });
    }
    // eslint-disable-next-line 
  }, [newErrors]);

  return (
    <>
      <form noValidate onSubmit={handleSubmit(props?.apiFun)}>
        <FormInputText
          required
          fullWidth
          id="department"
          label="Department"
          name="department_name"
          size="small"
          focused
          defaultValue={props?.dep_name}
          error={errors && errors?.department_name}
          control={control}
          autoComplete="family-name"
        />
        <SubmitButton loading={props.loading} btnName={props.btnName} />
      </form>
    </>
  );
};
export default DeartmentsForm;
