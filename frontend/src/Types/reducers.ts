import { Prod, CartItem, Usr, Addr, Ord } from './common'

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
  payload?: CartItem | Addr | string
}

export interface CartState {
  /** List of items */
  cartItems: CartItem[]
  /** Address of user */
  shippingAddress: Addr
  /** Payment Method */
  paymentMethod: string
  /** Error that may have occured */
  error?: string
}

export interface UserState {
  /** State of request */
  loading?: boolean
  /** User from login */
  userInfo?: Usr
  /** Error that may have occured */
  error?: string
}

export interface UserAction {
  /** Type of dispatch action */
  type: string
  /** Result from request */
  payload?: Usr | string
}

export interface UserDetailState extends Omit<UserState, 'userInfo'> {
  /** User data to set / get */
  user?: Usr
}

export interface UserUpdateState extends UserState {
  /** If change was succesfull */
  success?: boolean
}

export interface OrderState {
  /** State of request */
  loading?: boolean
  /** Wether successful */
  success?: boolean
  /** User from login */
  order?: Ord
  /** Error that may have occured */
  error?: string
}

export interface OrderListState extends Omit<OrderState, 'order' | 'success'> {
  /** List of orders by user */
  orders?: Ord[]
}

export interface OrderAction {
  /** Type of dispatch action */
  type: string
  /** Result from request */
  payload?: Ord | Ord[] | string
}

export interface InitialState {
  /** Cart Contents of user */
  cart: CartState
  /** Login data of user */
  userLogin: UserState
}
