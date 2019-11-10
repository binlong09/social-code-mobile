import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOADING,
  SIGNUP_SUCCESS,
  SIGNUP,
  LOGOUT_SUCCESS,
  SIGNUP_FAIL,
  LOAD_TOKEN,
  STUDY_GROUP_INDEX_LOADING
} from '../actions/types';
import { AsyncStorage } from 'react-native'

const initialState = {
  token: null,
  isLoading: false,
  signedup: false,
  isAuthenticated: false,
  user: {}
}

export default function(state = initialState, action) {
  switch(action.type) {
    case LOAD_TOKEN:
      return {
        ...state,
        ...action.payload,
        token: action.payload
      }
    case STUDY_GROUP_INDEX_LOADING:
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
    case SIGNUP:
      return {
        ...state,
        isLoading: true
      }
    case SIGNUP_FAIL:
      return {
        ...state,
        isLoading: false
      }
    case LOGIN_SUCCESS:
      AsyncStorage.setItem('token', action.payload.token)
      // TBD: Handle Expired Token
      return {
        ...state,
        ...action.payload,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false
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