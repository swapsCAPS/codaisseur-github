import api from '../middleware/api'
import { history } from '../store'

export function authenticate() {
  return (dispatch) => {
    api.authenticate()
      .then((response) => {
        dispatch(setCurrentUser(response.data))
        dispatch(setGithubToken(response.token))
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

export const SET_GITHUB_TOKEN = 'SET_GITHUB_TOKEN'
export function setGithubToken(token) {
  return {
    type: SET_GITHUB_TOKEN,
    payload: token
  }
}
