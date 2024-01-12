import instance from "./AppInterceptor";
import ApiConfig from "../config/apiConfig";
class DepartmentServices {
  deleteDepartment(payload) {
    return instance.post(ApiConfig.deleteDepartment, payload);
  }
  editDepartment(payload) {
    return instance.post(ApiConfig.editDepartment, payload);
  }
  addDepartment(payload) {
    return instance.post(ApiConfig.addDepartment, payload);
  }
  getDepartments(page) {
    return instance.get(`${ApiConfig.getDepartments}?page=${page}`);
  }
  getAllDepartments() {
    return instance.get(ApiConfig.getAllDepartments);
  }
}
export default new DepartmentServices();
