import { Prod, CartItem } from './common'

export interface ProdListAction {
  /** Type of dispatch action */
  type: string
  /** Result from request */
  payload?: Prod[] | string
}

export interface ProdListState {
  /** State of request */
  loading: boolean
  /** Products from request */
  products?: Prod[]
  /** Error that may have occured */
  error?: string
}

export interface ProdDetailAction {
  /** Type of dispatch action */
  type: string
  /** Result from request */
  payload?: Prod | string
}

export interface ProdDetailState {
  /** State of request */
  loading: boolean
  /** Product from request */
  product?: Prod
  /** Error that may have occured */
  error?: string
}

export interface CartAction {
  /** Type of dispatch action */
  type: string
  /** Result from request */
  payload?: CartItem | string
}

export interface CartState {
  /** List of items */
  cartItems: CartItem[]
  /** Error that may have occured */
  error?: string
}
