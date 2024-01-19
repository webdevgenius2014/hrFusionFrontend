import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { Controller } from "react-hook-form";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from '@mui/material/FormControl';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
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
        <FormControl size="small" fullWidth  >

        <InputLabel id="demo-simple-select-label">{label}</InputLabel>

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue={def}
            label={label}
            sx={{margin:'5px 0 0 7px'}}
            size="small"
            onChange={(e)=> {
              handleChange(e);
              onChange(e);
            }}
            error={!!error}
            helperText={error && `${error.message}`}
            renderValue={(value) => value}
            MenuProps={MenuProps}
          >
            {data &&
              data.map((item, index) => (
                <MenuItem
                  key={index}
                  onClick={() =>{if(pass_fun){ pass_fun(item?.id)}}}
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
