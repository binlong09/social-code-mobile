import {
  GET_STUDY_GROUP_DETAIL,
  STUDY_GROUP_DETAIL_LOADING
} from '../../actions/types'

const initialState = {
  study_group: {},
  isLoading: false
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_STUDY_GROUP_DETAIL:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
      }
    case STUDY_GROUP_DETAIL_LOADING:
      return {
        ...state,
        isLoading: true
      }
    default:
      return state;
  }
}