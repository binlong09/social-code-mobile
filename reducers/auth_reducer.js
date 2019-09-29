import {
  LOGIN_SUCESS,
  LOGIN_FAIL,
  LOADING,
  SIGNUP_SUCCESS,
  SIGNUP
} from '../actions/types';
import deviceStorage from '../services/deviceStorage';

const initialState = {
  // token: AsyncStorage.getItem('token'),
  isLoading: false,
  signedup: false
}

export default function(state = initialState, action) {
  switch(action.type) {
    case LOADING:
      return {
        ...state,
        isLoading: true
      }
    case LOGIN_SUCESS:
      return {
        ...state,
        isLoading: false
      }
      case SIGNUP_SUCCESS:
        return {
          ...state,
          isLoading: false,
          signedup: true
        }
      case SIGNUP:
        return {
          ...state,
          isLoading: true
        }
      default:
        return initialState;
  }
}