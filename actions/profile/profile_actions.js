import { axiosInstance } from '../../services/client'
import {
  GET_PROFILE,
  PROFILE_LOADING
} from '../types'

import { tokenConfig } from '../auth_actions'

export const getProfile = (id = "") => (dispatch) => {
  dispatch({
    type: PROFILE_LOADING
  })

  const token = tokenConfig()

  axiosInstance.get(`/users/${id}`, token)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })}
    )
    .catch(err => console.log(err)) // TBD Show error
}