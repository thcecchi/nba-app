import Immutable from 'immutable'
import nba from 'nba'
import { combineReducers } from 'redux'
import {
  FIND_PLAYER, FIND_PLAYER_STATS, SET_PLAYER_LIST, RECEIVE_PLAYER_DATA, SET_SHOT_STATS, SWITCH_SHOT_RANGE, SEARCH_PLAYER_NAME, CLEAR_AUTOCOMPLETE_LIST
} from '../actions/actions'

// 2 //
function selectedPlayer(state = {
  selectedPlayer: 0
}, action) {
  switch (action.type) {
  case FIND_PLAYER:
    var itemList = action.playerList
    var playerId = 0
    itemList.forEach(function (player) {
      if (action.playerName == player.fullName) {
        playerId = player.playerId
      }
    })

    if(playerId == 0) {
      playerId = null
    }

    return Object.assign({}, state, {
      selectedPlayer: playerId
    })
  default:
    return state
  }
}

function searchPlayerName(state = {}, action) {
  switch (action.type) {
  case SEARCH_PLAYER_NAME:
    var itemList = action.playerList
    var capitalFieldVal = action.fieldVal.charAt(0).toUpperCase() + action.fieldVal.slice(1);
    var numChar = action.fieldVal.length
    var playersNames = []
    itemList.forEach(function (player) {
      var trimmedPlayerName = player.fullName.slice(0, numChar);

      if (capitalFieldVal == trimmedPlayerName) {
        playersNames.push(player)
      }
    })
    return Object.assign({}, state, {
      autocompleteList: playersNames
    })
  default:
    return state
  }
}

// 3 //
function selectedPlayerStats(state = {}, action) {
  switch (action.type) {
  case FIND_PLAYER_STATS:
    if(action.playerStats == null) {
      return Object.assign({}, state, {
        selectedPlayerStats: null,
        playerHeadlineStats: null,
        fetched: true
      });
    }
    else {
      return Object.assign({}, state, {
        selectedPlayerStats: action.playerStats.commonPlayerInfo[0],
        playerHeadlineStats: action.playerStats.playerHeadlineStats[0],
        fetched: true
      });
    }
  default:
    return state
  }
}

// 4 //
function playerShotStats(state = {}, action) {
  switch (action.type) {
  case SET_SHOT_STATS:

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
  searchPlayerName,
  selectedPlayerStats,
  playerShotStats,
  switchPlayerShotRange
})

export default rootReducer
