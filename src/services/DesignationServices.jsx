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
  getDesignations() {
    return instance.get(ApiConfig.getDesignations);
  }
  designationsByDep(payload) {
    return instance.post(ApiConfig.designationList,payload);
  }

}

export default new DesignationServices();
