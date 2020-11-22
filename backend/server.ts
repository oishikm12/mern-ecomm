import path from 'path'

import express, { Express, Request, Response } from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import 'colors'

import { default as productRouter } from './routes/productRoutes'
import { default as userRouter } from './routes/userRoutes'
import { default as orderRouter } from './routes/orderRoutes'
import { default as uploadRouter } from './routes/uploadRoutes'

import { notFound, errHandler } from './middleware/errorMiddleware'

import connectDB from './config/db'

dotenv.config()

const app: Express = express()

const uri: string = process.env.MONGO_URI || ''

connectDB(uri)

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('API is working')
})

app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
app.use('/api/orders', orderRouter)
app.use('/api/uploads', uploadRouter)

app.get('/api/config/paypal', (req: Request, res: Response) => {
  res.send(process.env.PAYPAL_CLIENT_ID)
})

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use('*', notFound)

app.use(errHandler)

const PORT: string | number = process.env.PORT || 8080

app.listen(PORT, () => console.log(`Server running on ${PORT}`.yellow.bold))
