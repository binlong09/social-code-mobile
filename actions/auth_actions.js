import { AsyncStorage } from 'react-native';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  SIGNUP
} from './types';
import { NavigationActions } from 'react-navigation';
import client from '../services/client'

export const signup = ({ username, email, password }) => dispatch => {
  dispatch({
    type: SIGNUP
  })

  // const config = {

  // }

  // const body = JSON.stringify({ username, email, password });

  // client.post('/users', body, config)
  //   .then(res => dispatch({
  //     type: SIGNUP_SUCCESS,
  //     payload: res.data
  //   }))
  //   .catch(err => {
  //     dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
  //     dispatch({
  //       type: REGISTER_FAIL
  //     })
  //   })
}