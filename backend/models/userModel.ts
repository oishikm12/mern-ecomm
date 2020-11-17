import mongoose, { Schema, Model, HookNextFunction } from 'mongoose'
import bcrypt from 'bcryptjs'

import { Usr } from '../types/models'

const userSchema: Schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false }
  },
  {
    timestamps: true
  }
)

/**
 * Compares passwords with encryption
 * @param enteredPassword Password entered
 */
userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre<Usr>('save', async function (next: HookNextFunction) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})
const User: Model<Usr> = mongoose.model('User', userSchema)

export default User
