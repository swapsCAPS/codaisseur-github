import { GET_FOLLOWING, SORT_FOLLOWING } from '../actions/get-following'

export default (state = [], { type, payload } = {}) => {
  switch(type) {
    case GET_FOLLOWING:
      return sortByLogin(payload)
    case SORT_FOLLOWING:
      switch(payload.orderBy){
        case 'login':
          if(payload.asc) return sortByLogin(state)
          return sortByLogin(state).reverse()
        case 'repoAmount':
          if(payload.asc) return sortByLogin(state)
          return sortByLogin(state).reverse()
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

const sortByRepoAmount = (array) => {
  return array.sort((a, b) => {
    return b.repos.length - a.repos.length
  })
}
