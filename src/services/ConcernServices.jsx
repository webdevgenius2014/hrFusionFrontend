import instance from "./AppInterceptor";
import ApiConfig from "../config/apiConfig";
class ConcernServices {
  editConcern(payload) {
    return instance.post(ApiConfig.updateConcernStatus, payload);
  }
  updateConcernStatus(payload) {
    return instance.post(ApiConfig.updateConcernStatus, payload);
  }
  addConcern(payload) {
    return instance.post(ApiConfig.addConcern, payload);
  }
  getAllConcern() {
    return instance.get(ApiConfig.getConcerns);
  }
  
}
export default new ConcernServices();
