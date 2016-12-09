I had been working as a bartender for nine years and had been doing some programming in my spare time.  
But after a few years I wanted to take it to the next level.  
I had learned a lot through Google and some online courses, but learning didn't really go fast enough.  
Furthermore, working and learning all by yourself is just a bit boring...  
When I found Codaisseur it looked quite promising to give me a slingshot into the wonderful world of development.  
And boy did it. Working in teams and learning a lot ridiculously quick. It was a blast.  
But enough about me! Lets talk c0de!  

We had an assignment to create a game using a React + Redux frontend, combined with a FeathersJS backend.  
The awesome starter kit we used allowed us to relatively easily set up a multiplayer game.  
The game turned out laggy when not running locally, but still cool.  
Because I had used an html \<canvas> to make the game, I had not really touched on React and Redux that much.  
I wanted to dive in to React + Redux some more. So for the final project I made GitView.  
https://github.com/stofstik/codaisseur-github

As many developers do, we used GitHub of course. GitHub is awesome.  
It is an unmissable collaboration tool for coding projects.  
What's also pretty cool is that you can follow users. just like you would on a social network.  
And that works. Kind of...

[github image]  

My problem with it is that it only displays big events, like when a user create a new repo for example.  
But I wanted to see more! Especially a better overview of commits and when they were made.  
Luckily GitHub provides an API we can call to fetch data and display it as we please.  
There is a catch though. To make a lot of calls to the API we need to authenticate ourselves.  
Also not a big problem! We can just use OAuth and use the well known 'login with ...' pattern.  
Oh dear... It turned out that implementing OAuth with Feathers and React was a bit more difficult than I had expected.  
For three days I struggled. I just could not get it to work. I kept hammering on it but I was getting nowhere.  
Eventually I just let it rest and started actual coding. GitHub allows a few calls to their API without logging in.  

I decided to use a list-detail pattern.  
A list with all the users I'm following with some basic user info. And a detail view with their latest commits.  
Working with React and Redux was a bit daunting at first. But after a few epiphanies it got easier and easier.  
And yes. After letting it rest I managed to get OAuth working. 
Almost... It seems there is a bug in the Feathers framework. It's a long story.  
GitHub issue here: https://github.com/feathersjs/feathers-authentication/issues/344  

### Finally Some Code : /  
(Some irrelevant lines have been removed for brevity)

When the list view is loaded we get all the users we are following  
```
// client/containers/GHList.js
componentWillMount() {
  const { needsUpdate, getFollowing, currentUser } = this.props
  if(!needsUpdate) return
  getFollowing(currentUser.login)
}

// client/actions/get-following.js
export function getFollowing(username) {
  return (dispatch, getState) => {
    fetch(`${URL}/users/${username})
      .then(function(response) {
        return response.json();
      })
      .then(function(following) {
        dispatch({
          type: GET_FOLLOWING,
          payload: following
        })
      })
  }
}
```

The redux store gets populated with the API data and the list view gets updated immediately because we use Redux' mapStateToProps()♥  
```
// client/containers/GHList.js
const mapStateToProps = (state) => {
  return {
    following: state.following,
  }
}

// client/containers/GHList.js
render() {
  const { following } = this.props
  return(
    <div className="list">
      <div className="content">
      {
        following.map((f, key) => {
          return <GHListItem user={f} key={key} />
        })
      }
      </div>
    </div>
  )
}
```

The initial user objects we get from the API are quite basic.  
We need to make a few more calls to get their full user data, their latest events, and their repos.  
```
// client/components/GHListItem.js
componentDidMount() {
  const { user, getFullUser, getRepos, getEvents } = this.props
  setUserLoading(user.id, true)
  getFullUser(user)
  getRepos(user)
  getEvents(user)
  setUserLoading(user.id, false)
}
```
