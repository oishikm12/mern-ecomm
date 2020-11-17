export interface AuthReq {
  /** Email ID of user */
  email: string
  /** Password of user */
  password: string
}

export interface CreateReq extends AuthReq {
  /** Name of user */
  name: string
}
