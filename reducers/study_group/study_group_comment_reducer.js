import {
  GET_STUDY_GROUP_COMMENT,
  STUDY_GROUP_COMMENT_LOADING
} from '../../actions/types'

const initialState = {
  study_group_comments: {},
  isLoading: false
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_STUDY_GROUP_COMMENT:
      return {
        ...state,
        ...action.payload,
        isLoading: false
      }
    case STUDY_GROUP_COMMENT_LOADING:
      return {
        ...state,
        isLoading: true
      }
    default:
      return state;
  }
}