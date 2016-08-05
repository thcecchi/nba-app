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

    return Object.assign({}, state, {
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
    console.log(action.shotRange)

    const shotObj = action.shotObj

    const shotPercentObj = {
                        percent: 0,
                        remainder: 0
                      }

    if(action.shotRange == 'lessThan8') {
      shotPercentObj.percent = parseInt(((shotObj.lessThan8.made.length / shotObj.lessThan8.total.length) * 100).toFixed(2));
      shotPercentObj.remainder = 100 - shotPercentObj.percent;

    } else if (action.shotRange == 'eightTo16') {
      shotPercentObj.percent = parseInt(((shotObj.eightTo16.made.length / shotObj.eightTo16.total.length) * 100).toFixed(2));
      shotPercentObj.remainder = 100 - shotPercentObj.percent;

    } else if (action.shotRange == 'sixteenTo24') {
      shotPercentObj.percent = parseInt(((shotObj.sixteenTo24.made.length / shotObj.sixteenTo24.total.length) * 100).toFixed(2));
      shotPercentObj.remainder = 100 - shotPercentObj.percent;

    } else if (action.shotRange == 'twentyfourPlus') {
      shotPercentObj.percent = parseInt(((shotObj.twentyfourPlus.made.length / shotObj.twentyfourPlus.total.length) * 100).toFixed(2));
      shotPercentObj.remainder = 100 - shotPercentObj.percent;
    }

    return Object.assign({}, state, {
      playerPercents: shotPercentObj
    })
  default:
    return state
  }
}

// 1 //
function playerList(state = {
  isFetching: true,
  items: []
}, action) {
  switch (action.type) {
  case SET_PLAYER_LIST:
    console.log('setting up the player list')
    return Object.assign({}, state, {
      isFetching: false,
      items: action.playerList
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
