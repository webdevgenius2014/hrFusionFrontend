import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { FormInputText } from "../../../components/form-components/formInputText";
import SubmitButton from "../../../components/form-components/submitButton";

export const DocumentForm = (props) => {
    const newErrors= props?.error;
  useEffect(()=>{
    if (newErrors) {
      Object.keys(newErrors).forEach((field) => {
        // console.log(field, newErrors[field]);
        setError(field, {
          type: "manual",
          message: newErrors[field],
        });  
      });
    }
  },[newErrors])
   
    const validationSchema = Yup.object().shape({
        document_name: Yup.string().required("Document name is required"),
      });

    const {
        control,
        setError,
        setValue,
        handleSubmit,
        formState: { errors },
      } = useForm ({ defaultValues: {
        document_type: props?.document_name,},
        resolver: yupResolver(validationSchema),
       
      });
  return (
    <form noValidate onSubmit={handleSubmit(props?.apiFun)}>
    <FormInputText
      required
      fullWidth
      id="channel_name"
      label="Document Name"
      name="document_name"
      size="small"
      defaultValue={props?.document_name }
      error={errors && errors?.document_name}
      control={control}
      autoComplete="family-name"
    />

    <SubmitButton loading={props?.loading} btnName={props?.btnName || 'save'}/>
  </form>
  )
}
