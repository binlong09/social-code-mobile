import { AsyncStorage } from 'react-native';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  SIGNUP,
  LOGOUT_SUCCESS,
  LOAD_TOKEN
} from './types';
import { axiosInstance } from '../services/client';
import { returnErrors } from './errorActions'
import store from '../store/'

export const loadToken = () => async (dispatch) => {
  const token = await AsyncStorage.getItem('token')

  dispatch({
    type: LOAD_TOKEN,
    payload: token
  })
}

export const signup = ({ name, email, password }) => async(dispatch) => {
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

export const tokenConfig = () => {
  const token = store.getState().auth.token

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  if (token) {
    config.headers['Authorization'] = token;
  }

  return config;
}