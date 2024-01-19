import instance from "./ImageInterceptor";
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
}
export default new EmployeService();
