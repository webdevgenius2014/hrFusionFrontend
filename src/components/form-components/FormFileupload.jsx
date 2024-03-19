import React from "react";
import {
  Button,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select ,
  Grid,
} from "@mui/material";

export const FileUploader = (props) => {
  
  const handleFileChange = (event, index) => {
    const selectedFile = event.target.files[0];
    const newFiles = [...props?.files];
    newFiles[index] = {...newFiles[index] , file: selectedFile };
    props?.setFiles(newFiles);
  };

  const handleAddFileInput = () => {
    props?.setFiles((prevFiles) => [...prevFiles, { filename: " ", file: null }]);
  };

  const handleRemoveFileInput = (index) => {
    const newFiles = [...props?.files];
    newFiles.splice(index, 1);
    props?.setFiles(()=>newFiles);
  };
  props?.setValue('documents',props?.files)
  return (
    <Box >
    <Grid item xs={12} sm={12}  >
    <InputLabel>Upload Multiple Documents</InputLabel>
    <Button sx={{marginBottom :'10px'}} variant="contained" onClick={handleAddFileInput}>Add Fields</Button>
    </Grid>

    {props?.files.map((file, index) => (
      <Box key={index} sx={{ display: "flex", gap: 1, mt: 1 }}>
      <FormControl fullWidth>
        <InputLabel id={`Document-label-${index}`}>
          Select Document Type
        </InputLabel>
        <Select
          labelId={`Document-label-${index}`}
          label="Select Document Type"
          fullWidth
          size="small"
          defaultValue={file?.filename}
          onChange={(event) => {
            
            const newFiles = [...props?.files];
            newFiles[index] = {
              ...newFiles[index],
              filename: event.target.value,
            };
            props?.setFiles(newFiles);
          }}
        >
          {props?.getDocType && props?.getDocType.length > 0 ? (
            props?.getDocType.map((item, docIndex) => (
              <MenuItem key={docIndex} value={item.document_name}>
                {item.document_name}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled value={''}>
              No Record
            </MenuItem>
          )}
        </Select>
        </FormControl>
        <input
          type="file"
          accept=".pdf,.doc,.docx,image/*"
          onChange={(event) => handleFileChange(event, index)}
        />
        
    
        <Button
          variant="contained"
          sx={{ paddingLeft: "25px", paddingRight: "25px" }}
          onClick={() => handleRemoveFileInput(index)}
        >
          Remove
        </Button>
      </Box>
    ))}
   
    </Box>
  );
};

// <TextField
// type="text"
// fullWidth
// size="small"
// placeholder="Enter filename"
// // value={file.fileName}
// onChange={(event) => {
//   const newFiles = [...files];
//   newFiles[index] = {
//     ...newFiles[index],
//     fileName: event.target.value,
//   };
//   setFileName(event.target.value)
//   setFiles(newFiles);
// }}
// />