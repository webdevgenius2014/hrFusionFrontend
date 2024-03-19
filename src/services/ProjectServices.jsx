import instance from "./AppInterceptor";
import ApiConfig from "../config/apiConfig";
class ProjectsServices {
  viewProjects(payload) {
    return instance.post(ApiConfig.viewProject, payload);
  }
  searchProjects(payload) {
    return instance.post(ApiConfig.searchProject, payload);
  }
  deleteProjects(payload) {
    return instance.post(ApiConfig.deleteProject, payload);
  }
  editProjects(payload) {
    return instance.post(ApiConfig.editProject, payload);
  }
  addProjects(payload) {
    return instance.post(ApiConfig.addProject, payload);
  }
  projByEmployee(payload) {
    return instance.post(ApiConfig.projByEmployee, payload);
  }
  getProjects(page) {
    return instance.get(`${ApiConfig.getProjects}?page=${page}`);
  }
}
export default new ProjectsServices();
