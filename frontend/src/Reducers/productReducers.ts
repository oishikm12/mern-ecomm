import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILURE,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAILURE,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_FAILURE,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_FAILURE,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAILURE,
  PRODUCT_UPDATE_RESET
} from '../Constants/productConstants'

import {
  ProdListState,
  ProdListAction,
  ProdDetailState,
  ProdDetailAction,
  UniversalState,
  UniversalAction,
  ProdModifyState
} from '../Types/reducers'
import { Prod } from '../Types/common'

const initialListState: ProdListState = {
  loading: true,
  products: []
}

/**
 * Performs an action on product list
 * @param state State of Product list
 * @param action Action to perform
 */
const productListReducer = (state: ProdListState = initialListState, action: ProdListAction): ProdListState => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] }
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload as Prod[] }
    case PRODUCT_LIST_FAILURE:
      return { loading: false, error: action.payload as string }
    default:
      return state
  }
}

const initialDetailState: ProdDetailState = {
  loading: true,
  product: {
    reviews: []
  }
}

/**
 * Performs an action on product details
 * @param state State of product detail
 * @param action Action to perform
 */
const productDetailReducer = (
  state: ProdDetailState = initialDetailState,
  action: ProdDetailAction
): ProdDetailState => {
  switch (action.type) {
    case PRODUCT_DETAIL_REQUEST:
      return { ...state, loading: true }
    case PRODUCT_DETAIL_SUCCESS:
      return { loading: false, product: action.payload as Prod }
    case PRODUCT_DETAIL_FAILURE:
      return { loading: false, error: action.payload as string }
    default:
      return state
  }
}

const intialState: UniversalState = {}

/**
 * Deletes a product
 * @param state State of product
 * @param action Action to perform
 */
const productDeleteReducer = (state: UniversalState = intialState, action: UniversalAction): UniversalState => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { ...state, loading: true }
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true }
    case PRODUCT_DELETE_FAILURE:
      return { loading: false, error: action.payload as string }
    default:
      return state
  }
}

/**
 * Creates a new product
 * @param state State of product
 * @param action Action to perform
 */
const productCreateReducer = (state: ProdModifyState = intialState, action: ProdDetailAction): ProdModifyState => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { ...state, loading: true }
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload as Prod }
    case PRODUCT_CREATE_FAILURE:
      return { loading: false, error: action.payload as string }
    case PRODUCT_CREATE_RESET:
      return {}
    default:
      return state
  }
}

/**
 * Updates a product
 * @param state State of product
 * @param action Action to perform
 */
const productUpdateReducer = (state: ProdModifyState = intialState, action: ProdDetailAction): ProdModifyState => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { ...state, loading: true }
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload as Prod }
    case PRODUCT_UPDATE_FAILURE:
      return { loading: false, error: action.payload as string }
    case PRODUCT_UPDATE_RESET:
      return {}
    default:
      return state
  }
}

export { productListReducer, productDetailReducer, productDeleteReducer, productCreateReducer, productUpdateReducer }
