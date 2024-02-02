import instance from "./AppInterceptor";
import ApiConfig from "../config/apiConfig";
class TemplateServices {
  deleteTemplate(payload) {
    return instance.post(ApiConfig.deleteTemplate, payload);
  }
  editTemplate(payload) {
    return instance.post(ApiConfig.editTemplate, payload);
  }
  addTemplate(payload) {
    return instance.post(ApiConfig.addTemplate, payload);
  }

  getTemplate(page) {
    return instance.get(`${ApiConfig.getTemplate}?page=${page}`);
  }
  getAllTemplates(page) {
    return instance.get(ApiConfig.getAllTemplates);
  }
  viewTemplate(payload) {
    return instance.get(ApiConfig.viewTemplate, payload);
  }
}

export default new TemplateServices();
