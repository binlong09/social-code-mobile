import { combineReducers } from 'redux';
import auth from './auth_reducer'
import error from './error_reducer'
import study_group_index from './study_group/study_group_index_reducer'
import study_group_detail from './study_group/study_group_detail_reducer'
import study_group_comments from './study_group/study_group_comment_reducer'
import user from './profile/profile_reducer'

export default combineReducers({
  auth,
  error,
  study_group_index,
  study_group_detail,
  study_group_comments,
  user
})