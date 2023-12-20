import instance from "./AppInterceptor";
import ApiConfig from "../config/apiConfig";
class CommonServices {
 //  employess role 
  getRole() {
    return instance.get(ApiConfig.getRoles);
  }
}
export default new CommonServices();
