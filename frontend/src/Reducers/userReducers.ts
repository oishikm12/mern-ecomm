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
  USER_DETAILS_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAILURE,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAILURE,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILURE,
  USER_UPDATE_RESET
} from '../Constants/userConstants'

import {
  UserState,
  UserAction,
  UserDetailState,
  UserUpdateState,
  AllUserState,
  AllUserAction,
  UniversalState
} from '../Types/reducers'
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

/**
 * Update user list
 * @param state State of user lists
 * @param action Action to perform
 */
const userListReducer = (state: AllUserState = initialUserState, action: AllUserAction): AllUserState => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true }
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload as Usr[] }
    case USER_LIST_FAILURE:
      return { loading: false, error: action.payload as string }
    case USER_LIST_RESET:
      return { users: [] }
    default:
      return state
  }
}

/**
 * Deletes an user
 * @param state State of deletion
 * @param action Action to perform
 */
const userDeleteReducer = (state: UniversalState = initialUserState, action: UserAction): UniversalState => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true }
    case USER_DELETE_SUCCESS:
      return { loading: false, success: true }
    case USER_DELETE_FAILURE:
      return { loading: false, error: action.payload as string }
    default:
      return state
  }
}

/**
 * Updates an user data
 * @param state State of user
 * @param action Action to perform
 */
const userUpdateReducer = (state: UniversalState = initialUserState, action: UserAction): UniversalState => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true }
    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case USER_UPDATE_FAILURE:
      return { loading: false, error: action.payload as string }
    case USER_UPDATE_RESET:
      return {}
    default:
      return state
  }
}

export {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer
}
