import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { Controller } from "react-hook-form";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from '@mui/material/FormControl';

import { FormInputText } from "../../components/form-components/formInputText";

export const FormSelect = ({
  name,
  control,
  label,
  pass_fun,
  def,
  leadValFn,
  required = false,
  focused = false,
  fieldaname,
  setValue,
  getValue,
  data,
  error,
  ...rest
}) => {
  const handleChange = (event) => {
    if(leadValFn!==undefined){
     leadValFn(event.target.value)
    }
    // setValue(name,   event.target.value);

  };
  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: required === true ? name + " is required" : required }}
      render={({ field: { onChange, value, ref } }) => (
        <>
        <FormControl size="small" fullWidth  sx={{ mt: 2,}}>

        <InputLabel id="demo-simple-select-label">{label}</InputLabel>

          <Select
            fullWidth
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue={def}
            label={label}
            size="small"
            onChange={(e)=> {
              handleChange(e);
              onChange(e);
            }}
            error={!!error}
            helperText={error && `${error.message}`}
            renderValue={(value) => value}
          >
            {data &&
              data.map((item, index) => (
                <MenuItem
                  key={index}
                  onClick={() => pass_fun(item?.id)}
                  value={item[fieldaname]}
                >
                  {item[fieldaname]}
                </MenuItem>
              ))}
          </Select>
          <FormHelperText style={{ color: error?.message ? ' #f79277' : '' }}>{error?.message}</FormHelperText>
</FormControl>
          </>
      )}
    />
  );
};
