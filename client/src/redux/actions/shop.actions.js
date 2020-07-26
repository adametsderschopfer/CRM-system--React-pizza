import Axios from "axios";

import {
  DELETE_CART_ELEMENTS,
  IS_BUIED_T,
  FILL_CONTENT,
  LOADING_ON,
  LOADING_OFF,
} from "../types";

export const fetchContent = () => {
  return (dispatch) => {
    dispatch({ type: LOADING_ON });
    Axios.get("/api/pizzas").then(async (r) => {
      const data = await r.data.map((i) => {
        i.id = i._id;
        delete i._id;
        return i;
      });

      if (localStorage.getItem("cart")) {
        await JSON.parse(localStorage.getItem("cart")).map((i) => {
          data.map((j) => {
            if (i.id === j.id) {
              j.isAdded = i.isAdded;
            }

            return j;
          });

          return i
        });
      }
      await dispatch({ type: FILL_CONTENT, content: data });

      dispatch({ type: LOADING_OFF });
    });
  };
};

export const createOrderAndFetch = (order, phone) => {
  return (dispatch) => {
    Axios.post("/api/createOrder", { phone, order }).then(() => {
      dispatch({ type: DELETE_CART_ELEMENTS });
      dispatch({ type: IS_BUIED_T });
    });
  };
};
