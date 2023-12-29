import instance from "./ClientInterceptor";
import ApiConfig from "../../config/apiConfig";
class ClientService {
  deleteClient(payload) {
    return instance.post(ApiConfig.deleteClient, payload);
  }
  editClient(payload) {
    return instance.post(ApiConfig.editClient, payload);
  }
  addClient(payload) {
    console.log("add cloent api" ,payload)

    return instance.post(ApiConfig.addClient, payload);
  }
  searchClient(payload) {
    return instance.post(ApiConfig.searchClient, payload);
  }
  getClients() {
    return instance.get(ApiConfig.getClients);
  }
}
export default new ClientService();
