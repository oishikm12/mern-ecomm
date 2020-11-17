import { Router } from 'express'

import { getProducts, getProductById } from '../controllers/productController'

const router: Router = Router()

router.route('/').get(getProducts)
router.route('/:id').get(getProductById)

export default router
