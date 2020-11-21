import { Router } from 'express'

import {
  authUser,
  deleteUser,
  getUserProfile,
  getUsers,
  registerUser,
  updateUserProfile,
  getUserById,
  updateUser
} from '../controllers/userController'

import { protect, isAdmin } from '../middleware/authMiddleware'

const router: Router = Router()

router.route('/').post(registerUser)
router.route('/').get(protect, isAdmin, getUsers)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile)
router.route('/profile').put(protect, updateUserProfile)
router.route('/:id').delete(protect, isAdmin, deleteUser)
router.route('/:id').get(protect, isAdmin, getUserById)
router.route('/:id').put(protect, isAdmin, updateUser)

export default router
