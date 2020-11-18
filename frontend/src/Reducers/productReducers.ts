import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILURE,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAILURE
} from '../Constants/productConstants'

import { ProdListState, ProdListAction, ProdDetailState, ProdDetailAction } from '../Types/reducers'
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

export { productListReducer, productDetailReducer }
