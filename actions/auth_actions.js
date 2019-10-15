import { AsyncStorage } from 'react-native';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  SIGNUP,
  LOGOUT_SUCCESS
} from './types';
import client from '../services/client'
import axiosInstance from '../services/client';
import {returnErrors } from './errorActions'

export const signup = ({ name, email, password }) => async(dispatch) => {
  dispatch({
    type: SIGNUP
  })
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  // Request body
  const body = JSON.stringify({ name, email, password });

  await axiosInstance.post('/users', body, config)
    .then(res => {
        dispatch({
          type: SIGNUP_SUCCESS,
          payload: res.data
        })
      })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'SIGNUP_FAIL'));
      dispatch({
        type: SIGNUP_FAIL
      })
    })
}

export const login = ({ email, password, }) => async(dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({ email, password });

  await axiosInstance.post('/auth/login', body, config)
    .then(res =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
      dispatch({
        type: LOGIN_FAIL
      })
    })
}

// Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};