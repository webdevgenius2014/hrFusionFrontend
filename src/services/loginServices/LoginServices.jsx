import instance from "./Logininterceptor";
import ApiConfig from "../../config/apiConfig";
class LoginService{
    superAdminLogin(payload) {
    return instance.post(ApiConfig.login, payload);
  }
    superAdminLogout() {
    return instance.get(ApiConfig.logout);
  }
}
export default new LoginService();
