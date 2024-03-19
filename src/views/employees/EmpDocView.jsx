/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect, useState} from 'react';

const GoogleDocumentViewer = (props) => {
  const [file]=useState(()=>props?.doc?.file)
  const [previewUrl, setPreviewUrl] = useState('');
  const previewFun = ( )=>{
    if(file){
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  }
  }
console.log(props?.doc?.file)
  const getFileType = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
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
    <div>
    <h3>Preview:</h3>
    {previewUrl && (
      <div>
        {getFileType(file.name) === 'pdf' && (
          <embed src={previewUrl} type="application/pdf" width="100%" height="500px" />
        )}
        {getFileType(file.name) === 'doc' && (
          <iframe src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(previewUrl)}`} width="100%" height="500px" title= 'doc' frameBorder="0" />
        )}
        {getFileType(file.name) === 'image' && (
          <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%' }} />
        )}
      </div>
    )}  
    </div>
    );
};

export default GoogleDocumentViewer;
