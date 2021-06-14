import { simbirSoftAPI } from "./../API/api";

const SET_ORDER_LIST = "SET_ORDER_LIST";
const SET_RESPONSE_ERROR = "SET_RESPONSE_ERROR";

let initialState = {
  orders: [],
  responseError: [],
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER_LIST: {
      return {
        ...state,
        ...action,
        orders: action.orders,
      };
    }
    case SET_RESPONSE_ERROR: {
      return {
        ...state,
        ...action,
        responseError: action.response,
      };
    }
    default:
      return state;
  }
};

export const setOrderList = (orders) => ({
  type: SET_ORDER_LIST,
  orders,
});

export const setResponseError = (response) => ({
  type: SET_RESPONSE_ERROR,
  response,
});

export const getOrderList = (page) => {
  return async (dispatch) => {
    const response = await simbirSoftAPI.getOrders(page);
    if (response.status !== 200) {
      dispatch(setResponseError(response));
    } else {
      dispatch(setOrderList(response.data));
    }
  };
};

export default orderReducer;