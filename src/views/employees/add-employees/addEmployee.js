import React,{useState} from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const AddEmployee = () => {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: 'transparent',
        boxShadow: 'none'
    }));
    const [age, setAge] = useState('');
    const handleChangeSel = (event) => {
        setAge(event.target.value);
    };
    return (
        <>
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '20px', fontWeight: "600" }}>
                Add Employee
            </Typography>
            <Box sx={{
                width: 800,
                maxWidth: '100%',
            }}>
                <form>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item sm={6}>
                                <Item>
                                    <TextField fullWidth label="First Name" id="fullWidth" />
                                </Item>
                            </Grid>
                            <Grid item sm={6}>
                                <Item>
                                    <TextField fullWidth label="Last Name" id="fullWidth" />
                                </Item>
                            </Grid>
                            <Grid item sm={6}>
                                <Item>
                                    <TextField fullWidth label="Username" id="fullWidth" />
                                </Item>
                            </Grid>
                            <Grid item sm={6}>
                                <Item>
                                    <TextField fullWidth label="Email" id="fullWidth" />
                                </Item>
                            </Grid>
                            <Grid item sm={6}>
                                <Item>
                                    <TextField fullWidth label="Password" id="fullWidth" type="password" />
                                </Item>
                            </Grid>
                            <Grid item sm={6}>
                                <Item>
                                    <TextField fullWidth label="Confirm Password" id="fullWidth" type="password" />
                                </Item>
                            </Grid>
                            <Grid item sm={6}>
                                <Item>
                                    <TextField fullWidth label="Employee ID" id="fullWidth" />
                                </Item>
                            </Grid>
                            <Grid item sm={6}>
                                <Item>
                                    <TextField fullWidth label="Date of joining" id="fullWidth" />
                                </Item>
                            </Grid>
                            <Grid item sm={6}>
                                <Item>
                                    <TextField fullWidth label="Phone" id="fullWidth" type="number" />
                                </Item>
                            </Grid>
                            <Grid item sm={6}>
                                <Item>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-company">Company</InputLabel>
                                        <Select
                                            fullWidth
                                            labelId="demo-simple-select-company"
                                            id="demo-simple-select"
                                            value={age}
                                            label="Company"
                                            onChange={handleChangeSel}
                                        >
                                            <MenuItem value="10">Global technology</MenuItem>
                                            <MenuItem value="20">Delta Infotech</MenuItem>
                                            <MenuItem value="30">Teleperformance Solutions</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Item>
                            </Grid>
                            <Grid item sm={6}>
                                <Item>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-department">Department</InputLabel>
                                        <Select
                                            fullWidth
                                            labelId="demo-simple-select-department"
                                            id="demo-simple-select"
                                            value={age}
                                            label="Department"
                                            onChange={handleChangeSel}
                                        >
                                            <MenuItem value="10">Lorem Ipsum</MenuItem>
                                            <MenuItem value="20">Lorem Ipsum</MenuItem>
                                            <MenuItem value="30">Lorem Ipsum</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Item>
                            </Grid>
                            <Grid item sm={6}>
                                <Item>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-designation">Designation</InputLabel>
                                        <Select
                                            fullWidth
                                            labelId="demo-simple-select-designation"
                                            id="demo-simple-select"
                                            value={age}
                                            label="Designation"
                                            onChange={handleChangeSel}
                                        >
                                            <MenuItem value="10">Lorem Ipsum</MenuItem>
                                            <MenuItem value="20">Lorem Ipsum</MenuItem>
                                            <MenuItem value="30">Lorem Ipsum</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Item>
                            </Grid>
                        </Grid>
                    </Box>
                    <Button type='submit' variant="contained" sx={{ marginTop: '13px' }}>Submit</Button>
                </form>
            </Box>
        </>
    )
}

export default AddEmployee;