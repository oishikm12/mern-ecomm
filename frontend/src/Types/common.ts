export interface Rates {
  /** Rating provided to us */
  value: number
  /** Review Information */
  text: string
  /** Color of stars */
  color?: string
}

export interface Star {
  /** Rating provided to us */
  value: number
  /** Index position of stars */
  index: number
  /** Color of stars */
  color?: string
}

interface Review {
  /** Reviewer Name */
  name?: string
  /** Rating given to product */
  rating?: number
  /** Comment on product */
  comment?: string
}

export interface Prod {
  /** Unique ID of product */
  _id?: string
  /** Owner of product*/
  user?: string
  /** Name of product */
  name?: string
  /** Image of the product */
  image?: string
  /** Data about product  */
  description?: string
  /** Brand of product */
  brand?: string
  /** Classification of product  */
  category?: string
  /** Current Price of product */
  price?: number
  /** Current stock */
  countInStock?: number
  /** Stars of product */
  rating?: number
  /** Reviewers count */
  numReviews?: number
  /** Reviews detail */
  reviews: Review[]
}

export interface CartItem {
  /** Unique ID of product */
  product?: string
  /** Name of product */
  name?: string
  /** Image of the product */
  image?: string
  /** Current Price of product */
  price?: number
  /** Current stock */
  countInStock?: number
  /** Quantity of item */
  qty?: number
}

export interface Usr {
  /** Name of user */
  name: string
  /** Email of user */
  email: string
  /** Password of user */
  password?: string
  /** Unique user ID */
  _id: string
  /** Is the user admin */
  isAdmin?: boolean
  /** JWT Token */
  token?: string
}

export interface Addr {
  /** Local Address */
  address?: string
  /** City of user */
  city?: string
  /** Country of user */
  country?: string
  /** User's PIN code */
  postalCode?: string
}

export interface Payment {
  /** Unique Payment ID */
  id: string
  /** Current Payment Status */
  status: string
  /** Last Updated Time */
  update_time: string
  /** Email of receipent */
  email_address: string
}

export interface Ord {
  /** Unique order ID */
  _id?: string
  /** User placing the order */
  user?: Usr['_id'] | Usr
  /** Time created on */
  createdAt?: string
  /** Item ordered */
  orderItems: CartItem[]
  /** Address to ship to */
  shippingAddress: Addr
  /** Method to pay */
  paymentMethod: string
  /** Result of payment */
  paymentResult?: Payment
  /** Price of all items */
  itemsPrice?: number
  /** Tax Imposed */
  taxPrice?: number
  /** Price to ship */
  shippingPrice?: number
  /** Total amount */
  totalPrice?: number
  /** Is success */
  isPaid?: boolean
  /** Paid at if success */
  paidAt?: string
  /** Is delivery success */
  isDelivered?: boolean
  /** Date of delivery if success */
  deliveredAt?: string
}
