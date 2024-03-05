import instance from "./AppInterceptor";
import ApiConfig from "../config/apiConfig";
class LeavesServices {
  updateLeaveStatus(payload) {
    return instance.post(ApiConfig.updateLeaveStatus, payload);
  }
  editLeave(payload) {
    return instance.post(ApiConfig.editLeave, payload);
  }
  addLeave(payload) {
    return instance.post(ApiConfig.addLeave, payload);
  }
  getLeaves() {
    return instance.get(ApiConfig.getLeaves);
  }
  getLeaveByStatus(payload) {
    return instance.get(ApiConfig.getLeaveByStatusz, payload);
  }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new LeavesServices();
