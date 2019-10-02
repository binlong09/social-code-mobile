import { combineReducers } from 'redux';
import auth from './auth_reducer'
import error from './error_reducer'

export default combineReducers({
  auth,
  error
})