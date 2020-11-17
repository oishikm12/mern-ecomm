import { Router } from 'express'

import { authUser, getUserProfile, registerUser } from '../controllers/userController'

import { protect } from '../middleware/authMiddleware'

const router: Router = Router()

router.route('/').post(registerUser)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile)

export default router
