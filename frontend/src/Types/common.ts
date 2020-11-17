type Review = {
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
