import {
  GET_STUDY_GROUPS_INDEX,
  ADD_STUDY_GROUP_INDEX,
  STUDY_GROUP_INDEX_LOADING,
} from '../../actions/types.js';

const initialState = {
  study_groups: [],
  isLoading: false
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_STUDY_GROUPS_INDEX:
      return {
        ...state,
        ...action.payload,
        isLoading: false
      }
    case ADD_STUDY_GROUP_INDEX:

    case STUDY_GROUP_INDEX_LOADING:
      return {
        ...state,
        isLoading: true
      }
    default:
      return state;
  }
}