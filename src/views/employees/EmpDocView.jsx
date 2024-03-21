/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from '@mui/system';
import React,{useEffect, useState} from 'react';

const GoogleDocumentViewer = (props) => {
  const [file]=useState(()=>props?.doc?.file)
  console.log("file",file)
  const [previewUrl, setPreviewUrl] = useState('');
  const previewFun = ( )=>{
    if(typeof file === "string"){
      setPreviewUrl(`${process.env.REACT_APP_API_BASE_URL}/${file}`)
    }
    else{
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  }
  }
console.log(props?.doc?.file)
  const getFileType = (fileName) => {
    let extension;
    if(typeof file === "string")
    {extension = file.substring(file.lastIndexOf('.') + 1);}
    else
     extension = fileName.split('.').pop().toLowerCase();
 console.log("extension",extension)
    if (extension === 'pdf') {
      return 'pdf';
    } else if (extension === 'doc' || extension === 'docx') {
      return 'doc';
    } else {
      return 'image';
    }
  };
  useEffect(() => {
    previewFun();
  }, []);

  return (
    <>
    {previewUrl && (
      <Box>
        {getFileType(file?.name) === 'pdf' && (
          <embed src={previewUrl} type="application/pdf" width="100%" height="500px" />
        )}
        {getFileType(file?.name) === 'doc' && (
          <iframe src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(previewUrl)}`} width="100%" height="500px" title= 'doc' frameBorder="0" />
        )}
        {getFileType(file?.name) === 'image' && (
          <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%' }} />
        )}
      </Box>
    )}  
    </>
    );
};

export default GoogleDocumentViewer;
