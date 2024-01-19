import * as React from "react";
import { Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import dateFormat from "dateformat";
import Grid from '@mui/material/Grid';
import FormHelperText from "@mui/material/FormHelperText";
import "react-datepicker/dist/react-datepicker.css";
import "./Date.css";
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
    <Controller
    name={name}
    control={control}
    defaultValue={d_value}
    render={() => (<>
      <Grid container xs={12} sm={12} md={12} lg={12} style={{marginLeft:'5px'}}>
      <Grid item xs={12}  sm={12} md={12} lg={12}>
      <label>{label}</label>
     </Grid>
     <Grid  xs={12}  sm={12} md={12} lg={12}>
      <DatePicker
            className={error?.message ? "error-message " : "wid"}
            error={!!error}
            fullWidth={true}
            helperText={error && `${error.message}`}
            dateFormat="MM/dd/yyyy"
            showTimeSelect={false}
            selected={selectedDate}
            placeholderText={d_value}
            onChange={handleDateChange}
          />
          </Grid>
          </Grid>
        </>)}
      />
      <FormHelperText
        style={{ color: error?.message ? " #f79277" : "inherit" }}
      >
        {error?.message}
      </FormHelperText>
    </>
  );
};
