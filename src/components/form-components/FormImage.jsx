import * as React from "react";
import { Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { Button, TextField, Typography } from "@mui/material";
import FormControl from '@mui/material/FormControl';


export const FormImage = ({
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
    let temp;
  if(d_value != undefined){
  const image = `${process.env.REACT_APP_API_BASE_URL}/${d_value}`;
     temp =image }
  const [selectedFile, setSelectedFile] = React.useState(temp);

  const onDrop = (e) => {
    const fileInput = e.target;        
    console.log("file",fileInput.files[0])
    const file = fileInput.files[0];
    setSelectedFile(URL.createObjectURL(file));
    console.log("inage file",file)
    setValue( name, file);
};
  

  return (
    <>
    <Controller
        name={name}
        control={control}
        defaultValue={d_value}
        render={({ field }) => (
          <div>
          <FormControl size="small" fullWidth  sx={{ mt: 2,}}>

            <input {...field.input} type="hidden" />
            <label htmlFor="image">
              <TextField
              labelId="demo-simple-select-label"
              id="demo-simple-select"
                type="file"
                size="small"
                label={label}
                focused
                defaultValue={""}
                accept="image/*"
                onChange={(e) => onDrop(e)}
                style={{ display: "" }}
              />
             
            </label>
            {error && <Typography color="error">{error.message}</Typography>}

            { selectedFile && selectedFile?.length>0 &&            
              <img
                src={selectedFile || URL.createObjectURL(selectedFile)}
                alt="Preview"
                style={{ maxWidth: "100%", marginTop: "10px" }}
              />
            }
            </FormControl >

          </div>
        )}
      />
    </>
  );
};