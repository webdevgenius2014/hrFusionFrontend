import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { FormInputText } from "../../components/form-components/formInputText";
import SubmitButton from "../../components/form-components/submitButton";
import { FormSelect } from "../../components/form-components/FormSelect";
import { FormMultiSelect } from "../../components/form-components/FormMultSelect";

function TaskForm(props) {
  const newErrors = props?.error;
  const [data,setData] =useState(props?.showData);
  console.log(props?.showProj,props?.showEmp )
  const validationSchema = Yup.object().shape({
    designation_name: Yup.string().required("designation name is required"),
    Employees_Name: Yup.string().required("Employee name is required"),
    project_Name: Yup.string().required("project  name is required"),
    title: Yup.string().required("Title is required"),
  });

  const {
    control,
    setError,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Employees_Name: data?.assign_to?.name,
      designation_name: data?.designation?.designation_name,
      project_Name: data?.project?.project_name,
      title: data?.title,
      assign_to: data?.assign_to?.id ,
      project_id: data?.project?.id ,
      designation: data?.designation?.id ,
    },
    resolver: yupResolver(validationSchema),
  });


  useEffect(() => {
    if (newErrors) {
      setError("title", {
        type: "manual",
        message: newErrors?.message,
      });
    }
    // eslint-disable-next-line
  }, [newErrors]);

  return (
    <>
      <form noValidate onSubmit={handleSubmit((data)=>{ console.log(data); props?.apiFun(data)})}>
        {props?.desigList && props?.desigList?.length > 0 && (
          <FormSelect
            name="designation_name"
            data={props?.desigList}
            pass_fun={props?.setSelectedDesig}
            label="Select Designation"
            control={control}
            fieldaname="designation_name"
            def={data?.designation?.designation_name}
            error={errors && errors?.designation_name}
            required
          />
        )}

        {props?.desigList && props?.desigList?.length > 0 && (
          <FormSelect
            name="Employees_Name"
            data={props?.getEmpBydesig}
            pass_fun={props?.setSelectedEmp}
            label="Select Project"
            control={control}
            fieldaname="first_name"
            def={props?.showEmp}
            error={errors && errors?.Employees_Name}
            required
          />
        )}

        {props?.desigList && props?.desigList?.length > 0 && (
          <FormSelect
            name="project_Name"
            data={props?.getprojByEmp}
            pass_fun={props?.setSelectedProj}
            label="Select Project"
            control={control}
            fieldaname="project_name"
            def={props?.showProj}
            error={errors && errors?.project_Name}
            required
          />
        )}

        <FormInputText
          required
          fullWidth
          id="department"
          label="Title"
          name="title"
          size="small"
          defaultValue={data?.title}
          error={errors && errors?.title}
          control={control}
          autoComplete="family-name"
        />
        <SubmitButton loading={props.loading} btnName={props.btnName} />
      </form>
    </>
  );
}

export default TaskForm;
