import { localStorageKey } from "configs/constants";
import { createContext, useEffect, useState } from "react";

const Context = createContext(null);
export const setToken = (token) => {
  window.localStorage.setItem(localStorageKey, token);
};
export const getToken = () => {
  return window.localStorage.getItem(localStorageKey);
};
export const removeToken = () => {
  window.localStorage.removeItem(localStorageKey);
};

function Provider({ children }) {
  const [state, setState] = useState(getToken());
  useEffect(() => {
    if (state) {
      setToken(state);
    } else {
      removeToken();
    }
  }, [state]);

  return (
    <Context.Provider value={{ state, setState }}>{children}</Context.Provider>
  );
}

export { Context, Provider };
