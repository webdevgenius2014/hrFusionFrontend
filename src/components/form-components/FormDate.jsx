import dayjs from "dayjs";
import * as React from "react";
import dateFormat from "dateformat";
import { Controller } from "react-hook-form";
import TextField from '@mui/material/TextField';
import "react-datepicker/dist/react-datepicker.css";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export const FormDate = ({
  name,
  f_type,
  d_value,
  setValue,
  onChange,
  control,
  label,
  required = false,
  focused = false,
  error,
  ...rest
}) => {

  const handleDateChange = (date) => {
   setValue &&  setValue(name, dateFormat(date, "yyyy-mm-dd"), {
      shouldDirty: true,
    });
  };
  let defaultDate='';
  if(d_value !== undefined ||d_value !== null || d_value !== ' '  ){
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
                  // sx={{margin:"0px",padding:"0px"}}
                  onChange={(date) =>{ handleDateChange(date); onChange && onChange(date) }}
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
