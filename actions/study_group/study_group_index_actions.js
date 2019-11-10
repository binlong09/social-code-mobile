import { AsyncStorage } from 'react-native'
import { authenticatedAxiosInstance, axiosInstance } from '../../services/client';
import {
  GET_STUDY_GROUPS_INDEX,
  ADD_STUDY_GROUP_INDEX,
  STUDY_GROUP_INDEX_LOADING,
  STUDY_GROUP_GOING_LOADING,
  ACCEPT_STUDY_GROUP,
  CANCEL_STUDY_GROUP
} from '../types';
import { returnErrors } from '../errorActions';
import store from '../../store/'

export const getStudyGroupsIndex = () => (dispatch) => {
  dispatch({
    type: STUDY_GROUP_INDEX_LOADING
  })

  const token = tokenConfig()

  axiosInstance.get('/study_groups', token)
    .then(res => {
      dispatch({
        type: GET_STUDY_GROUPS_INDEX,
        payload: res.data
      })}
    )
    .catch(err =>
      console.log(err)
    );
}

export const addStudyGroupIndex = () => dispatch => {

}

export const setStudyGroupLoading = () => {
  return {
    type: STUDY_GROUP_LOADING
  }
}

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