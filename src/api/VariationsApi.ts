import axios from "axios";
import { API_URL } from "configs/constants";
import QueryString from "qs";
import { logout } from "utils/auth-provider";
import mainApiInstence from "./mainApiInstence";

export default class VariationsApi {
  static async GetVariations(filter: any) {
    return mainApiInstence
      .get(`/variations?${QueryString.stringify(filter)}`)
      .then((r) => r.data)
      .catch((e) => e);
  }
}
