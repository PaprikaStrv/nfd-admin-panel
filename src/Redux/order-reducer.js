import { simbirSoftAPI } from "./../API/api";

const SET_ORDER_LIST = "SET_ORDER_LIST";
const SET_RESPONSE_ERROR = "SET_RESPONSE_ERROR";
const SET_ORDER = "SET_ORDER";

let initialState = {
  orders: [],
  responseError: [],
  order: [],
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER_LIST: {
      return {
        ...state,
        orders: action.orders,
      };
    }
    case SET_ORDER: {
      return {
        ...state,
        order: action.order,
      };
    }
    case SET_RESPONSE_ERROR: {
      return {
        ...state,
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

export const setOrder = (order) => ({
  type: SET_ORDER,
  order,
});

export const getOrderList = (pageNumber, cityId, orderStatusId) => {
  return async (dispatch) => {
    const response = await simbirSoftAPI.getOrders(
      pageNumber,
      cityId,
      orderStatusId
    );
    if (response.status !== 200) {
      dispatch(setResponseError(response));
    } else {
      dispatch(setOrderList(response.data));
    }
  };
};

export const getOrder = (id) => {
  return async (dispatch) => {
    const response = await simbirSoftAPI.getOrder(id);
    dispatch(setOrder(response));
  };
};

export default orderReducer;
