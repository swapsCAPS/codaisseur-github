import { SET_GITHUB_TOKEN } from '../actions/set-current-user'

export default (state = localStorage.getItem('feathers-jwt') || null, { type, payload } = {}) => {
  switch(type){
    case SET_GITHUB_TOKEN:
      return payload
    default:
      return state
  }
}
