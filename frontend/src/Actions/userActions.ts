import axios from 'axios'

import { ThunkAction } from 'redux-thunk'

import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAILURE,
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAILURE,
  USER_UPDATE_PROFILE_RESET
} from '../Constants/userConstants'

import { ORDER_LIST_SELF_RESET } from '../Constants/orderConstants'

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

/**
 * Logs an user out of session
 */
const logout = (): ThunkAction<void, ReducerState, unknown, UserAction> => (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({
    type: USER_LOGOUT
  })
  dispatch({
    type: USER_DETAILS_RESET
  })
  dispatch({
    type: ORDER_LIST_SELF_RESET
  })
}

/**
 * Creates a new user
 * @param name Name of user
 * @param email Email entered by user
 * @param password Password entered by user
 */
const register = (
  name: string,
  email: string,
  password: string
): ThunkAction<void, ReducerState, unknown, UserAction> => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST
    })

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const { data }: { data: Usr } = await axios.post('/api/users', { name, email, password }, config)

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data
    })

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (err) {
    dispatch({
      type: USER_REGISTER_FAILURE,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message
    })
  }
}

/**
 * Gets data about a user
 * @param id Unique user ID
 */
const getUserDetails = (id: string): ThunkAction<void, ReducerState, unknown, UserAction> => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST
    })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo?.token}`
      }
    }

    const { data }: { data: Usr } = await axios.get(`/api/users/${id}`, config)

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data
    })
  } catch (err) {
    dispatch({
      type: USER_DETAILS_FAILURE,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message
    })
  }
}

/**
 * Update User Profile
 * @param user Unique user instance
 */
const updateUserProfile = (user: Usr): ThunkAction<void, ReducerState, unknown, UserAction> => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST
    })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo?.token}`
      }
    }

    const { data }: { data: Usr } = await axios.put(`/api/users/profile`, user, config)

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data
    })
  } catch (err) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAILURE,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message
    })
  }
}

export { login, logout, register, getUserDetails, updateUserProfile }
