const apiURL = process.env.REACT_APP_API_BASE_URL + "/api/";

const ApiConfig = {
  login: `${apiURL}login`,
  logout: `${apiURL}logout`,
  "update-password": `${apiURL}update-password`,

  // department all --------------------------------
  getDepartments: `${apiURL}getDepartments`,
  getAllDepartments: `${apiURL}getAllDepartments`,
  addDepartment: `${apiURL}addDepartment`,
  editDepartment: `${apiURL}editDepartment`,
  deleteDepartment: `${apiURL}deleteDepartment`,

  // description all -----------------------------------
  getDesignations: `${apiURL}getDesignations`,
  addDesignation: `${apiURL}addDesignation`,
  editDesignation: `${apiURL}editDesignation`,
  deleteDesignation: `${apiURL}deleteDesignation`,
  getAllDesignations: `${apiURL}getAllDesignations`,
  
  // employee all -----------------------------------
  getEmployees: `${apiURL}getEmployees`,
  addEmployee: `${apiURL}addEmployee`,
  editEmployee: `${apiURL}editEmployee`,
  deleteEmployee: `${apiURL}deleteEmployee`,
  searchEmployee: `${apiURL}searchEmployee`,
  

  // designations acording to the department 
  designationList : `${apiURL}designationList`,
  // role ---------------------------------------------
  getRoles:`${apiURL}getRoles`,

  // Clients --------------------------------
  getClients: `${apiURL}getClients`,
  addClient: `${apiURL}addClient`,
  editClient: `${apiURL}editClient`,
  deleteClient: `${apiURL}deleteClient`,
  searchClient: `${apiURL}searchClient`,
  viewClient: `${apiURL}viewClient`,


  // Projects 
  getProjects: `${apiURL}getProjects`,
  addProject: `${apiURL}addProject`,
  editProject: `${apiURL}editProject`,
  deleteProject: `${apiURL}deleteProject`,
  viewProject: `${apiURL}viewProject`,
  searchProject: `${apiURL}searchProject`,

};

export default ApiConfig;
