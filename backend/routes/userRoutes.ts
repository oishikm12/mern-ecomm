import { Router } from 'express'

import { authUser, getUserProfile, registerUser, updateUserProfile } from '../controllers/userController'

import { protect } from '../middleware/authMiddleware'

const router: Router = Router()

router.route('/').post(registerUser)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile)
router.route('/profile').put(protect, updateUserProfile)

export default router
