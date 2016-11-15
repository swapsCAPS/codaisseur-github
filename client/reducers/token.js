import { SET_GITHUB_TOKEN } from '../actions/set-github-token'

export default (state = localStorage.getItem('feathers-jwt') || null, { type, payload } = {}) => {
  switch(type){
    case SET_GITHUB_TOKEN:
      return state
    default:
      return state
  }
}
