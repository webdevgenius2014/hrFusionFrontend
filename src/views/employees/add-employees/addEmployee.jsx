import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import EmployeServices from "../../../services/EmployeServices";
import EmployeesForm from '../EmployeeForm'
import { useDispatch } from "react-redux";
import { superAdminLogout } from "../../../redux/SuperAdminSlice";
import {getAllDepartmentfn , allRoles,desByDep} from '../../../helperApis/HelperApis'

const AddEmployee = ({ getAllEmployees, handleClose }) => {
  const [serverError,setServerError]=useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      .then((res) => {
        if (res?.status === 200) {
          toast.success(res.data?.message);
          getAllEmployees();
          setLoading(false);
          handleClose();
        }
        if (res.status === 403) {
          // console.log(res.data.errors)
          setServerError(()=>res?.data?.errors)
          setLoading(false);
        }
        if (res.status === 401) {
          // con9sole.log()
          dispatch(superAdminLogout());
          setLoading(false);
        navigate("/");
        }
      })
      .catch((err) => {
        console.log("add employee",err);
      
      });
  };
  // get all departments --------------------------------
  const [getdep, setGetdep] = useState([]);
  const getAllDepartmentsFn = async () => {
    try {
      const result = await getAllDepartmentfn();
      setGetdep(result);
    } catch (error) {
      console.log("getAllDepartmentsFn", error);
    }
  };
  // end all department --------------------
  // get all designations --------------------
  const [getDesig, setGetDesig] = useState([]);

  const desByDepFn = async (payload) => {
    try {
      const result = await desByDep(payload);
      setGetDesig(result);
    } catch (error) {
      console.log("getAllDepartmentsFn", error);
    }
  };
 
  // get roles ---------------------------------------------------
  const [getRole,setRole]=useState([]);
  const getAllRole = async () => {
    try {
      const result = await allRoles();
      setRole(result);
    } catch (error) {
      console.log("getAllDepartmentsFn", error);
    }
  };
  
  useEffect(() => {
    getAllDepartmentsFn();
    getAllRole();

  }, []);

  // end api integration --------------------------------

  const [addDesignation_id, setAddDesignation_id] = useState("");
  const [addDepartment_id, setAddDepartment_id] = useState("");
  const [addRole, setAddRole] = useState("");
  const handleChangeDep = (id) => {
    setAddDepartment_id(() => id);
    desByDepFn({department_id:id});
        
  };
  // console.log("dep", addDepartment_id);
  const handleChangeDesig = (id) => {
    setAddDesignation_id(() => id);
  };
  const handleChangeRole = (id) => {
    setAddRole(() => id);
  };
  // console.log("desig", addDesignation_id);

  return (
    <>
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
        // sx={{ marginBottom: "20px", fontWeight: "600" }}
      >
        Add Employee
      </Typography>
      <Box
        sx={{
          mb: 2,
              minWidth: {lg:750,md:650,sm:450,xs:260,xl:900},
              maxWidth: {lg:900,md:800,sm:650,xs:400,xl:1100},
       
          display: "flex",
          height:470,
          flexDirection: "column",
          overflow: "hidden",
          overflowY: "scroll",
          // justifyContent="flex-end" # DO NOT USE THIS WITH 'scroll'
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          
          <EmployeesForm 
       getdep={getdep}
       getRole={getRole}
       serverError={serverError}
       getDesig={getDesig}
       handleChangeDep={handleChangeDep}
       handleChangeRole={handleChangeRole}
       handleChangeDesig={handleChangeDesig}
       apiFunc={addEmployees}
       loading={loading}
       btnName={"Save"}
       />
        </Box>
      </Box>
    </>
  );
};

export default AddEmployee;


