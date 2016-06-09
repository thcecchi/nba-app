import Immutable from 'immutable'
import nba from 'nba'
import { combineReducers } from 'redux'
import {
  FIND_PLAYER, SET_PLAYER_LIST, RECEIVE_PLAYER_DATA
} from '../actions/actions'

function selectedPlayer(state = '', action) {
  switch (action.type) {
  case FIND_PLAYER:
    console.log('find player reducer')
    console.log(action)
    var itemList = action.playerList
    console.log(itemList)
    itemList.forEach(function (player) {
      if (action.playerName == player[2]) {
        console.log(player[0])
        return player[0]
      }
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
  playerData
})

export default rootReducer
