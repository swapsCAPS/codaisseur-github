Hi! My name is Dan, I'm from '89 and have been born and raised in Amsterdam.  

I had been working as a bartender for nine years and had been doing some programming in my spare time.  
But after a few years I wanted to take it to the next level.  
I had learned a lot through Google and some online courses, but learning didn't really go fast enough.  
Furthermore, working and learning all by yourself is just a bit boring...  
When I found Codaisseur it looked quite promising to give me a slingshot into the wonderful world of development.  
And boy did it! Working in teams and learning a lot ridiculously quick. It was a blast!  
But enough about me! Lets talk about some c0de!  

We had an assignment to create a game using a React + Redux frontend, combined with a FeathersJS backend.  
The awesome starter kit we used allowed us to relatively easily set up a multiplayer game.  
The game turned out laggy when not running locally, but still ended up pretty cool.  
Because I had used an html \<canvas> to make the game, I had not really touched on React and Redux that much.  
I wanted to dive in to React + Redux some more. So for the final project I made GitView.  

Throughout the traineeship we used GitHub of course. GitHub is awesome.  
It is an unmissable collaboration tool for team coding projects.  

What's also pretty cool is that you can follow users. Just like you would on a social network.  
<img src="https://github.com/stofstik/codaisseur-github/blob/master/.blog-post-images/github-following.png" alt="screenshot" width="650px"/>  

And that works. Kind of...  
<img src="https://github.com/stofstik/codaisseur-github/blob/master/.blog-post-images/github-overview.png" alt="screenshot" width="650px"/>

The problem with it is that it only displays big events, like when a user creates a new repo for example.  
I wanted to see more! Especially a better overview of a user's commits and when they were made.  
GitHub provides an API we can call to fetch this kind of data and display it in any way we please.  
There is a catch though. To make a lot of calls to the API we need to authenticate ourselves.  
No problem! We can just use OAuth and use the well known 'Login with ...' pattern.  
Oh dear...  
It turned out that implementing OAuth with Feathers and React was a bit more complicated than I had expected.  
For three days I struggled. I just could not get it to work. I kept hammering on it but I was getting nowhere.  
After a great tip from a teacher, I let it rest and started doing some actual coding.  
GitHub allows a few calls to their API without authenticating, so we could at least get some work done.  

I decided to use a simple list-detail pattern.  
A list with all the users I'm following with some basic user info. And a detail view with an overview of their latest commits.  
Working with React and Redux was daunting at first. But after a few epiphanies it got easier and easier.  
And yes. After letting it rest for a while I did manage to get OAuth working. :D  
Well, Almost... It seems there is a bug in the Feathers framework. It's a long story.  
GitHub issue here: https://github.com/feathersjs/feathers-authentication/issues/344  

### Finally Some Code : /
(Some lines have been removed for brevity)  

When the list view is loaded we get all the users we are following.  
```javascript
// client/containers/GHList.js
componentWillMount() {
  // GHList component will be loaded
  const { getFollowing, currentUser } = this.props
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

The redux store gets populated with data from the API and the list view gets updated immediately because we use Redux' mapStateToProps() ♥
```javascript
// client/reducers/following.js
export default (state = [], { type, payload } = {}) => {
  switch(type) {
    ...
    case GET_FOLLOWING:
      return payload
    ...
  }
}

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
      // For every user we are following, render a GHListItem component
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
<img src="https://github.com/stofstik/codaisseur-github/blob/master/.blog-post-images/list-view-not-loaded.png" alt="screenshot" width="650px"/>

We need to make a few more calls to get their full user data, their latest events, and their repos.
```javascript
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

Cool! When all the API calls finish we have all the data we need in our Redux store.  
<img src="https://github.com/stofstik/codaisseur-github/blob/master/.blog-post-images/list-view-loaded.png" alt="screenshot" width="650px"/>

When getting the additional data we add it to the already existing user object.
```javascript
// client/reducers/following.js
export default (state = [], { type, payload } = {}) => {
  switch(type) {
    ...
    case GET_REPOS:
      return state.map((user) => {
        if(user.id === payload.user.id) return Object.assign({}, user, { repos: payload.repositories })
        return user
      })
    ...
  }
}
```
This is quite an expensive operation. It might be better to have a top level store for both.  
And then filter out the data we need for a user at runtime.  

For now though, this works.  
Lets order by 'Latest event' to see who has been busy recently. And check out a user's detail view  
<img src="https://github.com/stofstik/codaisseur-github/blob/master/.blog-post-images/detail.png" alt="screenshot" width="650px"/>

We can expand a list-item to see the commits of this GitHub event
<img src="https://github.com/stofstik/codaisseur-github/blob/master/.blog-post-images/detail-expanded.png" alt="screenshot" width="650px"/>

When expanding, we only set a new height in the component state and React will make automatially use a nice transition animation. Awesome!
```javascript
const NORMAL = 32
const NORMAL_DEPTH = 1
const EXPANDED_DEPTH = 5

class TinyListItem extends Component {
  state = {
    expanded: false,
    height: NORMAL,
    depth: NORMAL_DEPTH
  }
  expand() {
    // We set the height to the match the amount of commits
    const height = NORMAL + 4 + (19 * this.props.event.payload.commits.length)
    // But we only allow a maximum of 200px
    const calculatedHeight = height >= 200 ? 200 : height
    // Then toggle
    if(this.state.expanded === false){
      this.setState({ height: calculatedHeight, depth: EXPANDED_DEPTH, expanded: true })
    }
    if(this.state.expanded === true){
      this.setState({ height: NORMAL, depth: NORMAL_DEPTH, expanded: false })
    }
  }
  render(){
    return (
      // We can set the height using inline styling (And zDepth for a nice shaddow effect from MaterialUI)
      <Paper style={{height: this.state.height}} className="tiny-list-item" zDepth={this.state.depth}>
        // And render the content...
        { this.state.expanded ? this.renderContent(event) : null }
      </Paper>
    )
  }
}
```

It has been an awesome learning exercise and I think it touched nicely on some of the core aspects of React and Redux.  
We have used the Redux store to persist some data and a ReactComponent's state to manipulate the size and styling of a list-item.  
Also we have learned how difficult it can be to properly configure something.  
Reading documentation for hours and not getting anywhere can be really frustrating.  
I am certain there is so much more to learn here though.  
It demonstrates that as a developer, you should never stop learning.  
That's about it! To keep track of your own friends and for the full code, check the GitHub repository!  
https://github.com/stofstik/codaisseur-github  

Cheers!


Daniel
