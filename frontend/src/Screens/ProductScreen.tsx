import React, { FC, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'

import Rating from '../Components/Rating'
import Loader from '../Components/Loader'
import Message from '../Components/Message'

import { listProductDetail } from '../Actions/productActions'

import { RootState, ProdDetailState } from '../Types/reducers'

const Product: FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const dispatch = useDispatch()

  /**
   * Determines state
   * @param state All global states
   * @return List of products
   */
  const getProductDetail = (state: RootState): ProdDetailState => {
    return state.productDetail
  }

  const productDetail = useSelector(getProductDetail)
  const { loading, error, product } = productDetail

  useEffect(() => {
    dispatch(listProductDetail(match.params.id))
  }, [dispatch, match])

  if (product)
    return (
      <>
        <LinkContainer to="/">
          <Button className="my-3" variant="light">
            Go Back
          </Button>
        </LinkContainer>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating value={product.rating ? product.rating : 0} text={`${product.numReviews} reviews`} />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>Description: ${product.description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>{product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        <strong>
                          {product.countInStock && product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button className="btn-block" type="button" disabled={product.countInStock === 0}>
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        )}
      </>
    )
  else return null
}

export default Product
