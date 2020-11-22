import React, { FC, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'

import Product from '../Components/Product'
import Loader from '../Components/Loader'
import Message from '../Components/Message'

import { listProducts } from '../Actions/productActions'

import { ReducerState } from '../store'
import { Prod } from '../Types/common'
import { ProdListState } from '../Types/reducers'

const Home: FC<RouteComponentProps<{ keyword?: string }>> = ({ match }) => {
  const keyword = match.params.keyword

  const dispatch = useDispatch()

  /**
   * Determines state
   * @param state All global states
   * @return List of products
   */
  const getProductList = (state: ReducerState): ProdListState => {
    return state.productList
  }

  const productList = useSelector(getProductList)
  const { loading, error, products } = productList

  useEffect(() => {
    dispatch(listProducts(keyword))
  }, [dispatch, keyword])

  return (
    <>
      <h1>Latest products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products &&
            products.map((product: Prod, index: number) => (
              <Col sm={12} md={6} lg={4} xl={3} key={index}>
                <Product product={product} />
              </Col>
            ))}
        </Row>
      )}
    </>
  )
}

export default Home
