import axios from "../utils/api";

class TeamEventService {
  getAll() {
    return axios.get("/teamevents");
  }

  create(data) {
    return axios.post("/teamevents", data);
  }
}

export default new TeamEventService();
