import mongoose from 'mongoose'

/**
 * Connect to mongo atlas database
 */
const connectDB = async (url: string): Promise<void> => {
  try {
    const conn = await mongoose.connect(url, {
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true
    })

    console.log(`Mongo DB connection successfully, ${conn.connection.host}`.cyan.underline)
  } catch (err) {
    console.error(`Error ${err.message}`.red.underline.bold)
    process.exit(1)
  }
}

export default connectDB
