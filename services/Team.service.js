import axios from "../utils/api";

class TeamService {
  create(data) {
    return axios.post("/teams", data);
  }
}

export default new TeamService();
