import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import { MenuItem, Select, InputLabel } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import FormHelperText from "@mui/material/FormHelperText";

export const FormMultiSelect = ({
  name,
  control,
  label,
  options,
  def,
  pass_fun,
  fieldaname,
  setValue,
  required = false,
  error,
  ...rest

}) => {
  const defVal = def && def.length > 0 ? def :[]
  const [apiData, setapiData] = React.useState(defVal);
  
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setapiData(()=>
      typeof value === 'string' ? value.split(',') : value
    );
    setValue(name, typeof value === 'string' ? value.split(',') : value);

  };


  return (
    <>
    <FormControl size="small" fullWidth  >

    <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        multiple
        displayEmpty
        style={{width: '100%',height:'40px'}}
        value={apiData}
        error={!!error}
        sx={{margin:'5px'}}
        helperText={error && `${error.message}`}
        onChange={handleChange}
        input={<OutlinedInput  label={label}/>}
        renderValue={(selected) => {
          return selected.join(',');
        }}
        inputProps={{ 'aria-label': 'Without label' }}
      >
        
        {options.map((i) => (
          <MenuItem
            key={i[fieldaname]}
            value={i[fieldaname]}
            onClick={() =>{if(pass_fun){ pass_fun(i?.id)}}}

            // style={getStyles(name, apiData, theme)}
          >
            {i[fieldaname]}
          </MenuItem>
        ))}
      </Select>
  

      <FormHelperText style={{ color: error?.message ? "#f79277" : "" }}>
        {error?.message}
      </FormHelperText>
      </FormControl >

    </>
  );
};
