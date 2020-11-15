import mongoose, { Schema, Model, Document } from 'mongoose'

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

const User: Model<Document> = mongoose.model('User', userSchema)

export default User
