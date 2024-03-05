import * as React from "react";
import { Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import {InputLabel, FormControl ,Box } from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";


export const FormImage = ({
  name,
  f_type,
  d_value,
  setValue,
  control,
  label,
  getValues,
  setError,
  required = false,
  focused = false,
  error,
  ...rest
}) => {
    let temp;
  if(d_value !== undefined){
  const image = `${process.env.REACT_APP_API_BASE_URL}/${d_value}`;
     temp =image }
  const [selectedFile, setSelectedFile] = React.useState(temp);

  const onDrop = (e) => {
    const fileInput = e.target;        
    const file = fileInput.files[0];  
    if(file ){ 
      setSelectedFile(URL.createObjectURL(file));
      setValue( name,file );}
      
      // console.log("image file",e.target.files[0])

    };
    

  return (
    <>
    <Controller
        name={name}
        control={control}
        defaultValue={d_value}
        render={({ field }) => (
          <Box>
          
          <InputLabel  labelId="demo-simple-select-label"  >{label}</InputLabel>          
          <FormControl size="small" fullWidth  >
              <input
              labelId="demo-simple-select-label"
              id="demo-simple-select"
                type="file"
                size="small"
                focused
                placeholder={d_value}
                fullWidth="true"
                defaultValue={""}
                accept="image/*"
                sx={{marginTop:'5px'}}
                onChange={(e) => onDrop(e)}
              />
             
            
            {error && <FormHelperText style={{ color: error?.message ? "#f79277" : "" }}>
            {error?.message}
          </FormHelperText>}

            { selectedFile && selectedFile?.length>0 &&            
              <img 
                src={selectedFile || URL.createObjectURL(selectedFile)}
                alt="Preview"

                style={{ maxWidth: "250px",maxHeight:'100px', marginTop: "10px" }}
              />
            }
            </FormControl >

          </Box>
        )}
      />
    </>
  );
};