import Immutable from 'immutable'
import nba from 'nba'
import { combineReducers } from 'redux'
import {
  FIND_PLAYER, FIND_PLAYER_STATS, SET_PLAYER_LIST, RECEIVE_PLAYER_DATA, SET_SHOT_STATS, SWITCH_SHOT_RANGE
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

    // BUILD CHART DATA HERE
    const shotObj = {
      lessThan8: {
        total: [],
        made: [],
        percent: ''
      },
      eightTo16: {
        total: [],
        made: [],
        percent: ''
      },
      sixteenTo24: {
          total: [],
          made: [],
          percent: ''
      },
      twentyfourPlus: {
          total: [],
          made: [],
          percent: ''
      }
    }


    action.shotStats.shot_Chart_Detail.forEach(function(shot) {
      if (shot.shotZoneRange == "Less Than 8 ft.") {
        shotObj.lessThan8.total.push(shot)
      }

      else if (shot.shotZoneRange == "8-16 ft.") {
        shotObj.eightTo16.total.push(shot)
      }

      else if (shot.shotZoneRange == "16-24 ft.") {
        shotObj.sixteenTo24.total.push(shot)
      }

      else if (shot.shotZoneRange == "24+ ft.") {
        shotObj.twentyfourPlus.total.push(shot)
      }
    });

    shotObj.lessThan8.total.forEach(function(shot) {
      if (shot.eventType == "Made Shot") {
        shotObj.lessThan8.made.push(shot)
      }
    });

    shotObj.eightTo16.total.forEach(function(shot) {
      if (shot.eventType == "Made Shot") {
        shotObj.eightTo16.made.push(shot)
      }
    });

    shotObj.sixteenTo24.total.forEach(function(shot) {
      if (shot.eventType == "Made Shot") {
        shotObj.sixteenTo24.made.push(shot)
      }
    });

    shotObj.twentyfourPlus.total.forEach(function(shot) {
      if (shot.eventType == "Made Shot") {
        shotObj.twentyfourPlus.made.push(shot)
      }
    });


    shotObj.lessThan8.percent = parseInt(((shotObj.lessThan8.made.length / shotObj.lessThan8.total.length) * 100).toFixed(2));
    shotObj.lessThan8.remainder = 100 - shotObj.lessThan8.percent;

    shotObj.eightTo16.percent = parseInt(((shotObj.eightTo16.made.length / shotObj.eightTo16.total.length) * 100).toFixed(2));
    shotObj.eightTo16.remainder = 100 - shotObj.eightTo16.percent;

    shotObj.sixteenTo24.percent = parseInt(((shotObj.sixteenTo24.made.length / shotObj.sixteenTo24.total.length) * 100).toFixed(2));
    shotObj.sixteenTo24.remainder = 100 - shotObj.sixteenTo24.percent;

    shotObj.twentyfourPlus.percent = parseInt(((shotObj.twentyfourPlus.made.length / shotObj.twentyfourPlus.total.length) * 100).toFixed(2));
    shotObj.twentyfourPlus.remainder = 100 - shotObj.twentyfourPlus.percent;

    const mainShotObj = {
                      lessThan8: {
                        percent: shotObj.lessThan8.percent,
                        remainder: shotObj.lessThan8.remainder
                      }
                    }

    return Object.assign({}, state, {
        playerShotPercents: mainShotObj,
        playerAllShots: shotObj,
        playerName: action.shotStats.shot_Chart_Detail[0].playerName,
        playerId: action.shotStats.shot_Chart_Detail[0].playerId
      });
  default:
    return state
  }
}

function switchPlayerShotRange(state = { }, action) {
  switch (action.type) {
  case SWITCH_SHOT_RANGE:
    console.log('switching around the shot range graph')
    
    return Object.assign({}, state, {
      playerPercents: 'true'
    })
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
  playerShotStats,
  switchPlayerShotRange
})

export default rootReducer
