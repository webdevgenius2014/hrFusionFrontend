import instance from "./AppInterceptor";
import ApiConfig from "../config/apiConfig";
class DesignationServices {
  deleteDesignation(payload) {
    return instance.post(ApiConfig.deleteDesignation, payload);
  }
  editDesignation(payload) {
    return instance.post(ApiConfig.editDesignation, payload);
  }
  addDesignation(payload) {
    return instance.post(ApiConfig.addDesignation, payload);
  }
  designationsByDep(payload) {
    return instance.post(ApiConfig.designationList,payload);
  }
  getDesignations(page) {
    return instance.get(`${ApiConfig.getDesignations}?page=${page}`);
  }
  getAllDesignations() {
    return instance.get(ApiConfig.getAllDesignations);
  }

}

export default new DesignationServices();
