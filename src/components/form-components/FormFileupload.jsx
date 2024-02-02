import React, { useState } from 'react';
import { Button, List, ListItem, Typography,InputLabel,TextField,Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Box, flexbox } from '@mui/system';
export const FileUploader = ({ onFileChange, onRemoveFile, sectionIdentifier }) => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (evt) => {
    const newFiles = [...files];

    for (let i = 0; i < evt.target.files.length; i++) {
      const file = evt.target.files[i];
      const fileId = sectionIdentifier + Date.now() + i;

      newFiles.push({
        id: fileId,
        file: file,
      });
    }

    setFiles(newFiles);
    onFileChange(newFiles);
  };

  const handleRemoveFile = (fileId) => {
    const newFiles = files.filter((file) => file.id !== fileId);
    setFiles(newFiles);
    onRemoveFile(newFiles);
  };

  return (
    <Box>
    <InputLabel>Upload Files</InputLabel>

    <Box className="file-upload"  >
    <Grid container spacing={1}>
    <Grid item xs={12} sm={6} lg={6}>
    <TextField id="outlined-basic" label="File Name" fullWidth size='small' variant="outlined" />

    </Grid>
    <Grid item xs={12} sm={6} lg={6}>

    <input type="file" onChange={handleFileChange} multiple  />
    </Grid>
    </Grid>
  </Box> 
      <List className="fileList">
        {files.map((file) => (
          <ListItem key={file?.id}>
            <Typography>
              <span>{file?.file?.name}</span>
              <Button
                variant="text"
                color="secondary"
                onClick={() => handleRemoveFile(file.id)}
              >
                Remove
              </Button>
            </Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
