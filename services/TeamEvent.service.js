import axios from "../utils/api";

class TeamEventService {
  create(data) {
    return axios.post("/teamevents", data);
  }

  getAllByTeamId(teamId) {
    return axios.get("/teamevents/" + teamId);
  }
}

export default new TeamEventService();
