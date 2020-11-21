import React, { FC, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faEdit, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons'

import Loader from '../Components/Loader'
import Message from '../Components/Message'

import { listUsers, deleteUser } from '../Actions/userActions'

import { ReducerState } from '../store'
import { AllUserState, UserState, UserModifyState } from '../Types/reducers'

const UserListScreen: FC<RouteComponentProps> = ({ history }) => {
  const dispatch = useDispatch()

  /**
   * Determines state
   * @param state All global states
   * @return Current user list
   */
  const getUserList = (state: ReducerState): AllUserState => {
    return state.userList
  }

  const userList = useSelector(getUserList)
  const { loading, error, users } = userList

  /**
   * Determines state
   * @param state All global states
   * @return Current deletion state
   */
  const getUserDelete = (state: ReducerState): UserModifyState => {
    return state.userDelete
  }

  const userDelete = useSelector(getUserDelete)
  const { success } = userDelete

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
    if (userInfo && userInfo.isAdmin) dispatch(listUsers())
    else history.push('/login')
  }, [dispatch, history, userInfo, success])

  /**
   * Wipes an user from existance
   * @param id Select user ID
   */
  const deleteHandler = (id: string) => {
    if (window.confirm('Are you sure ?')) dispatch(deleteUser(id))
  }

  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <FontAwesomeIcon icon={faCheck} color="green" />
                    ) : (
                      <FontAwesomeIcon icon={faTimes} color="red" />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <FontAwesomeIcon icon={faEdit} />
                      </Button>
                    </LinkContainer>
                    <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(user._id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default UserListScreen
