import axios from "../utils/api";

class ChampionPoolService {
  create(data) {
    return axios.post("/championpool", data);
  }

  getChampionPoolByUserId(userId) {
    return axios.get("/championpool/" + userId);
  }
}

export default new ChampionPoolService();
