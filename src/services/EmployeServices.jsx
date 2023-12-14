import instance from "./AppInterceptor";
import ApiConfig from "../config/apiConfig";
class EmployeService {
  addEmployee(payload) {
    return instance.post(ApiConfig.addEmployee, payload);
  }
  editEmployee(payload) {
    return instance.post(ApiConfig.editEmployee, payload);
  }
  deleteEmployee(payload) {
    return instance.post(ApiConfig.deleteEmployee, payload);
  }
  getEmployee() {
    console.log("updating get employee data...");
    return instance.get(ApiConfig.getEmployees);
  }
}
export default new EmployeService();
