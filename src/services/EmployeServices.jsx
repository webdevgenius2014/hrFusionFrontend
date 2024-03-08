import instance from "./AppInterceptor";
import ApiConfig from "../config/apiConfig";
class EmployeService {
  addEmployee(payload) {
    return instance.post(ApiConfig.addEmployee, payload);
  }
  searchEmployee(payload) {
    return instance.post(ApiConfig.searchEmployee, payload);
  }
  editEmployee(payload) {
    return instance.post(ApiConfig.editEmployee, payload);
  }
  deleteEmployee(payload) {
    return instance.post(ApiConfig.deleteEmployee, payload);
  }
  viewEmployee(payload) {
    return instance.post(ApiConfig.viewEmployee, payload);
  }
  getEmployee(page) {
    return instance.get(`${ApiConfig.getEmployees}?page=${page}`);
  }
  getAllEmployees(page) {
    return instance.get(ApiConfig.getAllEmployees);
  }

  // feedback api 
  listFeedback() {
    return instance.get(ApiConfig.listFeedback);
  }
  viewFeedback(payload) {
    return instance.post(ApiConfig.viewFeedback, payload);
  }
  addFeedback(payload) {
    return instance.post(ApiConfig.addFeedback, payload);
  }
 
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new EmployeService();
