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
