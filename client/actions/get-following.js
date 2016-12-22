import fetch from 'isomorphic-fetch'
/*
 * URL helpers for easier API calls
 */
const URL = 'https://api.github.com'
const accessToken = (currentUser) => {
  if(!currentUser) return '?access_token='
  if(!currentUser.github) return '?access_token='
  return '?access_token=' + currentUser.github.accessToken
}
const perPage = (amount) => {
  return '&per_page=' + amount
}
const sortAsc = (boolean, param) => {
  return boolean ? '&order=asc&sort=' + param : '&order=desc&sort=' + param
}

/*
 *
 * ALL THE ACTIONS 8-/
 *
 */
export const SORT_FOLLOWING = 'SORT_FOLLOWING'
export function sortFollowing(orderBy = 'login', asc = true) {
  return {
    type: SORT_FOLLOWING,
    payload: { orderBy, asc }
  }
}

export const RESET_FOLLOWING = 'RESET_FOLLOWING'
export function resetFollowing(){
  return {
    type: RESET_FOLLOWING
  }
}

export const RESET_SELECTED_USER = 'RESET_SELECTED_USER'
export function resetSelectedUser(){
  return {
    type: RESET_SELECTED_USER
  }
}

export const SET_USER_LOADING = 'SET_USER_LOADING'
export function setUserLoading(id, loading){
  return {
    type: SET_USER_LOADING,
    payload: { id, loading }
  }
}

export const SET_NEEDS_UPDATE = 'SET_NEEDS_UPDATE'
export function setNeedsUpdate(needsUpdate){
  return {
    type: SET_NEEDS_UPDATE,
    payload: needsUpdate
  }
}

function apiCall(url) {
  return fetch(url)
    .then(function(response) {
      if (response.status >= 400) {
        throw new error('bad response from server');
      }
      return response.json();
    })
}

export const GET_FOLLOWING = 'GET_FOLLOWING'
export function getFollowing(username) {
  return (dispatch, getState) => {
    apiCall(`${URL}/users/${username}/following${accessToken(getState().currentUser)}`)
      .then(function(following) {
        dispatch({
          type: GET_FOLLOWING,
          payload: following
        })
        dispatch({
          type: SET_NEEDS_UPDATE,
          payload: false
        })
      })
  }
}

export const GET_FULL_USER = 'GET_FULL_USER'
export const GET_REPOS = 'GET_REPOS'
export const GET_EVENTS = 'GET_EVENTS'
export function getAllUserData(user) {
  return (dispatch, getState) => { 
    dispatch(setUserLoading(user.id, true)),
    Promise.all([
      apiCall(`${user.url}${accessToken(getState().currentUser)}`),
      apiCall(`${user.repos_url}${accessToken(getState().currentUser)}${perPage(200)}`),
      apiCall(`${user.url}/events${accessToken(getState().currentUser)}`)
    ]).then((results) => {
      dispatch({
        type: GET_FULL_USER,
        payload: { user, fullUser: results[0] }
      })
      dispatch({
 
        type: GET_REPOS,
        payload: { user, repositories: results[1] }
      })
      dispatch({
        type: GET_EVENTS,
        payload: { user, events: results[2] }
      })
    }).then(() => {
      dispatch(setUserLoading(user.id, false))
    }).catch((err) => {
      console.log('Error loading user:', err)
    })
  }
}

export const GO_TO_COMMIT = 'GO_TO_COMMIT'
export function goToCommit(commitURL) {
  return (dispatch, getState) => {
    apiCall(commitURL)
      .then(function(commit) {
        console.log(commit.html_url)
        window.open(commit.html_url)
      })
  }
}


export const SET_SELECTED_USER = 'SET_SELECTED_USER'
export function setSelectedUser(userId) {
  return (dispatch, getState) => {
    const selectedUser = getState().following.filter((f) => f.id === userId)
    dispatch({
      type: SET_SELECTED_USER,
      payload: selectedUser[0]
    })
  }
}
