import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import EmployeesForm  from '../EmployeeForm'
import Typography from "@mui/material/Typography";
import EmployeServices from "../../../services/EmployeServices";
import { useNavigate } from "react-router-dom";
import {toast } from "react-toastify";
import DesignationServices from "../../../services/DesignationServices";
import DepartmentServices from "../../../services/DepartmentServices";
import commonServices  from '../../../services/CommonServices'
import { useDispatch } from "react-redux";
import { superAdminLogout } from "../../../redux/SuperAdminSlice";
import {getAllDepartmentfn , allRoles} from '../../../helperApis/HelperApis'


const EditEmployee = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false)
  const [serverError , setServerError] = useState('')
  const [id] = useState(() => props?.data?.id);
  const [data] = useState(() => props.data.row?.user_meta);
  const [showRole] = useState(() => props.data.row?.user_role.role);
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

        if (res.status === 200) {
          props.handleEditClose();
          toast.success(res.data.message);
          EmployeServices.getEmployee();
          setLoading(false);
        }
        if (res.status === 403) {
          setLoading(false);
          setServerError(res.data.errors)
         
        }
        if (res.status === 401) {
          // con9sole.log()
          dispatch(superAdminLogout());
          setLoading(false);
        navigate("/");
      }
      })
      .catch((err) => {
        console.log('edit employee error',err)
      });
  };
  // get all departments --------------------------------
  const [getdep, setGetdep] = useState([]);
  const getAllDepartmentsFn = async () => {
    try {
      const result = await getAllDepartmentfn();
      console.log(result);
      setGetdep(result);
    } catch (error) {
      console.log("getAllDepartmentsFn", error);
    }
  };
  // end all department --------------------
  // get roles --------------------
  const [getRole,setRole]=useState([]);
  const getAllRole = async () => {
    try {
      const result = await allRoles();
      console.log(result);
      setRole(result);
    } catch (error) {
      console.log("getAllDepartmentsFn", error);
    }
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
        if (res.status === 401) {
          // con9sole.log()
          dispatch(superAdminLogout());
          setLoading(false);
        navigate("/");
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
    getAllDepartmentsFn();
    getAllRole();
   desigByDep({id:addDepartment_id});

  }, []);
 
 
  return (
    <>
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
          minWidth: {lg:750,md:425,sm:425,xs:300,xl:900},
          maxWidth: {lg:900,md:768,sm:568,xs:425,xl:1100},
          display: "flex",
          flexDirection: "column",
          height: 470,
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
       btnName={"Save Changes"}
       loading={loading}
       editForm={true}
       />
      </Box>
    </>
  );
};

export default EditEmployee;
