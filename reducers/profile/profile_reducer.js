import {
  GET_PROFILE,
  PROFILE_LOADING
} from '../../actions/types'

const initialState = {
  user: {},
  isLoading: false
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_PROFILE:
      return {
        ...state,
        ...action.payload,
        isLoading: false
      }
    case PROFILE_LOADING:
      return {
        ...state,
        isLoading: true
      }
    default:
      return state;
  }
}