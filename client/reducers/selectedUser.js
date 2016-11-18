import { RESET_SELECTED_USER, SET_SELECTED_USER } from '../actions/get-following'

export default (state = {}, { type, payload } = {}) => {
  switch(type) {
    case RESET_SELECTED_USER:
      return {}
    case SET_SELECTED_USER:
      return payload
    default:
      return state
  }
}

