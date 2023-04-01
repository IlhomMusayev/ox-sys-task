const localStorageKey = "token";

async function logout() {
  window.localStorage.removeItem(localStorageKey);
  window.location.assign("/");
}

export { logout, localStorageKey };
