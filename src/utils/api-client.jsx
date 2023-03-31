import * as auth from "./auth-provider";
import apiURL from "../configs/constants";

function client(
  endpoint,
  { data, token, headers: customHeaders, method, ...customConfig } = {}
) {
  console.log(data, customHeaders, method);
  const config = {
    method: method,
    body: data,
    headers: {
      ...customHeaders,
      Authorization: token ? `Bearer ${token}` : "",
    },
    ...customConfig,
  };

  return window
    .fetch(`${apiURL.API_URL}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        await auth.logout();
        // window.location.assign("/");
      } else if (response.status === 403) {
        await auth.logout();
        // window.location.assign("/");
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
}

export { client };
