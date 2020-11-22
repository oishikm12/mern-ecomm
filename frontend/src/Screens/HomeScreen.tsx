import React, { FC, useEffect } from 'react'
import { RouteComponentProps, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'

import Product from '../Components/Product'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import Paginate from '../Components/Paginate'
import ProductCarousel from '../Components/ProductCarousel'
import Meta from '../Components/Meta'

import { listProducts } from '../Actions/productActions'

import { ReducerState } from '../store'
import { Prod } from '../Types/common'
import { ProdListState } from '../Types/reducers'

const Home: FC<RouteComponentProps<{ keyword?: string; pageNumber?: string }>> = ({ match }) => {
  const keyword = match.params.keyword
  const pageNumber = Number(match.params.pageNumber) || 1

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
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}
      <h1>Latest products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products &&
              products.map((product: Prod, index: number) => (
                <Col sm={12} md={6} lg={4} xl={3} key={index}>
                  <Product product={product} />
                </Col>
              ))}
          </Row>
          <Paginate pages={pages as number} page={page as number} keyword={keyword ? keyword : ''} isAdmin={false} />
        </>
      )}
    </>
  )
}

export default Home
