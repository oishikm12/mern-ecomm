import { Prod } from './common'

export interface ProdListAction {
  /** Type of dispatch action */
  type: string
  /** Result from request */
  payload?: Prod[] | Error
}

export interface ProdListState {
  /** State of request */
  loading: boolean
  /** Products from request */
  products?: Prod[]
  /** Error that may have occured */
  error?: Error
}

export interface ProdDetailAction {
  /** Type of dispatch action */
  type: string
  /** Result from request */
  payload?: Prod | Error
}

export interface ProdDetailState {
  /** State of request */
  loading: boolean
  /** Product from request */
  product?: Prod
  /** Error that may have occured */
  error?: Error
}

export interface RootState {
  /** Product Interface */
  productList: ProdListState
  /** Single product */
  productDetail: ProdDetailState
}
