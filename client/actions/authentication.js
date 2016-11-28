import api from '../middleware/api'
import { history } from '../store'

export function authenticate() {
  return (dispatch) => {
    api.authenticate()
      .then((response) => {
        debugger
        console.log('Authenticated!', response);
        return api.passport.verifyJWT(response.accessToken);
      })
      .then((payload) => {
        console.log('JWT Payload', payload);
        return api.service('users').get(payload.userId);
      })
      .then((user) => {
        api.set('user', user);
        console.log('User', client.get('user'));
      })
      .then((response) => {
        dispatch(setCurrentUser(response.data))
        history.push('/')
      })
      .catch((error) => {
        console.error('Error authenticating: ', error)
      })
  }
}

export const SET_CURRENT_USER = 'SET_CURRENT_USER'
export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    payload: user
  }
}
