import axios, { AxiosRequestHeaders } from "axios";
import { getToken } from "contexts/AuthContext";
import { logout } from "utils/auth-provider";

export const mainUrl = () => process.env.API_URL || `https://toko.ox-sys.com/`;

const mainApiInstence = axios.create({
  baseURL: mainUrl(),
  headers: {
    Accept: "application/json",
  },
});
// mainApiInstence.interceptors.
mainApiInstence.interceptors.request.use(function (config) {
  // Do something before request is sent

  config.headers = <AxiosRequestHeaders>{};

  config.headers.Authorization = "Bearer " + getToken();

  return config;
});

mainApiInstence.interceptors.response.use(
  (config) => config,
  function (err) {
    // Do something with request error
    if (err.message === "Network error") {
      err.message =
        "Internet bilan bog'liq muammo. Internetni tekshiring yoki dasturchiga bog'laning";
    } else if (err.response.status === 401 || err.response.status === 403) {
      logout();
    }

    return Promise.reject(err);
  }
);

export default mainApiInstence;
