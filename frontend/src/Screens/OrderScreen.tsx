import React, { FC, useState, useEffect } from 'react'
import { RouteComponentProps, Link } from 'react-router-dom'
import { PayPalButton } from 'react-paypal-button-v2'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

import Message from '../Components/Message'
import Loader from '../Components/Loader'

import { getOrderDetails, payOrder, deliverOrder } from '../Actions/orderActions'

import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../Constants/orderConstants'

import { ReducerState } from '../store'
import { OrderState, UserState } from '../Types/reducers'
import { Payment, Usr } from '../Types/common'

const OrderScreen: FC<RouteComponentProps<{ id: string }>> = ({ match, history }) => {
  const dispatch = useDispatch()

  const orderId = match.params.id

  const [sdkReady, setSdkReady] = useState(false)

  /**
   * Determines state
   * @param state All global states
   * @return Order Data
   */
  const getOrdDetails = (state: ReducerState): OrderState => {
    return state.orderDetails
  }

  const orderDetails = useSelector(getOrdDetails)
  const { order, loading, error } = orderDetails

  /**
   * Determines state
   * @param state All global states
   * @return Payment Data
   */
  const getOrderPay = (state: ReducerState): OrderState => {
    return state.orderPay
  }

  const orderPay = useSelector(getOrderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  /**
   * Determines state
   * @param state All global states
   * @return Delivery Data
   */
  const getOrderDeliver = (state: ReducerState): OrderState => {
    return state.orderDeliver
  }

  const orderDeliver = useSelector(getOrderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

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

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }

    /**
     * Adds paypal functionality
     */
    const addPayPalScript = async () => {
      const { data: clientId }: { data: string } = await axios.get('/api/config/paypal')
      const script: HTMLScriptElement = document.createElement('script')
      script.type = 'text/javascript'
      script.async = true
      document.body.appendChild(script)
      script.onload = () => {
        setSdkReady(true)
      }
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
    }

    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({
        type: ORDER_PAY_RESET
      })
      dispatch({
        type: ORDER_DELIVER_RESET
      })
      dispatch(getOrderDetails(orderId))
    } else if (!order?.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [history, userInfo, dispatch, orderId, successPay, successDeliver, order])

  /**
   * Payment handling for paypal
   */
  const successPaymentHandler = (paymentResult: Payment) => {
    dispatch(payOrder(orderId, paymentResult))
  }

  /**
   * Delivery handling for admin
   */
  const successDeliverHandler = () => {
    dispatch(deliverOrder(orderId))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order {order?._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order && order.user ? (order.user as Usr).name : ''}
              </p>
              <p>
                <strong>E-Mail: </strong>
                <a href={`mailto:${order && order.user ? (order.user as Usr).email : ''}`}>
                  {order && order.user ? (order.user as Usr).email : ''}
                </a>
              </p>
              <p>
                <strong>Address: </strong>
                {order?.shippingAddress.address}, {order?.shippingAddress.city}, {order?.shippingAddress.postalCode},{' '}
                {order?.shippingAddress.country}
              </p>
              {order?.isDelivered ? (
                <Message variant="success">Delivered on {order?.deliveredAt}</Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order?.paymentMethod}
              </p>
              {order?.isPaid ? (
                <Message variant="success">Paid on {order?.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order?.orderItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order?.orderItems.map((e, i) => (
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
                  <Col>${order?.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order?.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order?.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order?.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order?.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton amount={order?.totalPrice} onSuccess={successPaymentHandler} />
                  )}
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader />}
              {userInfo && userInfo.isAdmin && order?.isPaid && !order.isDelivered && (
                <ListGroup.Item>
                  <Button type="button" className="btn btn-block" onClick={successDeliverHandler}>
                    Mark as Delivered
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen
