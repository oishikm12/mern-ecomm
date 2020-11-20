import React, { FC, useState, useEffect } from 'react'
import { RouteComponentProps, Link } from 'react-router-dom'
import { PayPalButton } from 'react-paypal-button-v2'
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

import Message from '../Components/Message'
import Loader from '../Components/Loader'

import { getOrderDetails, payOrder } from '../Actions/orderActions'

import { ORDER_PAY_RESET } from '../Constants/orderConstants'

import { ReducerState } from '../store'
import { OrderState } from '../Types/reducers'
import { Payment, Usr } from '../Types/common'

const OrderScreen: FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
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

  useEffect(() => {
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

    if (order?.orderItems.length === 0 || successPay) {
      dispatch({
        type: ORDER_PAY_RESET
      })
      dispatch(getOrderDetails(orderId))
    } else if (!order?.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [dispatch, orderId, successPay, order])

  /**
   * Payment handling for paypal
   */
  const successPaymentHandler = (paymentResult: Payment) => {
    dispatch(payOrder(orderId, paymentResult))
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
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen
