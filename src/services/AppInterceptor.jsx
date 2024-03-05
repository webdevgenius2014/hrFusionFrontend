import axios from "axios";
const instance = axios.create({});
instance.interceptors.request.use(request => requestHandler(request));
instance.interceptors.response.use(
    response => {
        return response
    },
    (error)=> errorHandler(error),    
);
const requestHandler = async request => {   
    // let token = useSelector((state) => state.SuperAdmin.token); 
    let token =sessionStorage.getItem("token");
    request.headers = {
        Accept: "application/json",
        'Content-Type': 'multipart/form-data',
            Authorization: "Bearer " + token,
    } 
    return request;
}
const errorHandler = async error => {
    const originalConfig = error.config; 
    return error.response  
}

export default instance;