import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'

import User from '../models/userModel'

import generateToken from '../utils/generateToken'

import { Usr } from '../types/models'
import { AuthReq, CreateReq } from '../types/request'

/**
 * Authenticate user & get token
 * @route POST api/users/login
 * @access public
 */
const authUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body as AuthReq

  const user: Usr | null = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  } else {
    res.status(401)
    throw new Error('Invalid Email or Password')
  }
})

/**
 * Register a new user
 * @route POST api/users
 * @access public
 */
const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body as CreateReq

  const userExists: Usr | null = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({ name, email, password })

  if (user) {
    res.status(201)
    res.json({
      _id: user._id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  } else {
    res.status(404)
    throw new Error('Invalid User data')
  }
})

/**
 * Gets session user profile
 * @route GET api/users/profile
 * @access private
 */
const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.user?._id)

  if (user) {
    res.json({
      _id: user._id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin
    })
  } else {
    res.status(401)
    throw new Error('User not found')
  }
})

/**
 * Changes session user profile data
 * @route PUT api/users/profile
 * @access private
 */
const updateUserProfile = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.user?._id)
  const { name, email, password } = req.body as Usr

  if (user) {
    user.name = name || user.name
    user.email = email || user.email
    if (password) {
      user.password = password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      email: updatedUser.email,
      name: updatedUser.name,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id)
    })
  } else {
    res.status(401)
    throw new Error('User not found')
  }
})

export { authUser, getUserProfile, registerUser, updateUserProfile }
