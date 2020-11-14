export default interface Prod {
  /** Unique ID of product */
  _id: string
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
}
