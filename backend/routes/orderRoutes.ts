import { Router } from 'express'

import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToDelivered,
  updateOrderToPaid
} from '../controllers/orderController'

import { protect, isAdmin } from '../middleware/authMiddleware'

const router: Router = Router()

router.route('/').post(protect, addOrderItems)
router.route('/').get(protect, isAdmin, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, isAdmin, updateOrderToDelivered)

export default router
