import fetch from 'isomorphic-fetch'
import nba from 'nba'

export const RECEIVE_PLAYER_DATA = 'RECEIVE_PLAYER_DATA'
export const FIND_PLAYER = 'FIND_PLAYER'
export const FIND_PLAYER_STATS = 'FIND_PLAYER_STATS'
export const SET_PLAYER_LIST = 'SET_PLAYER_LIST'

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
    dispatch(receivePlayerData(getState()))
  }
}

// 5 //
function receivePlayerData(state) {
  console.log('receivePlayerData actions')
  console.log(state.selectedPlayer.selectedPlayer)
    return dispatch => {
      nba.api.playerInfo({playerId: state.selectedPlayer.selectedPlayer}, (err, response) => {
        console.log(response)
          dispatch(findPlayerStats(response))
        })
    }
}

// 1 //
export function getPlayerList() {
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

// //////////////////////////////////////////////////
export function advancedStatsAction(state) {
  // return dispatch => {
    nba.api.shots({playerId: state.selectedPlayerStats.selectedPlayerStats.personId,
                  teamId: '00'}, (err, response) => {
      console.log(response)
        // dispatch(findPlayerStats(response))
      })
  // }
}
