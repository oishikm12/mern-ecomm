import { Router } from 'express'

import { addOrderItems } from '../controllers/orderController'

import { protect } from '../middleware/authMiddleware'

const router: Router = Router()

router.route('/').post(protect, addOrderItems)

export default router
