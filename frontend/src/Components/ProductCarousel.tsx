import React, { FC, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Loader from './Loader'
import Message from './Message'

import { listTopProducts } from '../Actions/productActions'

import { ReducerState } from '../store'
import { ProdTopState } from '../Types/reducers'

const ProductCarousel: FC = () => {
  const dispatch = useDispatch()

  /**
   * Determines state
   * @param state All global states
   * @return List of 3 top rated products
   */
  const getProductTopRated = (state: ReducerState): ProdTopState => {
    return state.productTopRated
  }

  const productTopRated = useSelector(getProductTopRated)
  const { loading, error, products } = productTopRated

  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark">
      {products?.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className="carousel-caption">
              <h2>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel
