import React, {useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { DepData,RoleData } from '../../redux/DepRoleSlice';
import DepartmentServices from "../../services/DepartmentServices";
import commonServices  from '../../services/CommonServices'



const Dashboard = () => {
  // department to  redux
  const getDepartmentfn = () => {
    DepartmentServices.getAllDepartments()
      .then((res) => {
        if (res) {
          // console.log(res.data.data)
          dispatch(DepData(res?.data?.data));
        } 
      })
      .catch((err) => {
        console.log("getdep error", err);
      });
  };
  // get roles ---------------------------------------------------
  const getRoles = () => {
    commonServices.getRole()
    .then((res) => {
      if (res.status==200) {
        // console.log(res.data.data)
        dispatch(RoleData(res?.data?.data));
        // EmployeServices.getEmployee();
      } else {
      }
    })
    .catch((err) => {
      console.log("get roles", err);
    });

};
  useEffect(() => {
    getDepartmentfn();
    getRoles();
  }, []);
  // redux
  // const dep = useSelector((state) => state.DepRole);
  // console.log("sAdminData",dep)
  const dispatch = useDispatch();
  //----------------------------------------------------------------
  return (
    <div>Dashboard</div>
  );
}
export default Dashboard;
