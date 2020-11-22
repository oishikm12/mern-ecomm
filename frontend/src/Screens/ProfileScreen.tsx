import React, { FC, useState, useEffect, FormEvent } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import Loader from '../Components/Loader'
import Message from '../Components/Message'

import { getUserDetails, updateUserProfile } from '../Actions/userActions'
import { listSelfOrders } from '../Actions/orderActions'

import { USER_UPDATE_PROFILE_RESET } from '../Constants/userConstants'

import { ReducerState } from '../store'
import { OrderListState, UserDetailState, UserState, UserUpdateState } from '../Types/reducers'

const ProfileScreen: FC<RouteComponentProps> = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState<null | string>(null)

  const dispatch = useDispatch()

  /**
   * Determines state
   * @param state All global states
   * @return Current user data
   */
  const getUserDetail = (state: ReducerState): UserDetailState => {
    return state.userDetails
  }

  const userDetails = useSelector(getUserDetail)
  const { loading, error, user } = userDetails

  /**
   * Determines state
   * @param state All global states
   * @return Current user login data
   */
  const getUserLogin = (state: ReducerState): UserState => {
    return state.userLogin
  }

  const userLogin = useSelector(getUserLogin)
  const { userInfo } = userLogin

  /**
   * Determines state
   * @param state All global states
   * @return Current user update data
   */
  const getUserUpdateProfile = (state: ReducerState): UserUpdateState => {
    return state.userUpdateProfile
  }

  const userUpdateProfile = useSelector(getUserUpdateProfile)
  const { success } = userUpdateProfile

  /**
   * Determines state
   * @param state All global states
   * @return Current user orders
   */
  const getOrderListSelf = (state: ReducerState): OrderListState => {
    return state.orderListSelf
  }

  const orderListSelf = useSelector(getOrderListSelf)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListSelf

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user || !user.name || success) {
        dispatch({
          type: USER_UPDATE_PROFILE_RESET
        })
        dispatch(getUserDetails('profile'))
        dispatch(listSelfOrders())
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, history, userInfo, user, success])

  /**
   * Submits form data
   * @param e Event from form
   */
  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not Match')
    } else {
      dispatch(
        updateUserProfile({
          _id: user?._id as string,
          name: name,
          email: email,
          password: password
        })
      )
    }
  }

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {success && <Message variant="success">Profile Updated</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt?.substring(0, 10)}</td>
                    <td>${order.totalPrice}</td>
                    <td>
                      {order.isPaid ? order.paidAt?.substring(0, 10) : <FontAwesomeIcon icon={faTimes} color="red" />}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt?.substring(0, 10)
                      ) : (
                        <FontAwesomeIcon icon={faTimes} color="red" />
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`order/${order._id}`}>
                        <Button className="btn-sm" variant="light">
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default ProfileScreen
