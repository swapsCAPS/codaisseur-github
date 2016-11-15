import { GET_FOLLOWING, SORT_FOLLOWING, GET_REPOS, GET_REPO_EVENTS } from '../actions/get-following'

export default (state = [], { type, payload } = {}) => {
  switch(type) {
    case GET_FOLLOWING:
      return payload
    case SORT_FOLLOWING:
      return sort(state)
    case GET_REPOS:
      return state.map((user) => {
        if(user.id === payload.user.id) {
          return Object.assign({}, user, {repos: payload.repositories})
        }
        return user
      })
    case GET_REPO_EVENTS:
      return state.map((user) => {
        if(user.id === payload.user.id) {
          user.repos.map((repo) => {
            if(repo.id === payload.repo.id) {
              return Object.assign({}, repo, {events: payload.events})
            }
            return repo
          })
          return Object.assign({}, user, {repos: payload.repositories})
        }
        return user
      })
    default:
      return state
  }
}

const sort = (array) => {
  return array.sort((a, b) => {
    if(a.login.toLowerCase() > b.login.toLowerCase()) return 1
    if(a.login.toLowerCase() < b.login.toLowerCase()) return -1
    return 0
  })
}
