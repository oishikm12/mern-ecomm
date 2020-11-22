import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'

import Product from '../models/productModel'

import { Prod, Review } from '../types/models'

/**
 * Fetch all products
 * @route GET api/products
 * @access public
 */
const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword as string,
          $options: 'i'
        }
      }
    : {}

  const count = await Product.countDocuments({ ...keyword })
  const products: Prod[] = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ products, page, pages: Math.ceil(count / pageSize) })
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

/**
 * Delete a product
 * @route DELETE api/products/:id
 * @access private/admin
 */
const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const prod: Prod | null = await Product.findById(req.params.id)

  if (prod) {
    await prod.remove()
    res.json({ message: 'Product Removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

/**
 * Create a product
 * @route POST api/products/
 * @access private/admin
 */
const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const sample = {
    name: 'Sample Name',
    price: 0,
    user: req.user?._id,
    image: '/images/sample.jpg',
    brand: 'Sample Brand',
    category: 'Sample Category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample Description'
  }

  const product = new Product(sample)
  const createdProduct = await product.save()

  res.status(201)
  res.json(createdProduct)
})

/**
 * Updates a product
 * @route PUT api/products/:id
 * @access private/admin
 */
const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const { name, price, image, brand, category, countInStock, description } = req.body as Prod

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock
    product.description = description

    const updatedProduct = await product.save()

    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

/**
 * Create new review
 * @route POST api/products/:id/reviews
 * @access private
 */
const createProductReview = asyncHandler(async (req: Request, res: Response) => {
  const { rating, comment } = req.body as Review

  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find((r) => r.user.toString() === req.user?._id.toString())
    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    const review = {
      name: req.user?.name as string,
      rating: Number(rating),
      comment,
      user: req.user?._id
    }
    product.reviews.push(review)

    product.numReviews = product.reviews.length
    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

    await product.save()

    res.status(201)
    res.json({ message: 'Review Added' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export { getProducts, getProductById, deleteProduct, createProduct, updateProduct, createProductReview }
