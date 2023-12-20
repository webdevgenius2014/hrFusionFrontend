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
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import validationSchema from "../validation";
import EmployeServices from "../../../services/EmployeServices";
import DesignationServices from "../../../services/DesignationServices";
import DepartmentServices from '../../../services/DepartmentServices'
import commonServices  from '../../../services/CommonServices'
import { FormSelect } from "../../../components/form-components/FormSelect";

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
      role: addRole,
        };
    EmployeServices.addEmployee(payload)
      .then((data) => {
        if (data?.status === 200) {
          toast.success(data.data?.message);
          getAllEmployees();
          setLoading(false);
          handleClose();
        }
        if (data.status == 403) {
          Object.keys(data.data.errors).forEach((field) => {
            setError(field, {
              type: "manual",
              message: data.data.errors[field],
            });
          });
        }
        setLoading(false);
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
  const getDepartmentfn = () => {
    DepartmentServices.getDepartments()
      .then((res) => {
        if (res) {
          setGetdep(()=>res.data.data);
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
  const desigByDep = (id) => {
      setGetDesig(()=>[])
    DesignationServices.designationsByDep(id)
      .then((res) => {
        if (res.status==200) {
          setGetDesig(()=>res?.data?.data);
          // EmployeServices.getEmployee();
        } else {
          setGetDesig([]);
        }
      })
      .catch((err) => {
        console.log("getDesignations", err);
      });

  };

  // get roles ---------------------------------------------------
  const [getRole,setRole]=useState([]);
  const getRoles = () => {
    setRole(()=>[])
    commonServices.getRole()
    .then((res) => {
      if (res.status==200) {
        setRole(()=>res?.data?.data);
        console.log(res.data.data)
        // EmployeServices.getEmployee();
      } else {
        setRole([]);
      }
    })
    .catch((err) => {
      console.log("get roles", err);
    });

};

  // end all designations --------------------
  // end get  all department -------------------------------

  // end add employee --------------------------------
  useEffect(() => {
    getDepartmentfn();
    getRoles();

  }, []);

  // end api integration --------------------------------

  const [addDesignation_id, setAddDesignation_id] = useState("");
  const [addDepartment_id, setAddDepartment_id] = useState("");
  const [addRole, setAddRole] = useState("");

  const handleChangeDep = (id) => {
    setAddDepartment_id(() => id);
    console.log(id)
    desigByDep({department_id:id});

    
  };
  // console.log("dep", addDepartment_id);
  const handleChangeDesig = (id) => {
    setAddDesignation_id(() => id);
  };
  const handleChangeRole = (id) => {
    setAddRole(() => id);
  };
  // console.log("desig", addDesignation_id);
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
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
                  error={errors && errors?.first_name}
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
                  error={errors && errors?.last_name}
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
                  error={errors && errors?.email}
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
                  // format="MM/dd/yyyy"
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
                  format="DD/MM/yyyy"
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
              
              {getdep && getdep?.length>0 && 
              <FormSelect 
                name="department"
                data={getdep}
                label='Department Name'
                control={control}
                onchange={onchange}
                fieldaname='department_name'
                def='Select Department'
                pass_fun={handleChangeDep}
                error={errors && errors.department}   
                required
              />
              
              }
            </Grid>
              <Grid item xs={12} sm={6}>
              {getRole && getRole?.length>0 && 
              <FormSelect 
                name="role"
                data={getRole}
                label='Role'
                control={control}
                fieldaname='role'
                pass_fun={handleChangeRole}
                def='Select Role'
                error={errors && errors.role}   
                required
              />
              
              }
            </Grid>
              <Grid item xs={12} sm={6}> 
              {getDesig && getDesig?.length>0 && 
              <FormSelect 
                name="designation"
                data={getDesig}
                pass_fun={handleChangeDesig}
                label='Designation'
                control={control}
                fieldaname='designation_name'
                def='Select Designation'
                error={errors && errors.designation}   
                required
              />
              }
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


