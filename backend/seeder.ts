import dotenv from 'dotenv'
import 'colors'

import users from './data/users'
import products from './data/products'

import User from './models/userModel'
import Product from './models/productModel'
import Order from './models/orderModel'

import connectDB from './config/db'

import { Usr } from './types/models'

dotenv.config()

const uri: string = process.env.MONGO_URI || ''

connectDB(uri)

/**
 * Adds dummy data to database
 */
const importData = async () => {
  try {
    await Order.deleteMany({})
    await Product.deleteMany({})
    await User.deleteMany({})

    const createdUsers: Usr[] = await User.insertMany(users)
    const adminUser: string = createdUsers[0]._id

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }
    })

    await Product.insertMany(sampleProducts)

    console.log('Data Imported'.green.inverse)
    process.exit()
  } catch (err) {
    console.log(`Error: ${err.message}`.red.inverse)
    process.exit(1)
  }
}

/**
 * Cleans database
 */
const destroyData = async () => {
  try {
    await Order.deleteMany({})
    await Product.deleteMany({})
    await User.deleteMany({})

    console.log('Data Destroyed'.red.inverse)
    process.exit()
  } catch (err) {
    console.log(`Error: ${err.message}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
