import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { FormInputText } from "../../../components/form-components/formInputText";
import SubmitButton from "../../../components/form-components/submitButton";

export const ChannelForm = (props) => {
    const newErrors= props?.error;
    const validationSchema = Yup.object().shape({
        channel_name: Yup.string().required("Channel name is required"),
      });

    const {
        control,
        setError,
        setValue,
        handleSubmit,
        formState: { errors },
      } = useForm ({ defaultValues: {
        channel_name: props?.channel_name,},
        resolver: yupResolver(validationSchema),
      });

      useEffect(()=>{
        if (newErrors) {
          Object.keys(newErrors).forEach((field) => {
            setError(field, {
              type: "manual",
              message: newErrors[field],
            });  
          });
        }
      },[newErrors])
  return (
    <form noValidate onSubmit={handleSubmit(props?.apiFun)}>
    <FormInputText
      required
      fullWidth
      id="channel_name"
      label="Channel Name"
      name="channel_name"
      size="small"
      defaultValue={props?.channel_name }
      error={errors && errors?.channel_name}
      control={control}
      autoComplete="family-name"
    />

    <SubmitButton loading={props?.loading} btnName={props?.btnName || 'save'}/>
  </form>
  )
}
