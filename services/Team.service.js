import axios from "../utils/api";

class TeamService {
  create(data) {
    return axios.post("/teams", data);
  }

  getAllUsersByTeamId(teamId) {
    return axios.get("/teams/" + teamId + "/users");
  }
}

export default new TeamService();
