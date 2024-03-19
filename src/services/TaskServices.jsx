import instance from "./AppInterceptor";
import ApiConfig from "../config/apiConfig";
class TaskService {
  addTask(payload) {
    return instance.post(ApiConfig?.addTask, payload);
  }
  editTask(payload) {
    return instance.post(ApiConfig?.editTask, payload);
  }
  viewTask(payload) {
    return instance.post(ApiConfig.viewTask, payload);
  }
  deleteTask(payload) {
    return instance.post(ApiConfig.deleteTask, payload);
  }
  updateTaskStatus(payload) {
    return instance.post(ApiConfig.updateTaskStatus, payload);
  }
  myTaskList(page) {
    return instance.get(`${ApiConfig.myTaskList}`);
  }
  getTaskList() {
    return instance.get(ApiConfig.getTaskList);
  }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new TaskService();
