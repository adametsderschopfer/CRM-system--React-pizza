import {
  DELETE_CART_ELEMENT,
  DELETE_CART_ELEMENTS,
  DECREMENT_PIZZA_COUNTER,
  INCREMENT_PIZZA_COUNTER,
  ADD_TO_CART_ELEMENT,
  CHECK_LS_ITEMS,
} from "../types";

const initialState = {
  cart: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DELETE_CART_ELEMENT: {
      const cart = state.cart.filter((i) => +i.id !== +action.id);
      localStorage.setItem("cart", JSON.stringify(cart));

      return { ...state, cart };
    }

    case DELETE_CART_ELEMENTS: {
      localStorage.setItem("cart", JSON.stringify([]));

      return { ...state, cart: [] };
    }

    case DECREMENT_PIZZA_COUNTER: {
      const cart = state.cart.map((i) => {
        if (i.id === action.id) {
          if (i.quantity !== 1) {
            i.quantity = i.quantity - 1;
          }
        }

        return i;
      });

      localStorage.setItem("cart", JSON.stringify(cart));

      return {
        ...state,
        cart,
      };
    }

    case INCREMENT_PIZZA_COUNTER: {
      const cart = state.cart.map((i) => {
        if (i.id === action.id) {
          if (i.quantity !== 99) {
            i.quantity = i.quantity + 1;
          }
        }

        return i;
      });

      localStorage.setItem("cart", JSON.stringify(cart));

      return {
        ...state,
        cart,
      };
    }

    case ADD_TO_CART_ELEMENT: {
      localStorage.setItem(
        "cart",
        JSON.stringify([...state.cart, action.pizza])
      );

      return {
        ...state,
        cart: [...state.cart, action.pizza],
      };
    }

    case CHECK_LS_ITEMS: {
      if (localStorage.getItem("cart")) {
        return {
          ...state,
          cart: [...state.cart, ...JSON.parse(localStorage.getItem("cart"))],
        };
      } else {
        localStorage.setItem("cart", JSON.stringify([]));
        return state
      }
    }

    default:
      return state;
  }
};
