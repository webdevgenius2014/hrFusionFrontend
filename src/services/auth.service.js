import axios from "axios";
import instance from '../AppInterceptor'
const apiURl=process.env.NEXT_PUBLIC_API_URL
const BASE_API = apiURl+"/api/";
import ApiConfig from '../config/apiConfig';
class AuthService {  
  loginUser(username){
    let payload = {username:username} 
    return instance.post(ApiConfig.registerLogin, payload)  
  }    
  getCurrentUser() {
    return JSON.parse(sessionStorage.getItem('user_data'));
  }
}
export default new AuthService();