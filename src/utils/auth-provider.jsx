import { localStorageKey } from "configs/constants";

async function logout() {
  window.localStorage.removeItem(localStorageKey);
  window.location.assign("/");
}

export { logout, localStorageKey };
