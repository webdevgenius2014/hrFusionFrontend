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
  def,
  setId,
  pass_fun,
  required = false,
  focused = false,
  fieldaname,
  setValue,
  getValue,
  stylee,
  data,
  setShowDesig,
  error,
  ...rest
}) => {
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
            sx={{marginTop:"6px"}}
            size="small"
            onChange={(e)=> {
              onChange(e);
              if(setShowDesig) {setShowDesig("select designation");
            }
            }}
            error={!!error}
            helperText={error && `${error.message}`}
            renderValue={(value) => value}
            MenuProps={MenuProps}
          >
            {data && data.length > 0 ?(
              data.map((item, index) => (
                <MenuItem
                  key={index}
                  onClick={() =>{ if(pass_fun){ pass_fun(item?.id)}}}
                  value={item[fieldaname]}
                >
                  {item[fieldaname]}
                </MenuItem>
              ))): (<MenuItem disabled={true} value={' '} >No Record</MenuItem>)
            }
          </Select>
          {error && <FormHelperText style={{ color: error?.message ? ' #f79277' : '' }}><span>{error?.message}</span></FormHelperText>
        }
          </FormControl>
          </>
          )}
          />
          );
        };
