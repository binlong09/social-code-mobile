import { axiosInstance } from '../../services/client';
import {
  GET_STUDY_GROUP_DETAIL,
  STUDY_GROUP_DETAIL_LOADING
} from '../types'
import { tokenConfig } from '../auth_actions'

export const getStudyGroupDetail = (id) => (dispatch) => {
  dispatch({
    type: STUDY_GROUP_DETAIL_LOADING
  })

  const token = tokenConfig()

  axiosInstance.get(`/study_groups/${id}`, token)
    .then(res => {
      dispatch({
        type: GET_STUDY_GROUP_DETAIL,
        payload: res.data
      })}
    )
    .catch(err =>
      // TBD show errors
      console.log(err)
    )
}