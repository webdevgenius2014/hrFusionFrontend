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
import EmployeesForm from '../EmployeeForm'
const AddEmployee = ({ getAllEmployees, handleClose }) => {
  const [serverError,setServerError]=useState();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // api integration --------------------------------

  // add employee --------------------------------
  const addEmployees = (data) => {

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
          setServerError(()=>data.data.errors)
          // Object.keys(data.data.errors).forEach((field) => {
          //   setError(field, {
          //     type: "manual",
          //     message: data.data.errors[field],
          //   });
          // });
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
          setGetdep(()=>res.data.data.data);
          console.log(res.data.data)
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
        //   border: "1px solid",
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
          height:480,
          flexDirection: "column",
          overflow: "hidden",
          overflowY: "scroll",
          // justifyContent="flex-end" # DO NOT USE THIS WITH 'scroll'
        }}
      >
        <CssBaseline />
        <Box sx={{ flexGrow: 1 }}>
          
          <EmployeesForm 
       getdep={getdep}
       getRole={getRole}
       getDesig={getDesig}
       handleChangeDep={handleChangeDep}
       handleChangeRole={handleChangeRole}
       handleChangeDesig={handleChangeDesig}
       apiFunc={addEmployees}
       />
        </Box>
      </Box>
    </>
  );
};

export default AddEmployee;


