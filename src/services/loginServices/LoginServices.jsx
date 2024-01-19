import instance from "./Logininterceptor";
import ApiConfig from "../../config/apiConfig";
class LoginService{
    superAdminLogin(payload) {
    return instance.post(ApiConfig.login, payload);
  }
    superAdminLogout() {
    return instance.post(ApiConfig.logout);
  }
    changePass(payload) {
    return instance.post(ApiConfig.updatepassword, payload);
  }
}
export default new LoginService();
