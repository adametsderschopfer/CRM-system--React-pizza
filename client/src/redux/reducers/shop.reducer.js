import {
  IS_ADDED_TO_CARD,
  UN_ADDED_TO_CARD,
  UN_ADDED_ALL_TO_CARD,
  FILL_CONTENT,
  IS_BUIED_F,
  IS_BUIED_T,
  LOADING_ON,
  LOADING_OFF
} from "../types";

const initialState = {
  pizzas: null,
  isBuied: false,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FILL_CONTENT: {
      return { ...state, pizzas: [...action.content] };
    }

    case LOADING_ON: {
      return {...state, loading: true}
    }
    
    case LOADING_OFF: {
      return {...state, loading: false}
    }

    case IS_BUIED_T: {
      return { 
        ...state, isBuied: true
      }
    }

    case IS_BUIED_F: {
      return { 
        ...state, isBuied: false
      }
    }

    case IS_ADDED_TO_CARD:
      return {
        ...state,
        pizzas: state.pizzas.map((i) => {
          if (i.id === action.id) {
            i.isAdded = true;
          }

          return i;
        }),
      };

    case UN_ADDED_ALL_TO_CARD: {
      return {
        ...state,
        pizzas: state.pizzas.map((i) => {
          i.isAdded = false;
          return i;
        }),
      };
    }

    case UN_ADDED_TO_CARD:
      return {
        ...state,
        pizzas: state.pizzas.map((i) => {
          if (i.id === action.id) {
            i.isAdded = false;
          }

          return i;
        }),
      };

    default:
      return state;
  }
};
