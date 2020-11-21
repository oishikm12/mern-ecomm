import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAILURE,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAILURE,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAILURE,
  ORDER_PAY_RESET,
  ORDER_LIST_SELF_FAILURE,
  ORDER_LIST_SELF_SUCCESS,
  ORDER_LIST_SELF_REQUEST,
  ORDER_LIST_SELF_RESET
} from '../Constants/orderConstants'

import { OrderState, OrderAction, OrderListState, OrderSelfAction } from '../Types/reducers'
import { Ord } from '../Types/common'

const initialOrderState: OrderState = {}

/**
 * Performs an action on create order state
 * @param state Current State of order
 * @param action What to do to order
 */
const orderCreateReducer = (state: OrderState = initialOrderState, action: OrderAction): OrderState => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true
      }
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload as Ord
      }
    case ORDER_CREATE_FAILURE:
      return {
        loading: false,
        error: action.payload as string
      }
    default:
      return state
  }
}

const initialOrderDetailState: OrderState = {
  loading: true,
  order: {
    paymentMethod: '',
    orderItems: [],
    shippingAddress: {}
  }
}

/**
 * Performs an action on order details state
 * @param state Current State of order
 * @param action What to do to order
 */
const orderDetailsReducer = (state: OrderState = initialOrderDetailState, action: OrderAction): OrderState => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload as Ord
      }
    case ORDER_DETAILS_FAILURE:
      return {
        loading: false,
        error: action.payload as string
      }
    default:
      return state
  }
}

/**
 * Performs an action on order payment state
 * @param state Current State of order
 * @param action What to do to order
 */
const orderPayReducer = (state: OrderState = initialOrderState, action: OrderAction): OrderState => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        ...state,
        loading: true
      }
    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true
      }
    case ORDER_PAY_FAILURE:
      return {
        loading: false,
        error: action.payload as string
      }
    case ORDER_PAY_RESET:
      return {}
    default:
      return state
  }
}

const initialOrderListState: OrderListState = {
  orders: []
}

/**
 * Gets all of users orders
 * @param state Current State of order list
 * @param action Status of list
 */
const orderListSelfReducer = (
  state: OrderListState = initialOrderListState,
  action: OrderSelfAction
): OrderListState => {
  switch (action.type) {
    case ORDER_LIST_SELF_REQUEST:
      return {
        ...state,
        loading: true
      }
    case ORDER_LIST_SELF_SUCCESS:
      return {
        loading: false,
        orders: action.payload as Ord[]
      }
    case ORDER_LIST_SELF_FAILURE:
      return {
        loading: false,
        error: action.payload as string
      }
    case ORDER_LIST_SELF_RESET:
      return {
        orders: []
      }
    default:
      return state
  }
}

export { orderCreateReducer, orderDetailsReducer, orderPayReducer, orderListSelfReducer }
