import fetch from 'isomorphic-fetch'

const URL = 'https://api.github.com'
const accessToken = (currentUser) => {
  return '?access_token=' + currentUser.github.accessToken
}
const perPage = (amount) => {
  return '&per_page=' + amount
}
const sortAsc = (boolean, param) => {
  return boolean ? '&order=asc&sort=' + param : '&order=desc&sort=' + param
}

export const SORT_FOLLOWING = 'SORT_FOLLOWING'
export function sortFollowing(orderBy = 'login', asc = true) {
  return {
    type: SORT_FOLLOWING,
    payload: { orderBy, asc }
  }
}

export const GET_FOLLOWING = 'GET_FOLLOWING'
export function getFollowing(username) {
  return (dispatch, getState) => {
    fetch(`${URL}/users/${username}/following${accessToken(getState().currentUser)}`)
      .then(function(response) {
        if (response.status >= 400) {
          throw new error('bad response from server');
        }
        return response.json();
      })
      .then(function(following) {
        return dispatch({
          type: GET_FOLLOWING,
          payload: following
        })
      })
      .then(function() {
        // We have all users we are following
        getState().following.map((user) => {
          // Get ALL THE REPOS
          dispatch(getRepos(user))
          // Get full user object from github api.
          // https://api.github.com/users/<username>/following
          // gives nerfed representation
          dispatch(getFullUser(user))
        })
      })
  }
}

export const GET_FULL_USER = 'GET_FULL_USER'
export function getFullUser(user) {
  return (dispatch, getState) => {
    return fetch(`${user.url}${accessToken(getState().currentUser)}`)
      .then(function(response) {
        if (response.status >= 400) {
          throw new error('bad response from server');
        }
        return response.json();
      })
      .then(function(fullUser) {
        return dispatch({
          type: GET_FULL_USER,
          payload: {
            user,
            fullUser
          }
        })
      });
  }
}

export const GET_REPOS = 'GET_REPOS'
export function getRepos(user) {
  return (dispatch, getState) => {
    return fetch(`${user.repos_url}${accessToken(getState().currentUser)}${perPage(200)}`)
      .then(function(response) {
        if (response.status >= 400) {
          throw new error('bad response from server');
        }
        return response.json();
      })
      .then(function(repositories) {
        // Fetch repo events
        repositories.map((repo) => dispatch(getRepoEvents(repo)))
        return dispatch({
          type: GET_REPOS,
          payload: repositories
        })
      })
  }
}

export const GET_REPO_EVENTS = 'GET_REPO_EVENTS'
export function getRepoEvents(repo) {
  return (dispatch, getState) => {
    return fetch(repo.events_url +
      accessToken(getState().currentUser) +
      perPage(5) +
      sortAsc(true, 'created_at')) // TODO This does not seem to work
      .then(function(response) {
        if (response.status >= 400) {
          throw new error('bad response from server');
        }
        return response.json();
      })
      .then(function(events) {
        dispatch({
          type: GET_REPO_EVENTS,
          payload: events
        })
      })
  }
}
