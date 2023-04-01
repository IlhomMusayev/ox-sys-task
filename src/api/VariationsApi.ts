import QueryString from "qs";
import mainApiInstence from "./mainApiInstence";

export default class VariationsApi {
  static async GetVariations(filter: any) {
    return mainApiInstence
      .get(`/variations?${QueryString.stringify(filter)}`)
      .then((r) => r.data)
      .catch((e) => e);
  }
}
