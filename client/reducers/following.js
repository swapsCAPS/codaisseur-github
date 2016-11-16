import { GET_FOLLOWING, GET_FULL_USER, SORT_FOLLOWING } from '../actions/get-following'

export default (state = [], { type, payload } = {}) => {
  switch(type) {
    case GET_FOLLOWING:
      return sortByLogin(payload)
    case GET_FULL_USER:
      return state.map((user) => {
        if(user.id === payload.fullUser.id) return payload.fullUser
        return user
      })
    case SORT_FOLLOWING:
      switch(payload.orderBy){
        case 'login':
          if(payload.asc) return sortByLogin(state)
          return sortByLogin(state).reverse()
        case 'publicRepos':
          if(payload.asc) return sortByPublicRepos(state)
          return sortByPublicRepos(state).reverse()
        default:
          return state
      }
    default:
      return state
  }
}

const sortByLogin = (array) => {
  return array.sort((a, b) => {
    if(a.login.toLowerCase() > b.login.toLowerCase()) return 1
    if(a.login.toLowerCase() < b.login.toLowerCase()) return -1
    return 0
  })
}

const sortByPublicRepos = (array) => {
  return array.sort((a, b) => {
    return b.public_repos - a.public_repos
  })
}
