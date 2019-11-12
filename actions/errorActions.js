import { GET_ERRORS, CLEAR_ERRORS } from './types';

// RETURN ERRORS
export const returnErrors = (msg, status, id = null) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status, id }
  }
}

// CLEAR ERRORS
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  }
}

export const errorFormatter = (error) => {
  // original:
  // {"errors":{"meeting_time":["can't be blank"],"class_code":["can't be blank"]}}
  error = JSON.stringify(error)
  error = error.replace(/{/g, "")
  error = error.replace(/}/g, "")
  error = error.replace(/\[/g, "")
  error = error.replace(/\]/g, "")
  error = error.replace(/:/g, " ")
  error = error.replace(/\"/g, "")
  error = error.replace(/_/g, " ")
  return error;
}