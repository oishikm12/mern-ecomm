import { NextFunction, Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'

import User from '../models/userModel'

/**
 * Checks authorization header
 * @param req Request Object of express
 * @param res Response Object of express
 * @param next Next Function
 */
const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let token: string | undefined = req.headers.authorization
    if (token && token.startsWith('Bearer')) {
      try {
        token = token.split(' ')[1]
        const secret = process.env.JWT_SECRET || ''
        const decoded = jwt.verify(token, secret)

        req.user = await User.findById((decoded as Record<string, string>).id).select('-password')

        next()
      } catch (err) {
        console.error(err)
        res.status(401)
        throw new Error('Not Authorized, Invalid Token')
      }
    } else {
      res.status(401)
      throw new Error('Not Authorized, No Token')
    }
  }
)

/**
 * Checks if an user is admin
 * @param req Request Object of express
 * @param res Response Object of express
 * @param next Next Function
 */
const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as Admin')
  }
}

export { protect, isAdmin }
