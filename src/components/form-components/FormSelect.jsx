import * as React from 'react';
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { Controller } from "react-hook-form";
export const FormSelect= ({name, control, label, pass_fun,def,required=false,focused=false ,fieldaname,data,error, ...rest }) => {       
    let optdata=[];
    data.map((item)=>{
        optdata = [...optdata, {value:item[fieldaname], label:item[fieldaname]}];
    })
    return (
        <Controller
            control={control}
            name={name}
            rules={{required: required===true?name+' is required':required}}            
            render={(({field:{onChange, value, ref}}) => (
                <>
                <InputLabel id="demo-simple-select-label">
                  {label}
                </InputLabel>
                <Select
                fullWidth
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={def}
                label={label}
                size="small"
                onChange={onChange}
                error={!!error}                                       
                    helperText={error && `${error.message}`} 
                renderValue={(value) => value}
              >
                {data &&
                    data.map((item, index) => (
                    <MenuItem
                      key={index}
                      onClick={() => pass_fun(item.id)}
                      value={item[fieldaname]}
                    >
                      {item[fieldaname]}
                    </MenuItem>
                  ))}
              </Select>
              
                        </>
                ))}
            
        />
    );
};