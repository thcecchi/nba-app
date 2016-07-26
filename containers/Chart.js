import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { advancedStatsAction } from '../actions/actions'
import Picker from '../components/Picker'
import Graphs from '../components/Graphs'

class Chart extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(advancedStatsAction(this.props.selectedPlayer.selectedPlayer))
  }

  handleChange(state) {
    this.setState(state)
  }

  render() {
    const { state, lastUpdated, dispatch, getState, playerShotStats } = this.props
    return (
      <div>
        <Picker onChange={e => {
          if(e.keyCode == 13){
            dispatch(searchPlayer(e.target.value, state.playerList.items))
            e.target.value = ''
          }
        }}/>
        {!playerShotStats &&
          <div>
            <Graphs playerShotStats={playerShotStats} />
          </div>
        }

      </div>
    )
  }
}

Chart.propTypes = {
  selectedPlayer: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  playerShotStats: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  console.log(state)
  const { selectedPlayer,  getPlayerList, selectedPlayerStats, playerShotStats} = state

  return {
    selectedPlayer,
    getPlayerList,
    selectedPlayerStats,
    playerShotStats,
    state
  }
}

export default connect(mapStateToProps)(Chart)
