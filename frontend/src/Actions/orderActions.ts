import axios from 'axios'

import { ThunkAction } from 'redux-thunk'

import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAILURE,
  ORDER_DETAILS_FAILURE,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_PAY_FAILURE,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_LIST_SELF_REQUEST,
  ORDER_LIST_SELF_SUCCESS,
  ORDER_LIST_SELF_FAILURE
} from '../Constants/orderConstants'

import { Ord, Payment } from '../Types/common'
import { OrderAction } from '../Types/reducers'

import { ReducerState } from '../store'

/**
 * Creates a new order
 * @param order Data about an order
 */
const createOrder = (order: Ord): ThunkAction<void, ReducerState, unknown, OrderAction> => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST
    })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo?.token}`
      }
    }

    const { data }: { data: Ord } = await axios.post(`/api/orders`, order, config)

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data
    })
  } catch (err) {
    dispatch({
      type: ORDER_CREATE_FAILURE,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message
    })
  }
}

/**
 * Fetches an order
 * @param id Order id to fetch
 */
const getOrderDetails = (id: string): ThunkAction<void, ReducerState, unknown, OrderAction> => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST
    })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo?.token}`
      }
    }

    const { data }: { data: Ord } = await axios.get(`/api/orders/${id}`, config)

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data
    })
  } catch (err) {
    dispatch({
      type: ORDER_DETAILS_FAILURE,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message
    })
  }
}

/**
 * Payment of an order
 * @param id Order id to fetch
 */
const payOrder = (id: string, paymentResult: Payment): ThunkAction<void, ReducerState, unknown, OrderAction> => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST
    })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo?.token}`
      }
    }

    const { data }: { data: Ord } = await axios.put(`/api/orders/${id}/pay`, paymentResult, config)

    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data
    })
  } catch (err) {
    dispatch({
      type: ORDER_PAY_FAILURE,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message
    })
  }
}

/**
 * Lists all orders
 */
const listSelfOrders = (): ThunkAction<void, ReducerState, unknown, OrderAction> => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_SELF_REQUEST
    })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo?.token}`
      }
    }

    const { data }: { data: Ord[] } = await axios.get(`/api/orders/myorders`, config)

    dispatch({
      type: ORDER_LIST_SELF_SUCCESS,
      payload: data
    })
  } catch (err) {
    dispatch({
      type: ORDER_LIST_SELF_FAILURE,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message
    })
  }
}

export { createOrder, getOrderDetails, payOrder, listSelfOrders }
