import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import 'colors'

import { default as productRouter } from './routes/productRoutes'
import { default as userRouter } from './routes/userRoutes'

import { notFound, errHandler } from './middleware/errorMiddleware'

import connectDB from './config/db'

dotenv.config()

const app: Express = express()

const uri: string = process.env.MONGO_URI || ''

connectDB(uri)

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('API is working')
})

app.use('/api/products', productRouter)
app.use('/api/users', userRouter)

app.use('*', notFound)

app.use(errHandler)

const PORT: string | number = process.env.PORT || 8080

app.listen(PORT, () => console.log(`Server running on ${PORT}`.yellow.bold))
