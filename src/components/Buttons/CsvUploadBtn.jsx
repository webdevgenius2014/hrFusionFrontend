import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Box, Button } from "@mui/material";
import React ,{useRef } from 'react'


export default function CsvUploadBtn({setCsvFile,handleConfirmOpne}) {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const onDrop = (e) => {
    const fileInput = e.target;        
    const file = fileInput.files[0];
    console.log(file);
    if(file ){ 
      setCsvFile(()=>file);
      handleConfirmOpne();
    //   setSelectedFile(URL.createObjectURL(file));
    //   setValue( "csv-file",file );}
    };
  }
  return (
    <Box className='file file--upload' >
    <label htmlFor='input-file'>
    <Button
    startIcon={<FileUploadIcon />}
    variant="contained"
    onClick={handleButtonClick}
    // onClick={props?.onClick}
    sx={{ mt: 3, mb: 2, px: 3, display: "flex", margin: "8px auto 8px auto", background:'#5D87FF ',
    boxShadow:'0px 4px 20px 0px #5D87FF8C'
  }}
  >
   Upload Csv file
  </Button>
    </label>
    <input id='input-file'        
     ref={fileInputRef}
     accept=".csv,"
     onChange={(event) => onDrop(event)}
    type='file'  style={{display:'none'}} />
  </Box>
  )
}
