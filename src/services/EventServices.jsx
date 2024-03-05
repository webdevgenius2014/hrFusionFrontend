import instance from "./AppInterceptor";
import ApiConfig from "../config/apiConfig";
class EventService {
    deleteEvent(payload) {
    return instance.post(ApiConfig.deleteEvent, payload);
  }
  editEvent(payload) {
    return instance.post(ApiConfig.editEvent, payload);
  }
  addEvent(payload) {
    return instance.post(ApiConfig.addEvent, payload);
  }
  getEvents() {
    return instance.get(ApiConfig.getEvents);
  }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new EventService();
