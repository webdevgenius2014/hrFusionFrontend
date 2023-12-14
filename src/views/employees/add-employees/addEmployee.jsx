import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInputText } from "../../../components/form-components/formInputText";
import { FormInputEmail } from "../../../components/form-components/formInputEmail";
import { FormInputPassword } from "../../../components/form-components/formInputPassword";
import Select from "@mui/material/Select";
import { useForm } from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import validationSchema from "../validation";
import EmployeServices from "../../../services/EmployeServices";
import DesignationServices from "../../../services/DesignationServices";
import DepartmentServices from "../../../services/DepartmentServices";

const AddEmployee = ({ getAllEmployees, handleClose }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // api integration --------------------------------
  
  // add employee --------------------------------
  const handleSubmitData = (data) => {
    setLoading(true);
    let payload = {
      ...data,
      designation: addDesignation_id,
      email: data.useremail,
      department: addDepartment_id,
    };
    EmployeServices.addEmployee(payload)
      .then((data) => {
        if (data?.status === 200) {
          toast.success(data.data.message);
          getAllEmployees();
          setLoading(false);
          handleClose();
        }
        if(data.status==403 ){
          console.log(data)
          setLoading(false);
          console.log(Object.values(data.data.errors))
          Object.values(data.data.errors).map((i) => {
            toast.error(i[0])
          });
        }
      })
      .catch((err) => {
        // console.log(err;
        if (err.response.status === 401) {
          toast.error("please login again");
          navigate("/");
        } 

        setLoading(false);
      });
  };
  // get all departments --------------------------------
  const [getdep, setGetdep] = useState([]);
  const getDepartmentfn =  () => {
    DepartmentServices.getDepartments()
      .then((res) => {
        if (res) {
          setGetdep(res.data.data);
        } else {
          setGetdep([]);
        }
      })
      .catch((err) => {
        console.log("getdep error", err);
      });
  };
  // end all department --------------------
  // get all designations --------------------
  const [getDesig, setGetDesig] = useState([]);
    const getDesignationsfn = () => {
    DesignationServices.getDesignations()
      .then((res) => {
        if (res) {
          setGetDesig(res.data.data);
          // EmployeServices.getEmployee();
        } else {
          setGetDesig([]);
        }
      })
      .catch((err) => {
        console.log("getDesignations", err);
      });
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
  // console.log("dep", addDepartment_id);
  const handleChangeDesig = (id) => {
    setAddDesignation_id(() => id);
  };
  // console.log("desig", addDesignation_id);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });
  return (
    <>
      <ToastContainer />
      <Typography
        id="modal-modal-title"
        variant="h6"
        // sx={{
        //   mb: 2,
        //   display: "flex",
        //   flexDirection: "column",
        //   overflow: "hidden",
        //   overflowY: "scroll",
        //   // justifyContent="flex-end" # DO NOT USE THIS WITH 'scroll'
        // }}
        component="h2"
        // sx={{ marginBottom: "20px", fontWeight: "600" }}
      >
        Add Employee
      </Typography>
      <Box
        sx={{
          mb: 2,
          width: 800,
          display: "flex",
          flexDirection: "column",
          height: 530,
          overflow: "hidden",
          overflowY: "scroll",
          // justifyContent="flex-end" # DO NOT USE THIS WITH 'scroll'
        }}
      >
        <CssBaseline />
        <Box sx={{ flexGrow: 1 }}>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(handleSubmitData)}
            sx={{ mt: 1 }}
          >
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6} lg={6}>
                <FormInputText
                  autoComplete="given-name"
                  name="first_name"
                  id="firstName"
                  label="First Name"
                  required
                  fullWidth
                  error={errors && errors.first_name}
                  control={control}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormInputText
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="last_name"
                  error={errors && errors.last_name}
                  control={control}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormInputEmail
                  fullWidth
                  id="username"
                  label="Email Address"
                  name="useremail"
                  required
                  error={errors && errors.useremail}
                  control={control}
                  size="small"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormInputText
                  name="username"
                  control={control}
                  label="username"
                  error={errors && errors.username}
                  required
                  size="small"
                  autoComplete="email"
                  // size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormInputPassword
                  name="password"
                  control={control}
                  label="Password"
                  required
                  size="small"
                  error={errors && errors.password}
                  // autoComplete="current-password"
                  // size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormInputPassword
                  name="confirm_password"
                  control={control}
                  label="confirm_password"
                  size="small"
                  required
                  error={errors && errors.confirm_password}
                  // autoComplete="current-password"
                  // size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormInputText
                  required
                  fullWidth
                  id="employee_id"
                  label="employee_id"
                  name="employee_id"
                  size="small"
                  error={errors && errors.employee_id}
                  control={control}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormInputText
                  required
                  fullWidth
                  focused
                  type="date"
                  id="joining_date"
                  label="joining_date"
                  name="joining_date"
                  size="small"
                  error={errors && errors.joining_date}
                  control={control}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormInputText
                  required
                  fullWidth
                  focused
                  type="date"
                  id="date_of_birth"
                  label="Date of Birth"
                  name="dob"
                  size="small"
                  error={errors && errors.dob}
                  control={control}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormInputText
                  required
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  size="small"
                  error={errors && errors.phone}
                  control={control}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel id="demo-simple-select-label">
                  Designation
                </InputLabel>
                <Select
                  fullWidth
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue={"Select Department"}
                  label="Department"
                  size="small"
                  // onChange={handleChange}
                  // renderValue={(value) => value}
                >
                  {getDesig &&
                    getDesig.map((item, index) => (
                      <MenuItem
                        key={index}
                        onClick={() => handleChangeDesig(item.id)}
                        value={item.id}
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
                  id="demo-simple-select"
                  defaultValue={"Select Department"}
                  label="Department"
                  size="small"
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? <>Loading..</> : <>Sign Up</>}
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AddEmployee;
