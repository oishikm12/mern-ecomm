import React, { FC, useEffect } from 'react'
import { RouteComponentProps, Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Message from '../Components/Message'
import CheckoutSteps from '../Components/CheckoutSteps'

import { createOrder } from '../Actions/orderActions'

import { ReducerState } from '../store'
import { CartState, OrderState } from '../Types/reducers'

const PlaceOrderScreen: FC<RouteComponentProps> = ({ history }) => {
  const dispatch = useDispatch()

  /**
   * Determines state
   * @param state All global states
   * @return List of cart items
   */
  const getCartItems = (state: ReducerState): CartState => {
    return state.cart
  }

  const cart = useSelector(getCartItems)
  const { shippingAddress, paymentMethod, cartItems } = cart

  /**
   * Adds decimal to number
   * @param num Number to convert
   */
  const addDecimals = (num: number): string => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  const itemsPrice = addDecimals(cartItems.reduce((acc, item) => acc + (item.price || 0) * (item.qty || 0), 0))
  const shippingPrice = addDecimals(Number(itemsPrice) > 100 ? 0 : 100)
  const taxPrice = addDecimals(0.15 * Number(itemsPrice))
  const totalPrice = (Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2)

  /**
   * Determines state
   * @param state All global states
   * @return List of orders
   */
  const getOrderCreate = (state: ReducerState): OrderState => {
    return state.orderCreate
  }

  const orderCreate = useSelector(getOrderCreate)
  const { order, success, error } = orderCreate

  useEffect(() => {
    if (success) {
      history.push(`/order/${order?._id}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, success])

  /**
   * Places a new order
   */
  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice: Number(itemsPrice),
        shippingPrice: Number(shippingPrice),
        taxPrice: Number(taxPrice),
        totalPrice: Number(totalPrice)
      })
    )
  }

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode},{' '}
                {shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cartItems.map((e, i) => (
                    <ListGroup.Item key={i}>
                      <Row>
                        <Col md={1}>
                          <Image src={e.image} alt={e.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${e.product}`}>{e.name}</Link>
                        </Col>
                        <Col md={4}>
                          {e.qty} x ${e.price} = ${(e.qty || 0) * (e.price || 0)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>{error && <Message variant="danger">{error}</Message>}</ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
