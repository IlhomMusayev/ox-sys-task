import axios from "axios";
import { API_URL } from "configs/constants";

export default class AuthApi {
  static async login(data: any) {
    return axios({
      method: "POST",
      url: API_URL + "/security/auth_check",
      data,
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    }).then((r) => r.data);
  }
}
