import React, { FC, useState, useEffect, FormEvent } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form, FormGroup } from 'react-bootstrap'

import Rating from '../Components/Rating'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import Meta from '../Components/Meta'

import { listProductDetail, createProductReview } from '../Actions/productActions'

import { PRODUCT_CREATE_REVIEW_RESET } from '../Constants/productConstants'

import { ReducerState } from '../store'
import { ProdDetailState, UniversalState, UserState } from '../Types/reducers'

const Product: FC<RouteComponentProps<{ id: string }>> = ({ match, history }) => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  /**
   * Determines state
   * @param state All global states
   * @return List of products
   */
  const getProductDetail = (state: ReducerState): ProdDetailState => {
    return state.productDetail
  }

  const productDetail = useSelector(getProductDetail)
  const { loading, error, product } = productDetail

  /**
   * Determines state
   * @param state All global states
   * @return List of reviews
   */
  const Create = (state: ReducerState): UniversalState => {
    return state.productReviewCreate
  }

  const productReviewCreate = useSelector(Create)
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview
  } = productReviewCreate

  /**
   * Determines state
   * @param state All global states
   * @return Current user data
   */
  const getUserLogin = (state: ReducerState): UserState => {
    return state.userLogin
  }

  const userLogin = useSelector(getUserLogin)
  const { userInfo } = userLogin

  /**
   * Changes to add to cart
   */
  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  /**
   * Handles review
   * @param e Event from form
   */
  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment
      })
    )
  }

  useEffect(() => {
    if (successProductReview) {
      setRating(0)
      setComment('')
    }
    if (!product || !product._id || product._id !== match.params.id) {
      dispatch(listProductDetail(match.params.id))
      dispatch({
        type: PRODUCT_CREATE_REVIEW_RESET
      })
    }
  }, [dispatch, match, successProductReview, product])

  if (product)
    return (
      <>
        <Link to="/" className="btn btn-light my-3">
          Go Back
        </Link>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <Meta title={product.name} />
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
                  <ListGroup.Item>Description: {product.description}</ListGroup.Item>
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

                    {product.countInStock && product.countInStock > 0 ? (
                      <ListGroup.Item>
                        <Row>
                          <Col>Qty:</Col>
                          <Col>
                            <Form.Control as="select" value={qty} onChange={(e) => setQty(Number(e.target.value))}>
                              {[...Array(product.countInStock)].map((x, i: number) => (
                                <option key={i + 1} value={i + 1}>
                                  {i + 1}
                                </option>
                              ))}
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ) : null}

                    <ListGroup.Item>
                      <Button
                        className="btn-block"
                        type="button"
                        disabled={product.countInStock === 0}
                        onClick={addToCartHandler}
                      >
                        Add to Cart
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <h2>Reviews</h2>
                {product.reviews.length === 0 && <Message>No Reviews</Message>}
                <ListGroup variant="flush">
                  {product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating as number} />
                      <p>{(review?.createdAt as string).substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                  <ListGroup.Item>
                    <h2>Write a customer Review</h2>
                    {successProductReview && <Message variant="success">Review submitted successfully</Message>}
                    {loadingProductReview && <Loader />}
                    {errorProductReview && <Message variant="danger">{errorProductReview}</Message>}
                    {userInfo ? (
                      <Form onSubmit={submitHandler}>
                        <FormGroup controlId="rating">
                          <Form.Label>Rating</Form.Label>
                          <Form.Control as="select" value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                            <option value="">Select...</option>
                            <option value="1">1 - Poor</option>
                            <option value="2">2 - Fair</option>
                            <option value="3">3 - Good</option>
                            <option value="4">4 - Very Good</option>
                            <option value="5">5 - Excellent</option>
                          </Form.Control>
                        </FormGroup>
                        <FormGroup controlId="comment">
                          <Form.Label>Comment</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></Form.Control>
                        </FormGroup>
                        <Button disabled={loadingProductReview} type="submit" variant="primary">
                          Submit
                        </Button>
                      </Form>
                    ) : (
                      <Message>
                        Please <Link to="/login">Sign In</Link> to write a review
                      </Message>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </>
        )}
      </>
    )
  else return null
}

export default Product
