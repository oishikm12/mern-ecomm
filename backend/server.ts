import express from 'express'

import products from './data/products'

import Prod from './types/Prod'

const PORT: number = 8080

const app = express()

app.get('/', (req, res) => {
  res.send('API is working')
})

app.get('/api/products', (req, res) => {
  res.json(products)
})

app.get('/api/products/:id', (req, res) => {
  const prod: Prod | undefined = products.find((e) => e._id === req.params.id)

  if (!prod) {
    res.json({ success: false })
  } else {
    res.json(prod)
  }
})

app.listen(PORT, () => console.log(`Server running on ${PORT}`))
