import fetch from 'isomorphic-fetch'
import nba from 'nba'

export const RECEIVE_PLAYER_DATA = 'RECEIVE_PLAYER_DATA'
export const FIND_PLAYER = 'FIND_PLAYER'
export const SEARCH_PLAYER_NAME = 'SEARCH_PLAYER_NAME'
export const FIND_PLAYER_STATS = 'FIND_PLAYER_STATS'
export const SET_PLAYER_LIST = 'SET_PLAYER_LIST'
export const SET_SHOT_STATS = 'SET_SHOT_STATS'
export const SWITCH_SHOT_RANGE = 'SWITCH_SHOT_RANGE'

function findPlayer(playerName, playerList) {
  return {
    type: FIND_PLAYER,
    playerName,
    playerList
  }
}

function searchNameInList(fieldVal, playerList) {
  return {
    type: SEARCH_PLAYER_NAME,
    fieldVal,
    playerList
  }
}

function findPlayerStats(playerData) {
  return {
    type: FIND_PLAYER_STATS,
    playerStats: playerData
  }
}

export function setPlayerList(playerList) {
  return {
    type: SET_PLAYER_LIST,
    playerList
  }
}

function setShotStats(shotStats) {
  return {
    type: SET_SHOT_STATS,
    shotStats
  }
}

function switchShotRange(shotRange, shotObj) {
  return {
    type: SWITCH_SHOT_RANGE,
    shotRange,
    shotObj
  }
}

export function searchPlayer(playerName, playerList) {
  return (dispatch, getState) => {
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
  }
}

export function receivePlayerData(player) {
    return dispatch => {
      if (player == null) {
        dispatch(findPlayerStats(player))
      }

      else {
        nba.api.playerInfo({playerId: player}, (err, response) => {
            dispatch(findPlayerStats(response))
          })
      }
    }
}

export function getPlayerList() {
  return dispatch => {
    nba.api.playersInfo({}, (err, response) => {
      var itemList = response.resultSets[0].rowSet;
      dispatch(setPlayerList(itemList))
    })
  }
}

export function advancedStatsAction(currentPlayerId) {
  return dispatch => {
    nba.api.shots({playerId: currentPlayerId,
                  teamId: '00'}, (err, response) => {
                  dispatch(setShotStats(response))
      })
  }
}

export function changeShotRange(shotRange, shotObj) {
  return dispatch => {
    dispatch(switchShotRange(shotRange, shotObj))
  }
}

export function searchName(fieldVal, list) {
  return dispatch => {
    dispatch(searchNameInList(fieldVal, list))
  }
}
