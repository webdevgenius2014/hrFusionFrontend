import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import CssBaseline from "@mui/material/CssBaseline";
import { FormInputEmail } from "../../../components/form-components/formInputEmail"
import { FormInputPassword } from "../../../components/form-components/formInputPassword";
import Select from "@mui/material/Select";
import Container from "@mui/material/Container";
import { useForm } from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useSelector } from "react-redux";
import ApiConfig from "../../../config/apiConfig";
import axios from "axios";

const AddEmployee = () => {
  const token = useSelector((state) => state.SuperAdmin.token);
  const [loading, setLoading] = useState(false);

  // api integration --------------------------------
  // add employee --------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);
    const res = await axios.post(
      ApiConfig.addEmployee,
      {
        ...employeeData,
        designation: addDesignation_id,
        department: addDepartment_id,
      },
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    if (res) {
      // setLoading(false);
      console.log(res);
    }
  };
  // get all departments --------------------------------
  const [getdep, setGetdep] = useState([]);
  const getDepartmentfn = async () => {
    const res = await axios.get(ApiConfig.getDepartments, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (res) {
      setGetdep(res.data.data);
    } else {
      setGetdep([]);
    }
  };
  // end all department --------------------
  // get all designations --------------------
  const [getDesig, setGetDesig] = useState([]);
  const getDesignationsfn = async () => {
    const res = await axios.get(ApiConfig.getDesignations, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (res) {
      setGetDesig(() => res.data.data);
    } else {
      setGetDesig([]);
    }
  };
  // end all designations --------------------
  // end get  all department -------------------------------

  // end add employee --------------------------------
  useEffect(() => {
    getDepartmentfn();
    getDesignationsfn();
  }, []);

  // end api integration --------------------------------
  const [addDesignation_id, setAddDesignation_id] = useState("");
  const [addDepartment_id, setAddDepartment_id] = useState("");
  const handleChangeDep = (id) => {
    setAddDepartment_id(() => id);
  };
  console.log("dep", addDepartment_id);
  const handleChangeDesig = (id) => {
    setAddDesignation_id(() => id);
  };
  console.log("desig", addDesignation_id);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "transparent",
    boxShadow: "none",
  }));
  const [age, setAge] = useState("");
  const handleChangeSel = (event) => {
    setAge(event.target.value);
  };

  const [employeeData, setEmployeeData] = useState({});
  const handleEmployeInput = (e) => {
    // console.log(e)
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
  };
  console.log(employeeData);
  return (
    <>
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
        sx={{ marginBottom: "20px", fontWeight: "600" }}
      >
        Add Employee
      </Typography>
      <Box
        sx={{
          width: 800,
          maxWidth: "100%",
        }}
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <Container component="main" maxWidth="Lg">
            <CssBaseline />
            <Box sx={{ flexGrow: 1 }}>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="first_name"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      onChange={handleEmployeInput}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="last_name"
                      onChange={handleEmployeInput}
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="username"
                      label="Username"
                      name="username"
                      onChange={handleEmployeInput}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="email"
                      name="email"
                      autoComplete="email"
                      onChange={handleEmployeInput}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="password"
                      label="password"
                      name="password"
                      onChange={handleEmployeInput}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="confirm_password"
                      label="confirm_password"
                      name="confirm_password"
                      onChange={handleEmployeInput}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="employee_id"
                      label="employee_id"
                      name="employee_id"
                      onChange={handleEmployeInput}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      type="date"
                      id="joining_date"
                      label="joining_date"
                      name="joining_date"
                      onChange={handleEmployeInput}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      type="date"
                      id="date_of_birth"
                      label="date_of_birth"
                      name="dob"
                      onChange={handleEmployeInput}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="phone"
                      label="Phone Number"
                      name="phone"
                      onChange={handleEmployeInput}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel id="demo-simple-select-label">
                      Designation
                    </InputLabel>
                    <Select
                      fullWidth
                      labelId="demo-simple-select-label"
                      sx={{ marginTop: "20px" }}
                      id="demo-simple-select"
                      defaultValue={"Select Department"}
                      label="Department"
                      renderValue={(value) => value}
                    >
                      {getDesig &&
                        getDesig.map((item, index) => (
                          <MenuItem
                            key={index}
                            onClick={() => handleChangeDesig(item.id)}
                            value={item.designation_name}
                          >
                            {item.designation_name}
                          </MenuItem>
                        ))}
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel id="demo-simple-select-label">
                      Department
                    </InputLabel>
                    <Select
                      fullWidth
                      labelId="demo-simple-select-label"
                      sx={{ marginTop: "20px" }}
                      id="demo-simple-select"
                      defaultValue={"Select Department"}
                      label="Department"
                      renderValue={(value) => value}
                    >
                      {getdep &&
                        getdep.map((item, index) => (
                          <MenuItem
                            key={index}
                            onClick={() => handleChangeDep(item.id)}
                            value={item.department_name}
                          >
                            {item.department_name}
                          </MenuItem>
                        ))}
                    </Select>
                  </Grid>
                </Grid>
                <Grid container justifyContent="flex-end">
                <Grid item></Grid>
                </Grid>
                </Box>
                </Box>
                </Container>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
        </form>
      </Box>
    </>
  );
};

export default AddEmployee;
