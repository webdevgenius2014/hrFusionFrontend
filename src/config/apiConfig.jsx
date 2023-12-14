const apiURL = process.env.REACT_APP_API_BASE_URL + "/api/";

const ApiConfig = {
  login: `${apiURL}login`,
  "update-password": `${apiURL}update-password`,

  // department all --------------------------------
  getDepartments: `${apiURL}getDepartments`,
  addDepartment: `${apiURL}addDepartment`,
  editDepartment: `${apiURL}editDepartment`,
  deleteDepartment: `${apiURL}deleteDepartment`,

  // description all -----------------------------------
  getDesignations: `${apiURL}getDesignations`,
  addDesignation: `${apiURL}addDesignation`,
  editDesignation: `${apiURL}editDesignation`,
  deleteDesignation: `${apiURL}deleteDesignation`,
  // employee all -----------------------------------
  getEmployees: `${apiURL}getEmployees`,
  addEmployee: `${apiURL}addEmployee`,
  editEmployee: `${apiURL}editEmployee`,
  deleteEmployee: `${apiURL}deleteEmployee`,
};

export default ApiConfig;
