import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import EmployeesForm  from '../EmployeeForm'
import Typography from "@mui/material/Typography";
import EmployeServices from "../../../services/EmployeServices";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import DesignationServices from "../../../services/DesignationServices";
import DepartmentServices from "../../../services/DepartmentServices";
import commonServices  from '../../../services/CommonServices'


const EditEmployee = (props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [serverError , setServerError] = useState('')
  const [id, setId] = useState(() => props?.data?.id);
  const [data, setData] = useState(() => props.data.row?.user_meta);
  const [showRole, setShowRole] = useState(() => props.data.row?.user_role.role);
  const [showDesig,setshowDesig]= useState(() => props.data.row?.user_meta.designation.designation_name)
  // api integration --------------------------------
  // Edit employee --------------------------------
  const handleEditEmployee = (formData) => {
    setLoading(true);
    console.log(formData)
    let payload = {
      id: id,
      ...formData,
      email: formData?.useremail || data.email,
      designation: addDesignation_id,
      department: addDepartment_id,
      role: addRole || props.data.row?.user_role.id,
    };
    console.log(formData)
    EmployeServices.editEmployee(payload)
      .then((res) => {

        if (res.status == 200) {
          props.handleEditClose();
          toast.success(res.data.message);
          EmployeServices.getEmployee();
          setLoading(false);
        }
        if (res.status == 403) {
          setServerError(res.data.errors)
         
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
    DepartmentServices.getAllDepartments()
      .then((res) => {
        if (res) {
          // console.log(res.data.data)
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
// console.log(data)
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
      const [addRole, setAddRole] = useState(data?.user_role?.id);
      
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
   desigByDep({id:addDepartment_id});

  }, []);
 
 
  return (
    <>
      <ToastContainer />
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
        sx={{ fontWeight: "600" }}
      >
        Edit Employee
      </Typography>
      <Box
        sx={{
          mb: 2,
          width: 800,
          display: "flex",
          flexDirection: "column",
          height: 480,
          overflow: "hidden",
          overflowY: "scroll",
        }}
      >
        <CssBaseline />
       <EmployeesForm 
       data={data}
       getdep={getdep}
       getRole={getRole}
       showRole={showRole}
       getDesig={getDesig}
       showDesig={showDesig}
       handleChangeDep={handleChangeDep}
       handleChangeRole={handleChangeRole}
       handleChangeDesig={handleChangeDesig}
       apiFunc={handleEditEmployee}
       serverError={serverError}
       BtnName={"Save Changes"}
       loading={loading}
       />
      </Box>
    </>
  );
};

export default EditEmployee;
