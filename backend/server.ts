import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import 'colors'

import products from './data/products'
import connectDB from './config/db'

import Prod from './types/Prod'

dotenv.config()

const app: Express = express()

const uri: string = process.env.MONGO_URI || ''

connectDB(uri)

app.get('/', (req: Request, res: Response) => {
  res.send('API is working')
})

app.get('/api/products', (req: Request, res: Response) => {
  res.json(products)
})

app.get('/api/products/:id', (req: Request, res: Response) => {
  const prod: Prod | undefined = products.find((e) => e._id === req.params.id)

  if (!prod) {
    res.json({ success: false })
  } else {
    res.json(prod)
  }
})

const PORT: string | number = process.env.PORT || 8080

app.listen(PORT, () => console.log(`Server running on ${PORT}`.yellow.bold))
