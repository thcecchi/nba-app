import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { changeShotRange } from '../actions/actions'
import Graphs from '../components/Graphs'
import GraphSelectors from '../components/GraphSelectors'
import Loading from '../components/Loading'

class Chart extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props
      dispatch(changeShotRange('lessThan8', this.props.playerShotStats.playerAllShots))
  }

  componentWillReceiveProps(state) {
    this.setState(state.state)
  }

  handleChange(state) {
    this.setState(state)
  }

  render() {
    const { state, lastUpdated, dispatch, getState, playerShotStats, switchPlayerShotRange } = this.props
    return (
      <div>
        {state.playerShotStats.playerAllShots ?
          <div>
            <GraphSelectors playerShotStats={playerShotStats} />
            <Graphs switchPlayerShotRange={switchPlayerShotRange} />
          </div> : <Loading text={"Loading..."} />
        }

      </div>
    )
  }
}

Chart.propTypes = {
  selectedPlayer: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  playerShotStats: PropTypes.object.isRequired,
  switchPlayerShotRange: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  const { selectedPlayer,  getPlayerList, selectedPlayerStats, playerShotStats, switchPlayerShotRange} = state

  return {
    selectedPlayer,
    getPlayerList,
    selectedPlayerStats,
    playerShotStats,
    switchPlayerShotRange,
    state
  }
}

export default connect(mapStateToProps)(Chart)
