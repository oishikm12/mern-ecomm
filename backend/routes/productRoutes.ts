import { Router } from 'express'

import {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview,
  getTopProducts
} from '../controllers/productController'

import { protect, isAdmin } from '../middleware/authMiddleware'

const router: Router = Router()

router.route('/').get(getProducts).post(protect, isAdmin, createProduct)
router.get('/top', getTopProducts)
router.route('/:id/reviews').post(protect, createProductReview)
router.route('/:id').get(getProductById).delete(protect, isAdmin, deleteProduct).put(protect, isAdmin, updateProduct)

export default router
