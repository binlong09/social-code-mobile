import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOADING,
  SIGNUP_SUCCESS,
  SIGNUP,
  LOGOUT_SUCCESS
} from '../actions/types';
import { AsyncStorage } from 'react-native'

const initialState = {
  token: AsyncStorage.getItem('token'),
  isLoading: false,
  signedup: false,
  isAuthenticated: false,
  user: {}
}

export default function(state = initialState, action) {
  switch(action.type) {
    case LOADING:
      return {
        ...state,
        isLoading: true
      }
    case SIGNUP_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        signedup: true
      }
    case LOGIN_SUCCESS:
      AsyncStorage.setItem('token', action.payload.token)
      // TBD: Handle Expired Token
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false
      }
    case SIGNUP:
      return {
        ...state,
        isLoading: true
      }
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
      AsyncStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      };
    default:
        return state;
  }
}