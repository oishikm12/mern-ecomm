import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'

import Order from '../models/orderModel'

import { Ord } from '../types/models'

/**
 * Create a new order
 * @route POST api/orders
 * @access private
 */
const addOrderItems = asyncHandler(async (req: Request, res: Response) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  } = req.body as Ord

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
  } else {
    const order = new Order({
      orderItems,
      user: req.user?._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    })

    const createdOrder = await order.save()

    res.status(201)
    res.json(createdOrder)
  }
})

export { addOrderItems }
