import { axiosInstance } from '../../services/client'
import {
  GET_STUDY_GROUP_COMMENT,
  STUDY_GROUP_COMMENT_LOADING
} from '../types'
import { tokenConfig } from '../auth_actions'

export const getStudyGroupComments = (id) => (dispatch) => {
  dispatch({
    type: STUDY_GROUP_COMMENT_LOADING
  })

  const token = tokenConfig()

  axiosInstance.get(`/study_group_posts/${id}/study_group_comments`, token)
    .then(res => {
      dispatch({
        type: GET_STUDY_GROUP_COMMENT,
        payload: res.data
        })
      return res.data;
      }
    )
    .catch(err =>
      // TBD show errors
      console.log(err)
    )
}