import axios from 'axios'

import { ThunkAction } from 'redux-thunk'

import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE, USER_LOGOUT } from '../Constants/userConstants'

import { Usr } from '../Types/common'
import { UserAction } from '../Types/reducers'

import { ReducerState } from '../store'

/**
 * Logs a user in if possible
 * @param email Email entered by user
 * @param password Password entered by user
 */
const login = (email: string, password: string): ThunkAction<void, ReducerState, unknown, UserAction> => async (
  dispatch
) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST
    })

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const { data }: { data: Usr } = await axios.post('/api/users/login', { email, password }, config)

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (err) {
    dispatch({
      type: USER_LOGIN_FAILURE,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message
    })
  }
}

export { login }
