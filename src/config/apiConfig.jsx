const apiURL = process.env.REACT_APP_API_BASE_URL + "/api/";

const ApiConfig = {
  login: `${apiURL}login`,
  logout: `${apiURL}logout`,
  updatepassword: `${apiURL}update-password`,
  getBirthday: `${apiURL}sixMonthUpcoming-birthday`,

  // Dashboard ----------------------------------------------------------------
  dashboard: `${apiURL}dashboard`,

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
  viewEmployee: `${apiURL}viewEmployee`,
  getAllEmployees: `${apiURL}getAllEmployees`,

  // designations acording to the department
  designationList: `${apiURL}designationList`,
  // role ---------------------------------------------
  getRoles: `${apiURL}getRoles`,

  // Clients --------------------------------
  getClients: `${apiURL}getClients`,
  addClient: `${apiURL}addClient`,
  editClient: `${apiURL}editClient`,
  deleteClient: `${apiURL}deleteClient`,
  searchClient: `${apiURL}searchClient`,
  viewClient: `${apiURL}viewClient`,
  getAllClients: `${apiURL}getAllClients`,

  // Projects
  getProjects: `${apiURL}getProjects`,
  addProject: `${apiURL}addProject`,
  editProject: `${apiURL}editProject`,
  deleteProject: `${apiURL}deleteProject`,
  viewProject: `${apiURL}viewProject`,
  searchProject: `${apiURL}searchProject`,

  // Tamplate
  getTemplate: `${apiURL}getTemplate`,
  getAllTemplates: `${apiURL}getAllTemplates`,
  addTemplate: `${apiURL}addTemplate`,
  editTemplate: `${apiURL}editTemplate`,
  deleteTemplate: `${apiURL}deleteTemplate`,
  viewTemplate: `${apiURL}viewTemplate`,

  // all common view ------------------------------
  getAllTeamLeads: `${apiURL}getAllTeamLeads`,
  getAllHRs : `${apiURL}getAllHRs `,
  getAllTeamManagers : `${apiURL}getAllTeamManagers `,

  // addChannel ------------------------------
  addChannel: `${apiURL}addChannel`,
  editChannel: `${apiURL}editChannel`,
  getAllChannels: `${apiURL}getAllChannels`,
  deleteChannel: `${apiURL}deleteChannel`,

  // Lead Platform ------------------------------
  addPlatform: `${apiURL}addPlatform`,
  editPlatform: `${apiURL}editPlatform`,
  getAllPlatforms: `${apiURL}getAllPlatforms`,
  deletePlatform: `${apiURL}deletePlatform`,

  // get getAllPlatforms() {
  //   return this._getAllPlatforms;
  // },
  // set getAllPlatforms(value) {
  //   this._getAllPlatforms = value;
  // },

  // send email -----------------------------
  sendMessageToClient: `${apiURL}sendMessageToClient`,

  // Csv upload -----------------------------
  uploadClientCSV: `${apiURL}uploadClientCSV`,

  // Document   -----------------------------
  getAllDocumentTypes: `${apiURL}getAllDocumentTypes`,
  addDocumentType: `${apiURL}addDocumentType`,
  editDocumentType: `${apiURL}editDocumentType`,
  deleteDocumentType: `${apiURL}deleteDocumentType`,

  // department all --------------------------------
  getHolidays: `${apiURL}getHolidays`,
  get_upcoming_holidays: `${apiURL}get-upcoming-holidays`,
  addHoliday: `${apiURL}addHoliday`,
  editHoliday: `${apiURL}editHoliday`,
  deleteHoliday: `${apiURL}deleteHoliday`,
  thisYear_holidays: `${apiURL}thisYear-holidays`,
  upcomingThreeHoliday: `${apiURL}upcomingThreeHoliday`,

  // event all api
  getEvents: `${apiURL}getEvents`,
  addEvent: `${apiURL}addEvent`,
  editEvent: `${apiURL}editEvent`,
  deleteEvent: `${apiURL}deleteEvent`,
  
  // Leaves 
  getLeaves : `${apiURL}getLeaves`,
  updateLeaveStatus : `${apiURL}updateLeaveStatus`,
  getLeaveByStatus : `${apiURL}getLeaveByStatus`,
  editLeave : `${apiURL}editLeave`,
  addLeave : `${apiURL}addLeave`,
  searchLeave : `${apiURL}searchLeaves`,

  // employees feedback
  addFeedback : `${apiURL}addFeedback`,
  viewFeedback : `${apiURL}viewFeedback`,
  listFeedback : `${apiURL}listFeedback`,
};

export default ApiConfig;
