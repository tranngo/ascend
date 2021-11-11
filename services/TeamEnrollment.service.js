import axios from "../utils/api";

class TeamEnrollmentService {
  getAllByUserId(userId) {
    return axios.get("/teamenrollments/" + userId);
  }
}

export default new TeamEnrollmentService();
