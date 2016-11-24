import { SET_NEEDS_UPDATE } from '../actions/get-following'

export default (state = true, { type, payload } = {}) => {
  switch(type) {
    case SET_NEEDS_UPDATE:
      return payload
    default:
      return state
  }
}
