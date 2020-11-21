import axios from 'axios'

import { ThunkAction } from 'redux-thunk'

import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILURE,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAILURE,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAILURE,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAILURE,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAILURE
} from '../Constants/productConstants'

import { Prod } from '../Types/common'
import { ProdListAction, ProdDetailAction, UniversalAction } from '../Types/reducers'

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

/**
 * Deletes a product
 * @param id ID of product to delete
 */
const deleteProduct = (id: string): ThunkAction<void, ReducerState, unknown, UniversalAction> => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST
    })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo?.token}`
      }
    }

    await axios.delete(`/api/products/${id}`, config)

    dispatch({
      type: PRODUCT_DELETE_SUCCESS
    })
  } catch (err) {
    dispatch({
      type: PRODUCT_DELETE_FAILURE,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message
    })
  }
}

/**
 * Creates a product
 */
const createProduct = (): ThunkAction<void, ReducerState, unknown, ProdDetailAction> => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REQUEST
    })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo?.token}`
      }
    }

    const { data }: { data: Prod } = await axios.post(`/api/products/`, {}, config)

    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data
    })
  } catch (err) {
    dispatch({
      type: PRODUCT_CREATE_FAILURE,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message
    })
  }
}

/**
 * Updates a product
 * @param product Product to update
 */
const updateProduct = (product: Prod): ThunkAction<void, ReducerState, unknown, ProdDetailAction> => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: PRODUCT_UPDATE_REQUEST
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

    const { data }: { data: Prod } = await axios.put(`/api/products/${product._id}`, product, config)

    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data
    })
  } catch (err) {
    dispatch({
      type: PRODUCT_UPDATE_FAILURE,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message
    })
  }
}

export { listProducts, listProductDetail, deleteProduct, createProduct, updateProduct }
