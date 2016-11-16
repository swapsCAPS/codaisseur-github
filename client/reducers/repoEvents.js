import { GET_REPO_EVENTS } from '../actions/get-following'

export default (state = [], { type, payload } = {}) => {
  switch(type) {
    case GET_REPO_EVENTS:
      return state.concat(payload)
    default:
      return state
  }
}
