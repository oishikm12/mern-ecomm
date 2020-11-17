import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'

import Product from '../models/productModel'

import { Prod } from '../types/models'

/**
 * Fetch all products
 * @route GET api/products
 * @access public
 */
const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const products: Prod[] = await Product.find({})
  res.json(products)
})

/**
 * Fetch sinle product
 * @route GET api/products/:id
 * @access public
 */
const getProductById = asyncHandler(async (req: Request, res: Response) => {
  const prod: Prod | null = await Product.findById(req.params.id)

  if (!prod) {
    res.status(404)
    throw new Error('Product not found')
  } else {
    res.json(prod)
  }
})

export { getProducts, getProductById }
