import axios from 'axios'

import { ThunkAction } from 'redux-thunk'

import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILURE,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAILURE
} from '../Constants/productConstants'

import { Prod } from '../Types/common'
import { ProdListAction, ProdDetailAction } from '../Types/reducers'

import { ReducerState } from '../store'

/**
 * Lists all products
 */
const listProducts = (): ThunkAction<void, ReducerState, unknown, ProdListAction> => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_LIST_REQUEST
    })

    const { data }: { data: Prod[] } = await axios.get('/api/products')

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data
    })
  } catch (err) {
    dispatch({
      type: PRODUCT_LIST_FAILURE,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message
    })
  }
}

/**
 * Fetches specific product
 * @param id The product to fetch
 */
const listProductDetail = (id: string): ThunkAction<void, ReducerState, unknown, ProdDetailAction> => async (
  dispatch
) => {
  try {
    dispatch({
      type: PRODUCT_DETAIL_REQUEST
    })

    const { data }: { data: Prod } = await axios.get(`/api/products/${id}`)

    dispatch({
      type: PRODUCT_DETAIL_SUCCESS,
      payload: data
    })
  } catch (err) {
    dispatch({
      type: PRODUCT_DETAIL_FAILURE,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message
    })
  }
}

export { listProducts, listProductDetail }
