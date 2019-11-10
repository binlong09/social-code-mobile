import { combineReducers } from 'redux';
import auth from './auth_reducer'
import error from './error_reducer'
import study_group_index from './study_group/study_group_index_reducer'

export default combineReducers({
  auth,
  error,
  study_group_index
})