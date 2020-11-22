import { Prod, CartItem, Usr, Addr, Ord } from './common'

export interface UniversalState {
  /** State of request */
  loading?: boolean
  /** Success of request */
  success?: boolean
  /** Error that may have occured */
  error?: string
}

export interface UniversalAction {
  /** Type of dispatch action */
  type: string
  /** Result from request */
  payload?: string
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

export interface InitialState {
  /** Cart Contents of user */
  cart: CartState
  /** Login data of user */
  userLogin: UserState
}

export interface ProdListState extends Omit<UniversalState, 'success'> {
  /** Products from request */
  products?: Prod[]
}

export interface ProdDetailState extends Omit<UniversalState, 'success'> {
  /** Product from request */
  product?: Prod
}

export interface ProdModifyState extends UniversalState {
  /** Product from request */
  product?: Prod
}

export interface ProdListAction extends Omit<UniversalAction, 'payload'> {
  /** Result from request */
  payload?: Prod[] | string
}

export interface ProdDetailAction extends Omit<UniversalAction, 'payload'> {
  /** Result from request */
  payload?: Prod | string
}

export interface UserState extends Omit<UniversalState, 'success'> {
  /** User from login */
  userInfo?: Usr
}

export interface UserDetailState extends Omit<UniversalState, 'success'> {
  /** User data to set / get */
  user?: Usr
}

export interface UserUpdateState extends UniversalState {
  /** User from login */
  userInfo?: Usr
}

export interface AllUserState extends Omit<UniversalState, 'success'> {
  /** List of all users */
  users?: Usr[]
}

export interface UserAction extends Omit<UniversalAction, 'payload'> {
  /** Result from request */
  payload?: Usr | string
}

export interface AllUserAction extends Omit<UniversalAction, 'payload'> {
  /** All users */
  payload?: Usr[] | string
}

export interface OrderState extends UniversalState {
  /** User from login */
  order?: Ord
}

export interface OrderListState extends Omit<UniversalState, 'success'> {
  /** List of orders by user */
  orders?: Ord[]
}

export interface OrderAction extends Omit<UniversalAction, 'payload'> {
  /** Result from request */
  payload?: Ord | string
}

export interface OrderListAction extends Omit<UniversalAction, 'payload'> {
  /** All user orders */
  payload?: Ord[] | string
}
