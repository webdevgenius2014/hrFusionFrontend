import { Controller } from "react-hook-form";
// import DatePicker from "react-datepicker";
import dateFormat from "dateformat";
import Grid from "@mui/material/Grid";
import Helpertext from "@mui/material/FormHelperText";
import "react-datepicker/dist/react-datepicker.css";
import "./Date.css";
import TextField from '@mui/material/TextField';


import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
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
    // console.log(dateFormat(date, "yyyy-mm-dd"));
  };
  let defaultDate='';
  if(d_value !== undefined){
    defaultDate =dayjs(d_value)
  }else
  {
    defaultDate = undefined
  }

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={() => (
          <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={[
                  "DatePicker",
                  "MobileDatePicker",
                  "DesktopDatePicker",
                  "StaticDatePicker",
                ]}
              >
                <DatePicker
                  label={label}
                  onChange={(date) => handleDateChange(date)}
                  size="small"
                  defaultValue={defaultDate ||undefined}
                  renderInput={(params) => <TextField size="small" {...params} />}
                  slotProps={{
                    textField: {
                      size: 'small',
                      error: !!error,
                      helperText: error && `${ error?.message}`
                    },
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </>
        )}
      />
     
    </>
  );
};
