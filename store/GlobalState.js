import { createContext, useReducer, useEffect } from "react";
import reducers from "./Reducers";
import { getData } from "../utils/fetchData";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const initialState = {
    notify: {},
    auth: {},
    cart: [],
    modal: [],
    orders: [],
    users: [],
    brand: [],
  };
  const [state, dispatch] = useReducer(reducers, initialState);
  const { cart, auth } = state;

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      getData("auth/accessToken").then((res) => {
        if (res.err) return localStorage.removeItem("firstLogin");
        dispatch({
          type: "AUTH",
          payload: { token: res.access_token, user: res.user },
        });
      });
    }
  }, []);

  useEffect(() => {
    const next_cart = JSON.parse(localStorage.getItem("next_cart"));
    if (next_cart) dispatch({ type: "ADD_CART", payload: next_cart });
  }, []);

  useEffect(() => {
    localStorage.setItem("next_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (auth.token) {
      getData("order", auth.token).then((res) => {
        if (res.err)
          return dispatch({ type: "NOTIFY", payload: { error: res.err } });
        dispatch({ type: "ADD_ORDERS", payload: res.orders });
      });
    } else {
      dispatch({ type: "ADD_ORDERS", payload: [] });
      dispatch({ type: "ADD_USERS", payload: [] });
    }
  }, [auth.token]);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
