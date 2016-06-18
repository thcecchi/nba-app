import Immutable from 'immutable'
import nba from 'nba'
import { combineReducers } from 'redux'
import {
  FIND_PLAYER, FIND_PLAYER_STATS, SET_PLAYER_LIST, RECEIVE_PLAYER_DATA
} from '../actions/actions'

function selectedPlayer(state = {
  selectedPlayer: 0
}, action) {
  switch (action.type) {
  case FIND_PLAYER:
    console.log('find player reducer')
    console.log(action)
    var itemList = action.playerList
    console.log(itemList)
    var playerId = 0
    itemList.forEach(function (player) {
      if (action.playerName == player[2]) {
        console.log(player[0])
        // receivePlayerData(player[0])
        playerId = player[0]
      }
    })
    return Object.assign({}, state, {
      selectedPlayer: playerId
    })
  default:
    return state
  }
}

function selectedPlayerStats(state = [], action) {
  switch (action.type) {
  case FIND_PLAYER_STATS:
    console.log('find player stats reducer')
    console.log(action.playerId)
    var nbaAPI = nba
    nbaAPI.api.playerInfo({playerId: action.playerId}, (err, response) => {
      console.log(response)
      return state.playerData = response;
    })
  default:
    return state
  }
}

function playerList(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
  case SET_PLAYER_LIST:
    console.log('setting up the player list')
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: false,
      items: action.playerList,
      lastUpdated: action.receivedAt
    })
  default:
    return state
  }
}

function playerData(state = {
  isFetching: false,
  didInvalidate: false,
  data: []
}, action) {
  switch (action.type) {
    case RECEIVE_PLAYER_DATA:
      console.log('receiving posts reducer')
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        data: action.posts,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

// function postsBySubreddit(state = { }, action) {
//   switch (action.type) {
//     case INVALIDATE_SUBREDDIT:
//     case RECEIVE_POSTS:
//     case REQUEST_POSTS:
//       return Object.assign({}, state, {
//         [action.subreddit]: posts(state[action.subreddit], action)
//       })
//     default:
//       return state
//   }
// }

const rootReducer = combineReducers({
  selectedPlayer,
  playerList,
  selectedPlayerStats
})

export default rootReducer
