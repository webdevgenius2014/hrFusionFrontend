import * as React from "react";
import {Select,MenuItem,InputLabel,FormHelperText,FormControl} from "@mui/material/";
import { Controller } from "react-hook-form";

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
  stylee,
  data,
  error,
  ...rest
}) => {
  const handleChange = (event) => {
    if(leadValFn !== undefined){
      console.log(event.target.value)
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
            {data && data.length > 0 ?(
              data.map((item, index) => (
                <MenuItem
                  key={item[index]}
                  onClick={() =>{if(pass_fun){ pass_fun(item?.id , index)}}}
                  value={item[fieldaname]}
                >
                  {item[fieldaname]}
                </MenuItem>
              ))): (<MenuItem disabled={true} value={' '} >No Record</MenuItem>)
            }
          </Select>
          <FormHelperText style={{ color: error?.message ? ' #f79277' : '' }}><span>{error?.message}</span></FormHelperText>
          </FormControl>
          </>
      )}
    />
  );
};
