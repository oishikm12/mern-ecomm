import axios from 'axios'

import { ThunkAction } from 'redux-thunk'

import { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAILURE } from '../Constants/orderConstants'

import { Ord } from '../Types/common'
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

export { createOrder }
