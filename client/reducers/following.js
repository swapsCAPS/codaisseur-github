import { RESET_FOLLOWING, GET_FOLLOWING, GET_FULL_USER, GET_REPOS, GET_EVENTS, SORT_FOLLOWING } from '../actions/get-following'

export default (state = [], { type, payload } = {}) => {
  switch(type) {
    case RESET_FOLLOWING:
      return []
    case GET_FOLLOWING:
      return sortByLoginName(payload)
    case GET_FULL_USER:
      return state.map((user) => {
        if(user.id === payload.fullUser.id) return payload.fullUser
        return user
      })
    case GET_REPOS:
      const repositories = sortByCreatedAt(payload.repositories)
      return state.map((user) => {
        if(user.id === payload.user.id) return Object.assign({}, user, { repos: repositories })
        return user
      })
    case GET_EVENTS:
      const userEvents = sortByCreatedAt(payload.events)
      return state.map((user) => {
        if(user.id === payload.user.id) return Object.assign({}, user, { events: userEvents })
        return user
      })
    case SORT_FOLLOWING:
      switch(payload.orderBy){
        case 'login':
          if(payload.asc) return sortByLoginName(state)
          return sortByLoginName(state).reverse()
        case 'publicRepos':
          if(payload.asc) return sortByPublicRepos(state)
          return sortByPublicRepos(state).reverse()
        case 'latestEvent':
          if(payload.asc) return sortByLatestEvent(state)
          return sortByLatestEvent(state).reverse()
        default:
          return state
      }
    default:
      return state
  }
}

const sortByLoginName = (users) => {
  return users.sort((a, b) => {
    if(a.login.toLowerCase() > b.login.toLowerCase()) return 1
    if(a.login.toLowerCase() < b.login.toLowerCase()) return -1
    return 0
  })
}

const sortByLatestEvent = (users) => {
  return users.sort((a, b) => {
    if(a.events[0].created_at > b.events[0].created_at) return 1
    if(a.events[0].created_at < b.events[0].created_at) return -1
    return 0
  })
}

const sortByPublicRepos = (array) => {
  return array.sort((a, b) => {
    return b.public_repos - a.public_repos
  })
}

// Sort ascending for easy access to latest. i.e: array[0]
const sortByCreatedAt = (repos) => {
  return repos.sort((b, a) => {
    if(a.created_at > b.created_at) return 1
    if(a.created_at < b.created_at) return -1
    return 0
  })
}
