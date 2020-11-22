import React, { FC, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import Loader from '../Components/Loader'
import Message from '../Components/Message'

import { listOrders } from '../Actions/orderActions'

import { ReducerState } from '../store'
import { UserState, OrderListState } from '../Types/reducers'
import { Usr } from '../Types/common'

const OrderListScreen: FC<RouteComponentProps> = ({ history }) => {
  const dispatch = useDispatch()

  /**
   * Determines state
   * @param state All global states
   * @return Current orders fetched
   */
  const getOrderList = (state: ReducerState): OrderListState => {
    return state.orderList
  }

  const orderList = useSelector(getOrderList)
  const { loading, error, orders } = orderList

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
    if (userInfo && userInfo.isAdmin) dispatch(listOrders())
    else history.push('/login')
  }, [dispatch, history, userInfo])

  return (
    <>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
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
                  <td>{order.user && (order.user as Usr).name}</td>
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
                    <LinkContainer to={`/order/${order._id}/`}>
                      <Button variant="light" className="btn-sm">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default OrderListScreen
