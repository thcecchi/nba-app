import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { changeShotRange } from '../actions/actions'
import Graphs from '../components/Graphs'
import GraphSelectors from '../components/GraphSelectors'

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
    console.log('setting state')
    console.log(state)
    this.setState(state.state)
  }

  handleChange(state) {
    this.setState(state)
  }

  render() {
    const { state, lastUpdated, dispatch, getState, playerShotStats } = this.props
    console.log(playerShotStats)
    console.log(this.props)
    return (
      <div>
        {state.playerShotStats.playerAllShots ?
          <div>
            <GraphSelectors playerShotStats={playerShotStats} />
            <Graphs playerShotStats={playerShotStats} />
          </div> : <p>Loading...</p>
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
