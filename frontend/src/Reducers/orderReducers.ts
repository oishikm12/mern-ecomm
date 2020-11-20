import { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAILURE } from '../Constants/orderConstants'

import { OrderState, OrderAction } from '../Types/reducers'
import { Ord } from '../Types/common'

const initialState: OrderState = {}

/**
 * Performs an action on create order state
 * @param state Current State of order
 * @param action What to do to order
 */
const orderCreateReducer = (state: OrderState = initialState, action: OrderAction): OrderState => {
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

export { orderCreateReducer }
