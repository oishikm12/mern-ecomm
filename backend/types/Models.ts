import { Document } from 'mongoose'

interface Usr extends Document {
  /** Unique user ID */
  _id: string
  /** Name of user */
  name: string
  /** Email of user */
  email: string
  /** Password set by user */
  password: string
  /** Is the user admin */
  isAdmin: boolean
}

type Review = {
  /** Reviewer Name */
  name: string
  /** Rating given to product */
  rating: number
  /** Comment on product */
  comment: string
}

interface Prod extends Document {
  /** Unique ID of product */
  _id: string
  /** Owner of product*/
  user: Usr['_id']
  /** Name of product */
  name: string
  /** Image of the product */
  image: string
  /** Data about product  */
  description: string
  /** Brand of product */
  brand: string
  /** Classification of product  */
  category: string
  /** Current Price of product */
  price: number
  /** Current stock */
  countInStock: number
  /** Stars of product */
  rating: number
  /** Reviewers count */
  numReviews: number
  /** Reviews detail */
  reviews: Review[]
}

type Item = {
  /** Item name */
  name: string
  /** Quantity of item */
  qty: number
  /** Link to Image */
  image: string
  /** Price of item */
  price: number
  /** Product ID */
  product: Prod['_id']
}

type Address = {
  /** Address literal */
  address: string
  /** City name */
  city: string
  /** Zip Code */
  postalCode: string
  /** Country Name */
  country: string
}

type Payment = {
  /** Unique Payment ID */
  id: string
  /** Current Payment Status */
  status: string
  /** Last Updated Time */
  update_time: string
  /** Email of receipent */
  email_address: string
}

interface Ord extends Document {
  /** Unique order ID */
  _id: string
  /** User placing the order */
  user: Usr['_id']
  /** Item ordered */
  orderItem: Item[]
  /** Address to ship to */
  shippingAddress: Address
  /** Method to pay */
  paymentMethod: string
  /** Result of payment */
  paymentResult: Payment
  /** Tax Imposed */
  taxPrice: number
  /** Price to ship */
  shippingPrice: number
  /** Total amount */
  totalPrice: number
  /** Is success */
  isPaid: boolean
  /** Paid at if success */
  paidAt: Date
  /** Is delivery success */
  isDelivered: boolean
  /** Date of delivery if success */
  deliveredAt: Date
}

export { Prod, Usr, Ord }
