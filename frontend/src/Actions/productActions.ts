import axios from 'axios'

import { Dispatch } from 'redux'

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

/**
 * Lists all products
 */
const listProducts = () => async (dispatch: Dispatch<ProdListAction>) => {
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
const listProductDetail = (id: string) => async (dispatch: Dispatch<ProdDetailAction>) => {
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
