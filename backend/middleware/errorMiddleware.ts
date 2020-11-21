import { NextFunction, Request, Response } from 'express'

/**
 * Returns not found error
 * @param req Request Object of express
 * @param res Response Object of express
 * @param next Next Function
 */
const notFound = (req: Request, res: Response, next: NextFunction): void => {
  const err: Error = new Error(`Not found: ${req.originalUrl}`)
  res.status(404)
  next(err)
}

/**
 * Handles server errors
 * @param err Error that occured
 * @param req Request Object of express
 * @param res Response Object of express
 * @param next Next Function
 */
const errHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)
  console.log(err)
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  })
  next()
}

export { notFound, errHandler }
