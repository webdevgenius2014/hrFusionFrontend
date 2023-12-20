import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { yupResolver } from "@hookform/resolvers/yup";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import { FormInputText } from "../../../components/form-components/formInputText";
import { FormInputEmail } from "../../../components/form-components/formInputEmail";
import { FormInputPassword } from "../../../components/form-components/formInputPassword";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import validationSchema from "../validation";
import EmployeServices from "../../../services/EmployeServices";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import DesignationServices from "../../../services/DesignationServices";
import DepartmentServices from "../../../services/DepartmentServices";
import { FormSelect } from "../../../components/form-components/FormSelect";
import commonServices  from '../../../services/CommonServices'


const EditEmployee = (props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(() => props?.data?.id);
  const [data, setData] = useState(() => props.data.row?.user_meta);
  const [showDesig,setshowDesig]= useState(() => props.data.row?.user_meta.designation.designation_name)
  // api integration --------------------------------
  // Edit employee --------------------------------
  const handleEditEmployee = (formData) => {
    let payload = {
      id: id,
      ...formData,
      email: formData?.useremail || data.email,
      designation: addDesignation_id,
      department: addDepartment_id,
      role: addRole,
    };
    EmployeServices.editEmployee(payload)
      .then((res) => {
        if (res.status == 200) {
          props.handleEditClose();
          toast.success(res.data.message);
          EmployeServices.getEmployee();
          // setLoading(false);
        }
        if (res.status == 403) {
          console.log("yes")
          Object.keys(res.data.errors).forEach((field) => {
            console.log(field);
            if (field != "email")
              setError(field, {
                type: "manual",
                message: res.data.errors[field],
              });
            else
              setError("useremail", {
                type: "manual",
                message: res.data.errors[field],
              });
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          toast.error("please login again");
          navigate("/");
        }
        if(err.response.status ===500){
          toast.error("Please try again");
        }
      });
  };
  // get all departments --------------------------------
  const [getdep, setGetdep] = useState([]);
  const getDepartmentfn = async () => {
    DepartmentServices.getDepartments()
      .then((res) => {
        if (res) {
          setGetdep(res.data.data);
        } else {
          setGetdep([]);
        }
      })
      .catch((err) => {
        console.log("getDepartment", err);
      });
  };
  // end all department --------------------
  // get roles --------------------
  const [getRole,setRole]=useState([]);
  const getRoles = () => {
    setRole(()=>[])
    commonServices.getRole()
    .then((res) => {
      if (res.status==200) {
        setRole(()=>res?.data?.data);
        // EmployeServices.getEmployee();
      } else {
        setRole([]);
      }
    })
    .catch((err) => {
      console.log("get roles", err);
    });

};
console.log(data)
  // end  get roles -------------------
  // get all designations --------------------
  const [getDesig, setGetDesig] = useState([]);
  const desigByDep =  (id) => {
    DesignationServices.designationsByDep(id)
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
  const [addDesignation_id, setAddDesignation_id] = useState(
    data?.designation?.id
    );
    const [addDepartment_id, setAddDepartment_id] = useState(
      data?.department?.id
      );
      const [addRole, setAddRole] = useState(data?.role?.id);
      
      const handleChangeDep = (id) => {
        setshowDesig(()=>'Select designation')
        desigByDep({department_id:addDepartment_id});
    setAddDepartment_id(() => id);
  };
  // console.log("dep", addDepartment_id);
  const handleChangeDesig = (id) => {
    setAddDesignation_id(() => id);
  };
  const handleChangeRole = (id) => {
    setAddRole(() => id);
  };
  // console.log("desig", addDesignation_id);
  // form validation
  useEffect(() => {
    getDepartmentfn();
    getRoles();
   desigByDep({department_id:addDepartment_id});

  }, []);
  const {
    formState,
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      first_name: data?.first_name,
      last_name: data?.last_name,
      email: data?.email,
      username: data?.username,
      employee_id: data?.employee_id,
      joining_date: data?.joining_date,
      dob: data?.dob,
      phone: data?.phone,
      designation: data?.designation?.id,
      department: data?.department?.id,
      role: data?.role?.id,
    },
  });
  
  let error=formState;
  const sampleEmployees = [
    {
      id: 1,
      name: "Bernardo Galaviz",
      employeeid: "FT-0008",
      email: "bernardogalaviz@example.com",
      mobile: 9876543210,
      joindate: "1 Jan 2013",
    },
    {
      id: 2,
      name: "Jeffrey Warden",
      employeeid: "FT-0009",
      email: "bernardogalaviz@example.com",
      mobile: 9876543210,
      joindate: "1 Jan 2013",
    },
    {
      id: 3,
      name: "John Doe",
      employeeid: "FT-0010",
      email: "bernardogalaviz@example.com",
      mobile: 9876543210,
      joindate: "1 Jan 2013",
    },
    {
      id: 4,
      name: "John Smith",
      employeeid: "FT-0011",
      email: "bernardogalaviz@example.com",
      mobile: 9876543210,
      joindate: "1 Jan 2013",
    },
    {
      id: 5,
      name: "Mike Litorus",
      employeeid: "FT-0012",
      email: "bernardogalaviz@example.com",
      mobile: 9876543210,
      joindate: "1 Jan 2013",
    },
    {
      id: 6,
      name: "Richard Miles",
      employeeid: "FT-0013",
      email: "bernardogalaviz@example.com",
      mobile: 9876543210,
      joindate: "1 Jan 2013",
    },
    {
      id: 7,
      name: "Wilmer Deluna",
      employeeid: "FT-0014",
      email: "bernardogalaviz@example.com",
      mobile: 9876543210,
      joindate: "1 Jan 2013",
    },
  ];

  return (
    <>
      <ToastContainer />
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
        sx={{ fontWeight: "600" }}
      >
        Edit Designation
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
        }}
      >
        <CssBaseline />
        <Box sx={{ flexGrow: 1 }}>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(handleEditEmployee)}
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
                  //autoFocus
                  defaultValue={data.first_name}
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
                  //autoComplete="family-name"
                  defaultValue={data?.last_name}
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
                  defaultValue={data?.email}
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
                  defaultValue={data?.username}
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
                  value={data?.password}
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
                  value={data?.confirm_password}
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
                  defaultValue={data?.employee_id}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormInputText
                  required
                  fullWidth
                  focused
                  format="DD/MM/yyyy"
                  type="date"
                  id="joining_date"
                  label="joining_date"
                  name="joining_date"
                  size="small"
                  error={errors && errors.joining_date}
                  control={control}
                  defaultValue={data?.joining_date}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormInputText
                  required
                  fullWidth
                  focused
                  type="date"
                  id="dob"
                  // format="DD/MM/yyyy"
                  label="Date of Birth"
                  name="dob"
                  size="small"
                  error={errors && errors.dob}
                  control={control}
                  defaultValue={data?.dob}
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
                  defaultValue={data?.phone}
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
                  def={data.department?.department_name}
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
                  def={props.data.row?.user_role?.role}
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
                  def={showDesig ||'select designation'}
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
              Sign Up
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default EditEmployee;
