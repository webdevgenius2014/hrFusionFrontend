import instance from "./ImageInterceptor";
import ApiConfig from "../config/apiConfig";
class GeneralServices {
    deleteChannel(payload) {
    return instance.post(ApiConfig.deleteChannel, payload);
  }
  editChannel(payload) {
    return instance.post(ApiConfig.editChannel, payload);
  }
  addChannel(payload) {
    return instance.post(ApiConfig.addChannel, payload);
  }
  getAllChannels() {
    // console.log(`${ApiConfig.getClients}?page=${page}`)
    return instance.get(ApiConfig.getAllChannels);
  }
  deletePlatform(payload) {
    return instance.post(ApiConfig.deletePlatform, payload);
  }
  editPlatform(payload) {
    return instance.post(ApiConfig.editPlatform, payload);
  }
  addPlatform(payload) {
    return instance.post(ApiConfig.addPlatform, payload);
  }
  getAllPlatforms() {
    // console.log(`${ApiConfig.getClients}?page=${page}`)
    return instance.get(ApiConfig.getAllPlatforms);
  }
 
}

export default new GeneralServices();