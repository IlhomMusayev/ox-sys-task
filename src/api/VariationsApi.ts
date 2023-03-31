import axios from "axios";
import { API_URL } from "configs/constants";

export default class VariationsApi {
  static async GetVariations(data: any) {
    return axios({
      method: "GET",
      url: API_URL + "/variations",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((r) => r.data);
  }
}
