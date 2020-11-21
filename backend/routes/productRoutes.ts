import { Router } from 'express'

import {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct
} from '../controllers/productController'

import { protect, isAdmin } from '../middleware/authMiddleware'

const router: Router = Router()

router.route('/').get(getProducts)
router.route('/').post(protect, isAdmin, createProduct)
router.route('/:id').get(getProductById)
router.route('/:id').delete(protect, isAdmin, deleteProduct)
router.route('/:id').put(protect, isAdmin, updateProduct)

export default router
