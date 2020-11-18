import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_ERR } from '../Constants/cartConstants'

import { CartState, CartAction } from '../Types/reducers'
import { CartItem } from '../Types/common'

const initialState: CartState = {
  cartItems: []
}

/**
 * Performs an action on cart state
 * @param state Current State of cart
 * @param action What to do to cart
 */
const cartReducer = (state: CartState = initialState, action: CartAction): CartState => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload as CartItem
      const existItem = state.cartItems.find((x) => x.product === item.product)

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) => (x.product === existItem.product ? item : x))
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item]
        }
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.product !== action.payload)
      }
    case CART_ERR:
      return {
        ...state,
        error: action.payload as string
      }
    default:
      return state
  }
}

export { cartReducer }
