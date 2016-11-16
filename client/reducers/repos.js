import { GET_REPOS, GET_REPO_EVENTS } from '../actions/get-following'

export default (state = [], { type, payload } = {}) => {
  switch(type) {
    case GET_REPOS:
      return state.concat(payload)
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

const sortReposByCreatedAt = (array) => {
  return array.sort((a, b) => {
    if(a.created_at > b.created_at) return 1
    if(a.created_at < b.created_at) return -1
    return 0
  })
}

