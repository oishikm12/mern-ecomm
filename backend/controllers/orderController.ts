import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'

import Order from '../models/orderModel'

import { Ord, Payment } from '../types/models'

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

/**
 * Fetches a new order
 * @route GET api/orders/:id
 * @access private
 */
const getOrderById = asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email')

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

/**
 * Update order to paid
 * @route GET api/orders/:id/pay
 * @access private
 */
const updateOrderToPaid = asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now().toString()

    const payDetails: Payment = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address
    }

    order.paymentResult = payDetails

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

/**
 * Returns user orders
 * @route GET api/orders/myorders
 * @access private
 */
const getMyOrders = asyncHandler(async (req: Request, res: Response) => {
  const orders = await Order.find({ user: req.user?._id })

  res.json(orders)
})

export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders }
