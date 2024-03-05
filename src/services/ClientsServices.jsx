import instance from "./AppInterceptor";
import ApiConfig from "../config/apiConfig";
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
  getClients(page) {
    // console.log(`${ApiConfig.getClients}?page=${page}`)
    return instance.get(`${ApiConfig.getClients}?page=${page}`);
  }
  viewClient(payload) {
    // console.log(`${ApiConfig.getClients}?page=${page}`)
    return instance.post(ApiConfig.viewClient,payload);
  }
  getAllClients() {
    return instance.get(ApiConfig.getAllClients);
  }
  sendMessageToClient(payload) {
    return instance.post(ApiConfig.sendMessageToClient , payload);
  }
  uploadClientCSV(payload) {
    return instance.post(ApiConfig.uploadClientCSV ,payload );
  }
}

export default new ClientService();