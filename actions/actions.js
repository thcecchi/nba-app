import fetch from 'isomorphic-fetch'
import nba from 'nba'
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const FIND_PLAYER = 'FIND_PLAYER'
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'

export function findPlayer(playerName) {
  console.log('find player action')
  return {
    type: FIND_PLAYER,
    playerName
  }
}

export function invalidateSubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  }
}

function requestPosts(subreddit) {
  console.log('request posts action')
  return {
    type: REQUEST_POSTS,
    subreddit
  }
}

function receivePosts(subreddit, json) {
  console.log('receive posts action')
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.commonPlayerInfo,
    receivedAt: Date.now()
  }
}

function searchPlayer(playerName) {
  console.log('search player action')
  return dispatch => {
    dispatch(findPlayer(playerName))
  }
}

function fetchPosts(subreddit) {
  return dispatch => {
    dispatch(requestPosts(subreddit))
    // console.log(subreddit)
    // return fetch(`http://www.reddit.com/r/${subreddit}.json`)
    //   .then(response => response.json())
    //   .then(json => dispatch(receivePosts(subreddit, json)))

      var nbaAPI = nba

      return nba.ready(function () {
        console.log('fetch posts action')

          nbaAPI.api.playersInfo({}, (err, response) => {
            var itemList = response.resultSets[0].rowSet;
            itemList.forEach(function (player) {
              if (subreddit == player[2]) {
                nbaAPI.api.playerInfo({playerId: player[0]}, (err, response) => {
                  dispatch(receivePosts(subreddit, response))
                })
              }
            })
            // var randomPlayer = [Math.floor(Math.random()*itemList.length)];
            // var player = itemList[randomPlayer][0]
            // console.log(player)

            // nbaAPI.api.playerInfo({playerId: player}, (err, response) => {
            //   dispatch(receivePosts(subreddit, response))
            // })
          })
      });
  }
}

function shouldFetchPosts(state, subreddit) {
  const posts = state.postsBySubreddit[subreddit]
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

export function fetchPostsIfNeeded(subreddit) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit))
    }
  }
}
