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
    let contentType='application/json'    
    request.headers = {
        'Access-Control-Allow-Origin': '*',          
        'x-access-token': `Bearer ${token}`,
        'Content-Type': contentType,
        Accept: '*/*',
    } 
    return request;
}
const errorHandler = async error => {    
    const originalConfig = error.config;
    handleUnauthorizedToken(error.response);
    return error.response        
}

// const handleUnauthorizedToken=(response)=>{       
//     if(response?.status===400 && response.data.message==="Cannot read properties of undefined (reading 'status')"){        
//         window.location.href = "/logout";
//     }
// }

export default instance;