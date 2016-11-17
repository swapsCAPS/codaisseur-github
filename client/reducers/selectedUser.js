import { SET_SELECTED_USER } from '../actions/get-following'

export default (state = {}, { type, payload } = {}) => {
  switch(type) {
    case SET_SELECTED_USER:
      return payload
    default:
      return state
  }
}

