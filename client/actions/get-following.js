import fetch from 'isomorphic-fetch'

export const SORT_FOLLOWING = 'SORT_FOLLOWING'
export function sortFollowing() {
  return {
    type: SORT_FOLLOWING
  }
}

export const GET_FOLLOWING = 'GET_FOLLOWING'
export function getFollowing(username) {
  return (dispatch, getState) => {
    fetch(`https://api.github.com/users/${username}/following`)
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
        return dispatch(sortFollowing())
      })
      .then(function(following) {
        getState().following.map((user) => {
          dispatch(getRepos(user))
        })
      })
  }
}

export const GET_REPOS = 'GET_REPOS'
export function getRepos(user) {
  return (dispatch, getState) => {
    return fetch(user.repos_url + '?per_page=200')
      .then(function(response) {
        if (response.status >= 400) {
          throw new error('bad response from server');
        }
        return response.json();
      })
      .then(function(repositories) {
        dispatch({
          type: GET_REPOS,
          payload: {
            user,
            repositories
          }
        })
      });
  }
}

export const GET_REPO_EVENTS = 'GET_REPO_EVENTS'
export function getRepoEvents(repo) {
  return (dispatch, getState) => {
    return fetch(repo.events_url + '?per_page=50')
      .then(function(response) {
        if (response.status >= 400) {
          throw new error('bad response from server');
        }
        return response.json();
      })
      .then(function(events) {
        dispatch({
          type: GET_REPO_EVENTS,
          payload: {
            user,
            repo,
            events
          }
        })
      });
  }
}
