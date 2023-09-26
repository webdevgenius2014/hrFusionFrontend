import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import CommonModal from '../../components/commonModal';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { DataGrid } from '@mui/x-data-grid';

const Deartments = () => {
  const sampleData = [
    { id: 1, department: 'Web Development',action: 'hwllo' },
    { id: 2, department: 'Marketing' },
    { id: 3, department: 'App Development' },
    { id: 4, department: 'Support' },
    { id: 5, department: 'Accounts' },
    { id: 6, department: 'PHP Open Source' },
    { id: 7, department: 'Design and Printing' }
  ]
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: 'transparent',
    boxShadow: 'none'
  }));

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [depval, setDepVal] = useState("")
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(depval);
  }

  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'department', headerName: 'Department' }
  ]

  const styles={
    backgroundColor :'white'
  }
  return (
    <>
      <Container>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Item><h2>Department List</h2></Item>
            </Grid>
            <Grid item xs={6}>
              <Item align="right">
                <Button startIcon={<AddIcon />} variant="contained" onClick={handleOpen}>Add</Button>
              </Item>
            </Grid>
          </Grid>
          <DataGrid
          style={styles}
            rows={sampleData}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 7 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </Box>
      </Container>

      <CommonModal isOpen={open} isClose={handleClose}>
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '20px', fontWeight: "600" }}>
          Add Department
        </Typography>
        <Box sx={{
          width: 500,
          maxWidth: '100%',
        }}>
          <form onSubmit={handleSubmit}>
            <TextField fullWidth label="Add Department" id="fullWidth" value={depval} onInput={(e) => setDepVal(e.target.value)} />
            <Button type='submit' variant="contained" sx={{ marginTop: '13px' }}>Submit</Button>
          </form>
        </Box>
      </CommonModal>

    </>
  )
}
export default Deartments;
