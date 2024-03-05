import instance from "./AppInterceptor";
import ApiConfig from "../config/apiConfig";
class HolidayService {
  deleteHoliday(payload) {
    return instance.post(ApiConfig?.deleteHoliday, payload);
  }
  editHoliday(payload) {
    return instance.post(ApiConfig?.editHoliday, payload);
  }
  addHoliday(payload) {
    return instance.post(ApiConfig.addHoliday, payload);
  }

  getHolidays(page) {
    return instance.get(`${ApiConfig.getHolidays}?page=${page}`);
  }
  upComingHolidays() {
    return instance.get(ApiConfig.get_upcoming_holidays);
  }
  thisYearholidays() {
    return instance.get(ApiConfig.thisYear_holidays);
  }
  upcomingThreeHoliday() {
    return instance.get(ApiConfig.upcomingThreeHoliday);
  }
 
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new HolidayService();
