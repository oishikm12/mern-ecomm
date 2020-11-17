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
