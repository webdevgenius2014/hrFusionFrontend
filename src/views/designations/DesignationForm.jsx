import React, { useEffect } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FormInputText } from "../../components/form-components/formInputText";
import SubmitButton from "../../components/form-components/submitButton";
import { FormSelect } from "../../components/form-components/FormSelect";

const DesignationForm = (props) => {
  const validationSchema = Yup.object().shape({
    designation_name: Yup.string().required("Designation name is required"),
    department_name: Yup.string().required("Department name is required"),
  });
  const {
    control,
    setError,
    setValue,
    handleSubmit,
    clearErrors ,
    formState: { errors },
  } = useForm({
    defaultValues: {
      designation_name: props?.showDesignation,
      department_name: props?.showDepartment,
    },
    resolver: yupResolver(validationSchema),
  });
  const newErrors = props?.error;
  useEffect(() => {
    if (newErrors !== undefined)
      setError("designation_name", {
        type: "manual",
        message: newErrors?.message,
      })
      else{
        clearErrors("designation_name");
      }
  }, [newErrors]);
 
  return (
    <>
      <form noValidate onSubmit={handleSubmit(props?.apiFun)}>
        <FormInputText
          required
          fullWidth
          id="designation_name"
          label="Designation Name"
          name="designation_name"
          size="small"
          defaultValue={props?.showDesignation}
          error={errors && errors?.designation_name}
          control={control}
          autoComplete="family-name"
        />
        {props?.getdep && props?.getdep?.length > 0 && (
          <FormSelect
            name="department_name"
            data={props?.getdep}
            label="Department Name"
            control={control}
            onchange={onchange}
            setValue={setValue}
            fieldaname="department_name"
            def={props?.showDepartment}
            pass_fun={props?.handleChangeDep}
            error={errors && errors?.department_name}
            required
          />
        )}

        <SubmitButton loading={props?.loading} btnName={props?.btnName} />
      </form>
    </>
  );
};
export default DesignationForm;
