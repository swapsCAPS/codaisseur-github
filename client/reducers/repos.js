import { GET_REPOS, GET_REPO_EVENTS } from '../actions/get-following'

export default (state = [], { type, payload } = {}) => {
  switch(type) {
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

