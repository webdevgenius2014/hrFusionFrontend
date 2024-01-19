import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { FormInputText } from "../../components/form-components/formInputText";
import SubmitButton from "../../components/form-components/submitButton";
import { FormSelect } from "../../components/form-components/FormSelect";


const DesignationForm = (props) => {
  const validationSchema = Yup.object().shape({
    designation_name: Yup.string().required("Designation name is required"),
    department_name: Yup.string().required("Designation name is required"),
  })
  const {
    control,
    setError,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm ({ defaultValues: {
    designation_name: props?.showDesignation,
    department_name: props?.showDepartment,},
    resolver: yupResolver(validationSchema),
   
  });
  const newErrors = props?.error;
  useEffect(()=>{
    if(newErrors)
    setError ("designation_name", {
      type: "manual",
      message:newErrors?.message,
    });
  },[newErrors])



  return <>
  <form  noValidate  onSubmit={handleSubmit(props?.apiFun)}>

        <FormInputText
        required
        id="designation_name"
        label="Designation Name"
        defaultValue={props?.showDesignation}
        name="designation_name"
        size="small"
        error={errors && errors?.designation_name}
        control={control}
      />
      {props?.getdep && props?.getdep?.length>0 && 
        <FormSelect 
          name="department_name"
          data={props?.getdep}
          label='Department Name'
          control={control}
          onchange={onchange}
          setValue={setValue}
          fieldaname='department_name'
          def={props?.showDepartment }
          pass_fun={props?.handleChangeDep}
          error={errors && errors?.department_name}   
          required
        />
        
        }

        <SubmitButton loading={props?.loading} btnName={props?.btnName}/>

        </form>
  
  
  
  
  </>;
};
export default DesignationForm;
