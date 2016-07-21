import Immutable from 'immutable'
import nba from 'nba'
import { combineReducers } from 'redux'
import {
  FIND_PLAYER, FIND_PLAYER_STATS, SET_PLAYER_LIST, RECEIVE_PLAYER_DATA, SET_SHOT_STATS
} from '../actions/actions'

// 2 //
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

// 3 //
function selectedPlayerStats(state = {}, action) {
  switch (action.type) {
  case FIND_PLAYER_STATS:
    console.log('find player stats reducer')
    console.log(action.playerStats)
    return Object.assign({}, state, {
        selectedPlayerStats: action.playerStats.commonPlayerInfo[0],
        playerHeadlineStats: action.playerStats.playerHeadlineStats[0],
        fetched: true
      });
  default:
    return state
  }
}

// 4 //
function playerShotStats(state = {}, action) {
  switch (action.type) {
  case SET_SHOT_STATS:
    console.log('set player shots stats reducer')
    console.log(action.shotStats)
    return Object.assign({}, state, {
        playerShots: action.shotStats,
        fetched: true
      });
  default:
    return state
  }
}

// 1 //
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

const rootReducer = combineReducers({
  selectedPlayer,
  playerList,
  selectedPlayerStats,
  playerShotStats
})

export default rootReducer
