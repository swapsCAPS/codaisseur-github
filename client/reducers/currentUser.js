import { SET_CURRENT_USER } from '../actions/authentication'

export default (state = JSON.parse(localStorage.getItem('codaisseur-github.currentUser')) || null, { type, payload } = {}) => {
  switch(type) {
    case SET_CURRENT_USER:
      localStorage.setItem('codaisseur-github.currentUser', JSON.stringify(payload))
      return payload
    default :
      return state
  }
}
