import { Usr } from './models'

declare global {
  namespace Express {
    export interface Request {
      user: Usr | null
    }
    export interface Response {
      user: Usr | null
    }
  }
}
