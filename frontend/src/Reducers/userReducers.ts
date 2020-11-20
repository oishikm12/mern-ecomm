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
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAILURE,
  USER_DETAILS_RESET
} from '../Constants/userConstants'

import { UserState, UserAction, UserDetailState, UserUpdateState } from '../Types/reducers'
import { Usr } from '../Types/common'

const initialUserState: UserState = {}

/**
 * Performs an action on user login
 * @param state State of user
 * @param action Action to perform
 */
const userLoginReducer = (state: UserState = initialUserState, action: UserAction): UserState => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload as Usr }
    case USER_LOGIN_FAILURE:
      return { loading: false, error: action.payload as string }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

/**
 * Performs an action on user registration
 * @param state State of user
 * @param action Action to perform
 */
const userRegisterReducer = (state: UserState = initialUserState, action: UserAction): UserState => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true }
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload as Usr }
    case USER_REGISTER_FAILURE:
      return { loading: false, error: action.payload as string }
    default:
      return state
  }
}

/**
 * Gets user details
 * @param state State of user
 * @param action Action to perform
 */
const userDetailsReducer = (state: UserDetailState = initialUserState, action: UserAction): UserDetailState => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true }
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload as Usr }
    case USER_DETAILS_FAILURE:
      return { loading: false, error: action.payload as string }
    case USER_DETAILS_RESET:
      return {}
    default:
      return state
  }
}

/**
 * Update user details
 * @param state State of user
 * @param action Action to perform
 */
const userUpdateProfileReducer = (state: UserUpdateState = initialUserState, action: UserAction): UserUpdateState => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true }
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload as Usr }
    case USER_UPDATE_PROFILE_FAILURE:
      return { loading: false, error: action.payload as string }
    default:
      return state
  }
}

export { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer }
