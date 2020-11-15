import mongoose, { Schema, Model } from 'mongoose'

import { Usr } from 'Models'

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

const User: Model<Usr> = mongoose.model('User', userSchema)

export default User
