import { SET_CURRENT_USER } from '../actions/set-current-user'

export default (state = {}, { type, payload } = {}) => {
  switch(type) {
    case SET_CURRENT_USER:
      localStorage.setItem('codaisseur-github.currentUser', JSON.stringify(payload))
      return payload
    default :
      return state
  }
}
