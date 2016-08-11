import fetch from 'isomorphic-fetch'
import nba from 'nba'

export const RECEIVE_PLAYER_DATA = 'RECEIVE_PLAYER_DATA'
export const FIND_PLAYER = 'FIND_PLAYER'
export const FIND_PLAYER_STATS = 'FIND_PLAYER_STATS'
export const SET_PLAYER_LIST = 'SET_PLAYER_LIST'
export const SET_SHOT_STATS = 'SET_SHOT_STATS'
export const SWITCH_SHOT_RANGE = 'SWITCH_SHOT_RANGE'

// 4 //
function findPlayer(playerName, playerList) {
  console.log('find player action')
  console.log(playerList)
  return {
    type: FIND_PLAYER,
    playerName,
    playerList
  }
}

// 6 //
function findPlayerStats(playerData) {
  console.log('find player stats action')
  return {
    type: FIND_PLAYER_STATS,
    playerStats: playerData
  }
}

// 2 //
export function setPlayerList(playerList) {
  console.log('set player list')
  console.log(playerList)
  return {
    type: SET_PLAYER_LIST,
    playerList
  }
}

// 7 //
function setShotStats(shotStats) {
  console.log('set shot stats')
  return {
    type: SET_SHOT_STATS,
    shotStats
  }
}

function switchShotRange(shotRange, shotObj) {
  console.log('switching shot range')
  return {
    type: SWITCH_SHOT_RANGE,
    shotRange,
    shotObj
  }
}

// 3 //
export function searchPlayer(playerName, playerList) {
  console.log('search player action')
  return (dispatch, getState) => {
    console.log(getState())

    var nameArray = playerName.split(" ");
    var newNameArray = []

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    nameArray.forEach(function (name) {
      var capitalizedName = capitalizeFirstLetter(name)
      newNameArray.push(capitalizedName)
    });

    var capitalizedFullName = newNameArray.join(' ');

    dispatch(findPlayer(capitalizedFullName, playerList))
    // dispatch(receivePlayerData(getState()))
  }
}

// 5 //
export function receivePlayerData(player) {
  console.log('receivePlayerData actions')
  console.log(player)
    return dispatch => {
      if (player == null) {
        dispatch(findPlayerStats(player))
      }

      else {
        nba.api.playerInfo({playerId: player}, (err, response) => {
          console.log(response)
            dispatch(findPlayerStats(response))
          })
      }
    }
}

// 1 //
export function getPlayerList() {
  console.log('get player list')
  return dispatch => {
    nba.api.playersInfo({}, (err, response) => {
      var itemList = response.resultSets[0].rowSet;
      console.log(itemList)
      dispatch(setPlayerList(itemList))
    })
  }
}

export function advancedStatsAction(currentPlayerId) {
  console.log('advanced stats')
  console.log(currentPlayerId)
  return dispatch => {
    console.log('dispatched')
    nba.api.shots({playerId: currentPlayerId,
                  teamId: '00'}, (err, response) => {
                  console.log(response)
                  dispatch(setShotStats(response))
      })
  }
}

// change shot range
export function changeShotRange(shotRange, shotObj) {
  console.log('change shot range to ' + shotRange)
  console.log(shotObj)
  return dispatch => {
    dispatch(switchShotRange(shotRange, shotObj))
  }
}
