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
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAILURE,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAILURE,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILURE
} from '../Constants/userConstants'

import { ORDER_LIST_SELF_RESET } from '../Constants/orderConstants'

import { Usr } from '../Types/common'
import { AllUserAction, UserAction } from '../Types/reducers'

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
    type: USER_LIST_RESET
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

/**
 * Lists all Users
 */
const listUsers = (): ThunkAction<void, ReducerState, unknown, AllUserAction> => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST
    })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo?.token}`
      }
    }

    const { data }: { data: Usr[] } = await axios.get(`/api/users`, config)

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data
    })
  } catch (err) {
    dispatch({
      type: USER_LIST_FAILURE,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message
    })
  }
}

/**
 * Deletes a user
 * @param id Unique ID of user
 */
const deleteUser = (id: string): ThunkAction<void, ReducerState, unknown, UserAction> => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST
    })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo?.token}`
      }
    }

    await axios.delete(`/api/users/${id}`, config)

    dispatch({
      type: USER_DELETE_SUCCESS
    })
  } catch (err) {
    dispatch({
      type: USER_DELETE_FAILURE,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message
    })
  }
}

/**
 * Updates a user
 * @param user Unique user data
 */
const updateUser = (user: Usr): ThunkAction<void, ReducerState, unknown, UserAction> => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST
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

    const { data }: { data: Usr } = await axios.put(`/api/users/${user._id}`, user, config)

    dispatch({
      type: USER_UPDATE_SUCCESS
    })

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data
    })
  } catch (err) {
    dispatch({
      type: USER_UPDATE_FAILURE,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message
    })
  }
}

export { login, logout, register, getUserDetails, updateUserProfile, listUsers, deleteUser, updateUser }
