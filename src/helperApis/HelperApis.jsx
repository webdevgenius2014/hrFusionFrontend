import DepartmentServices from "../services/DepartmentServices";
import DesignationServices from "../services/DesignationServices";
import CommonServices from "../services/CommonServices";
import ClientsServices from "../services/ClientsServices";
import EmployeServices from "../services/EmployeServices";
import GeneralServices from "../services/GeneralServices";
export const getAllDepartmentfn = async () => {
  try {
    const res = await DepartmentServices.getAllDepartments();
    if (res.status === 200 && res?.data?.success === true) {
      // console.log("get all department", res?.data.data);
      return res.data.data;
    } else if (res.status === 200 && res?.data?.success === false) {
      return [];
    }
  } catch (err) {
    console.log("getDepartment", err);
  }
};

export const allDesignations = async () => {
  try {
    const res = await DesignationServices.getAllDesignations();
    if (res.status === 200 && res?.data?.success === true) {
      // console.log(res.data.data)
      return res?.data?.data;
    } else if (res.status === 200 && res?.data?.success === false) {
      return [];
    }
  } catch (err) {
    console.log("getDesignations", err);
  }
};
export const desByDep = async (payload) => {
  console.log(payload);
  try {
    const res = await DesignationServices.designationsByDep(payload);
        if (res.status === 200 && res?.data?.success === true) {
      // console.log(res.data.data)
      return res?.data?.data;
    } else if (res.status === 200 && res?.data?.success === false) {
      return [];
    }
  } catch (err) {
    console.log("desByDep", err);
  }
};

export const allRoles = async () => {
  try {
    const res = await CommonServices.getRole();
    if (res.status === 200 && res?.data?.success === true) {
      // console.log(res.data.data)
        return res?.data?.data;
    } else if (res.status === 200 && res?.data?.success === false) {
      return [];
    }
  } catch (err) {
    console.log("getRole", err);
  }
};
export const allClients = async () => {
  try {
    const res = await ClientsServices.getAllClients();
    if (res.status === 200 && res?.data?.success === true) {
      // console.log("client",res.data.data)
        return res?.data?.data;
    } else if (res.status === 200 && res?.data?.success === false) {
      return [];
    }
  } catch (err) {
    console.log("all clients", err);
  }
};
export const allEmployees = async () => {
  try {
    const res = await EmployeServices.getAllEmployees();
    if (res.status === 200 && res?.data?.success === true) {
      // console.log("allEmployees",res.data.data)
        return res?.data?.data;
    } else if (res.status === 200 && res?.data?.success === false) {
      return [];
    }
  } catch (err) {
    console.log("allEmployees", err);
  }
};

export const allLeads = async (url) => {
  try {
    let res;
    if(url==='hr')
     res = await CommonServices.getAllHRs();
    else if( url === 'team-leaders')
    res = await CommonServices.getAllTeamLeads();
    else if( url === 'team-managers') 
    res = await CommonServices.getAllTeamManagers();
        return res;
   
  } catch (err) {
    console.log("allEmployees", err);
  }
};
export const allDocList = async () => {
  try {
    const res = await GeneralServices.getAllDocumentTypes();
    if (res.status === 200 && res?.data?.success === true) {
      // console.log("all doc type",res.data.data)
        return res?.data?.data;
    } else if (res.status === 200 && res?.data?.success === false) {
      return [];
    }
  } catch (err) {
    console.log("allDocList", err);
  }
};

