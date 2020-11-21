import React, { FC, useState, useEffect, FormEvent, ChangeEvent } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../Components/Loader'
import Message from '../Components/Message'
import FormContainer from '../Components/FormContainer'

import { getUserDetails, updateUser } from '../Actions/userActions'

import { USER_UPDATE_RESET } from '../Constants/userConstants'

import { ReducerState } from '../store'
import { UserModifyState, UserDetailState } from '../Types/reducers'

const UserEditScreen: FC<RouteComponentProps<{ id: string }>> = ({ match, history }) => {
  const userId = match.params.id

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

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
   * @return Current user updation
   */
  const getUserUpdate = (state: ReducerState): UserModifyState => {
    return state.userUpdate
  }

  const userUpdate = useSelector(getUserUpdate)
  const { loading: loadingUpdate, error: errorUpdate, success } = userUpdate

  /**
   * Submits form data
   * @param e Event from form
   */
  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    dispatch(
      updateUser({
        _id: userId,
        name,
        email,
        isAdmin
      })
    )
  }

  useEffect(() => {
    if (success) {
      dispatch({
        type: USER_UPDATE_RESET
      })
      history.push('/admin/userlist')
    } else {
      if (!user?.name || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin as boolean)
      }
    }
  }, [dispatch, userId, user, history, success])

  return (
    <>
      <Link to="/admin/userlist/" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
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
            <Form.Group controlId="isadmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default UserEditScreen
