import React, { FC, useState, useEffect, FormEvent } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../Components/Loader'
import Message from '../Components/Message'

import { getUserDetails, updateUserProfile } from '../Actions/userActions'

import { ReducerState } from '../store'
import { UserDetailState, UserState, UserUpdateState } from '../Types/reducers'

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

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user) {
        dispatch(getUserDetails('profile'))
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, history, userInfo, user])

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
        {error && <Message variant="danger">{error}</Message>}
        {success && <Message variant="success">Profile Updated</Message>}
        {loading && <Loader />}
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
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  )
}

export default ProfileScreen
