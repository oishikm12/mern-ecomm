import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE, USER_LOGOUT } from '../Constants/userConstants'

import { UserState, UserAction } from '../Types/reducers'
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

export { userLoginReducer }
