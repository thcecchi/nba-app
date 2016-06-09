import fetch from 'isomorphic-fetch'
import nba from 'nba'
// export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_PLAYER_DATA = 'RECEIVE_PLAYER_DATA'
export const FIND_PLAYER = 'FIND_PLAYER'
export const SET_PLAYER_LIST = 'SET_PLAYER_LIST'
// export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'

function findPlayer(playerName, playerList) {
  console.log('find player action')
  console.log(playerList)
  return {
    type: FIND_PLAYER,
    playerName,
    playerList
  }
}

export function setPlayerList(playerList) {
  console.log('set player list')
  console.log(playerList)
  return {
    type: SET_PLAYER_LIST,
    playerList
  }
}

//
// export function invalidateSubreddit(subreddit) {
//   return {
//     type: INVALIDATE_SUBREDDIT,
//     subreddit
//   }
// }

// function requestPosts(subreddit) {
//   console.log('request posts action')
//   return {
//     type: REQUEST_POSTS,
//     subreddit
//   }
// }

function receivePlayer(playerData) {
  console.log('receive posts action')
  return {
    type: RECEIVE_PLAYER_DATA,
    stats: playerData.commonPlayerInfo,
    receivedAt: Date.now()
  }
}

export function searchPlayer(playerName, playerList) {
  console.log('search player action')
  return dispatch => {
    dispatch(findPlayer(playerName, playerList))
    // NEED TO FIRE receivePlayerData FUNCTION WHEN findPlayer IS COMPLETED
    .then(receivePlayerData)
  }
}

function receivePlayerData(playerId) {
  console.log('player id is ' + playerId)
  nbaAPI.api.playerInfo({playerId: playerId}, (err, response) => {
    dispatch(receivePlayer(response))
  })
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

export function getPlayerList() {
  // dispatch(requestPosts(subreddit))
  console.log('get player list')
  var nbaAPI = nba
  return dispatch => {
    nbaAPI.api.playersInfo({}, (err, response) => {
      var itemList = response.resultSets[0].rowSet;
      console.log(itemList)
      dispatch(setPlayerList(itemList))
    })
  }
}

// function shouldFetchPosts(state, data) {
//   console.log('should fetch posts????')
//   console.log(state)
//   console.log(data)
//   const posts = state.postsBySubreddit[data]
//   if (!posts) {
//     return true
//   } else if (posts.isFetching) {
//     return false
//   } else {
//     return posts.didInvalidate
//   }
// }

// export function fetchPostsIfNeeded(subreddit) {
//   console.log('fetch posts if needed???')
//   return (dispatch, getState) => {
//     if (shouldFetchPosts(getState(), subreddit)) {
//       return dispatch(fetchPosts(subreddit))
//     }
//   }
// }
