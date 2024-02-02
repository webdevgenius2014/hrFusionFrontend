import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { FormInputText } from "../../../components/form-components/formInputText";
import SubmitButton from "../../../components/form-components/submitButton";

export const LeadPlatformForm = (props) => {
  const newErrors = props?.error;
  useEffect(() => {
    if (newErrors) {
      Object.keys(newErrors).forEach((field) => {
        // console.log(field, newErrors[field]);
        setError(field, {
          type: "manual",
          message: newErrors[field],
        });  
      });
    }
  }, [newErrors]);

  const validationSchema = Yup.object().shape({
    platform_name: Yup.string().required("Lead platform name is required"),
  });

  const {
    control,
    setError,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      channel_name: props?.platform_name,
    },
    resolver: yupResolver(validationSchema),
  });
  return (
    <form noValidate onSubmit={handleSubmit(props?.apiFun)}>
      <FormInputText
        required
        fullWidth
        id="platform_name"
        label="LeadPlatform Name"
        name="platform_name"
        size="small"
        defaultValue={props?.platform_name}
        error={errors && errors?.platform_name}
        control={control}
        autoComplete="family-name"
      />

      <SubmitButton
        loading={props?.loading}
        btnName={props?.btnName || "save"}
      />
    </form>
  );
};
