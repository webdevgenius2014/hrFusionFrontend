import * as React from "react";
import { Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import dateFormat, { masks } from "dateformat";
import FormHelperText from "@mui/material/FormHelperText";
import "react-datepicker/dist/react-datepicker.css";
export const FormDate = ({
  name,
  f_type,
  d_value,
  setValue,
  control,
  label,
  required = false,
  focused = false,
  error,
  ...rest
}) => {
  const [selectedDate, setSelectedDate] = React.useState();
  const handleDateChange = (date) => {
    setValue(name, dateFormat(date, "yyyy-mm-dd"), {
      shouldDirty: true,
    });
    setSelectedDate(date);
    // console.log("date",date)
  };

  return (
    <>
      <label>{label}</label>
      <Controller
        name={name}
        control={control}
        defaultValue={d_value}
        render={() => (
          <DatePicker
          className={error?.message ? "error-message " :'wid'}
          error={!!error}
          helperText={error && `${error.message}`}
            dateFormat="MM/dd/yyyy"
            showTimeSelect={false}
            selected={selectedDate}
            placeholderText={d_value}
            onChange={handleDateChange}
          />
        )}
      />
      <FormHelperText style={{ color: error?.message ? ' #f79277' : 'inherit' }}>{error?.message}</FormHelperText>

    </>
  );
};
