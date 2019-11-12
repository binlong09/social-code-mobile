import { axiosInstance } from '../../services/client';
import {
  GET_STUDY_GROUPS_INDEX,
  STUDY_GROUP_INDEX_LOADING,
} from '../types';
import { tokenConfig } from '../auth_actions'

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
      // TBD Show error
      console.log(err)
    );
}

export const setStudyGroupLoading = () => {
  return {
    type: STUDY_GROUP_LOADING
  }
}