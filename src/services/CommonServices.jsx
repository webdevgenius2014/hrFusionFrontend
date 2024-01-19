import instance from "./AppInterceptor";
import ApiConfig from "../config/apiConfig";
class CommonServices {
 //  employess role 
  getRole() {
    return instance.get(ApiConfig.getRoles);
  }
  changePass(payload) {
    return instance.post(ApiConfig.updatepassword,payload);
  }
  dashboard() {
    return instance.get(ApiConfig.dashboard);
  }
  empBirthday() {
    return instance.get(ApiConfig.getBirthday);
  }
}
export default new CommonServices();
