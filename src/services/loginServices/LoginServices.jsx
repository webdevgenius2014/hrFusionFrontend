import instance from "./Logininterceptor";
import ApiConfig from "../../config/apiConfig";
class LoginService{
    superAdminLogin(payload) {
    return instance.post(ApiConfig.login, payload);
  }
   
    changePass(payload) {
    return instance.post(ApiConfig.updatepassword, payload);
  }
}
export default new LoginService();
