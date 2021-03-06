import axios from 'axios'

import { ThunkAction } from 'redux-thunk'

import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_ERR,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD
} from '../Constants/cartConstants'

import { Addr, CartItem, Prod } from '../Types/common'
import { CartAction } from '../Types/reducers'

import { ReducerState } from '../store'

/**
 * Adds items to cart
 * @param id ID of the product
 * @param qty No. of items to buy
 */
const addToCart = (id: string, qty: number): ThunkAction<void, ReducerState, unknown, CartAction> => async (
  dispatch,
  getState
) => {
  try {
    const { data }: { data: Prod } = await axios.get(`/api/products/${id}`)

    const info: CartItem = {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty
    }

    dispatch({
      type: CART_ADD_ITEM,
      payload: info
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
  } catch (err) {
    dispatch({
      type: CART_ERR,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message
    })
  }
}

/**
 * Removes an item from cart
 * @param id Unique id of user
 */
const removeFromCart = (id: string): ThunkAction<void, ReducerState, unknown, CartAction> => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
  } catch (err) {
    dispatch({
      type: CART_ERR,
      payload: err.message
    })
  }
}

/**
 * Saves a shipping address for user
 * @param data Location of user
 */
const saveShippingAddress = (data: Addr): ThunkAction<void, ReducerState, unknown, CartAction> => async (dispatch) => {
  try {
    dispatch({
      type: CART_SAVE_SHIPPING_ADDRESS,
      payload: data
    })

    localStorage.setItem('shippingAddress', JSON.stringify(data))
  } catch (err) {
    dispatch({
      type: CART_ERR,
      payload: err.message
    })
  }
}

/**
 * Saves a payment method for user
 * @param data Location of user
 */
const savePaymentMethod = (data: string): ThunkAction<void, ReducerState, unknown, CartAction> => async (dispatch) => {
  try {
    dispatch({
      type: CART_SAVE_PAYMENT_METHOD,
      payload: data
    })

    localStorage.setItem('paymentMethod', JSON.stringify(data))
  } catch (err) {
    dispatch({
      type: CART_ERR,
      payload: err.message
    })
  }
}

export { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod }
