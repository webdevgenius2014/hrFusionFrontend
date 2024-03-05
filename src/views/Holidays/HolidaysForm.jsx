import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { FormInputText } from "../../components/form-components/formInputText";
import SubmitButton from "../../components/form-components/submitButton";
import { FormDate } from "../../components/form-components/FormDate";

const HolidaysForm = (props) => {
  const newErrors = props?.error;
  const validationSchema = Yup.object().shape({
    holiday_name: Yup.string().required("Holiday name is required"),
    holiday_date: Yup.string().required("Holiday date is required"),
  });

  const {
    control,
    setError,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
        holiday_name: props?.data?.holiday_name,
        holiday_date: props?.data?.holiday_date,
    },
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (newErrors) {
      Object.keys(newErrors).forEach((field) => {
          setError(field, {
            type: "manual",
            message: newErrors[field],
          });
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newErrors]);

  return (
    <>
      <form noValidate onSubmit={handleSubmit(props?.apiFun)}>
        <FormInputText
          required
          fullWidth
          id="holidays"
          label="Holiday Name"
          name="holiday_name"
          size="small"
          defaultValue={props?.data?.holiday_name}
          error={errors && errors?.holiday_name}
          control={control}
          autoComplete="family-name"
        />
        <FormDate
                  required
                  fullWidth
                  focused
                  // format="yyyy-MM-dd"
                  type="date"
                  id="holiday_date"
                  label="Holiday Date "
                  name="holiday_date"
                  size="small"
                  setValue={setValue}
                  error={errors && errors?.holiday_date}
                  control={control}
                  d_value={props?.data?.holiday_date}
                  value={props?.data?.deadline || ""}
                />
        <SubmitButton loading={props.loading} btnName={props.btnName} />
      </form>
    </>
  );
};
export default HolidaysForm;
