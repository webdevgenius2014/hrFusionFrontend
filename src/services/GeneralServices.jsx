import instance from "./AppInterceptor";
import ApiConfig from "../config/apiConfig";
class GeneralServices {
  // channel -------------------------------------------------------------------
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

// platform ----------------------------------------------------------------

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

// Document upload  ----------------------------------------------------------------

deleteDocumentType(payload) {
    return instance.post(ApiConfig.deleteDocumentType, payload);
  }
  editDocumentType(payload) {
    return instance.post(ApiConfig.editDocumentType, payload);
  }
  addDocumentType(payload) {
    return instance.post(ApiConfig.addDocumentType, payload);
  }
  getAllDocumentTypes() {
    // console.log(`${ApiConfig.getClients}?page=${page}`)
    return instance.get(ApiConfig.getAllDocumentTypes);
  }
 
}

export default new GeneralServices();