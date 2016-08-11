import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Router, Route, hashHistory, pushState } from 'react-router'
import { selectedPlayer, searchPlayer, advancedStatsAction } from '../actions/actions'
import Header from '../components/Header'
import Picker from '../components/Picker'
import ChartButton from '../components/ChartButton'
import GraphContainer from './GraphContainer'
import Loading from '../components/Loading'

class Chart extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props
      dispatch(advancedStatsAction(this.props.selectedPlayer.selectedPlayer))
  }

  componentWillReceiveProps(state) {
    console.log('setting chart state')
    this.setState(state.state)
  }

  handleChange(state) {
    this.setState(state)
  }

  getStyles() {
    return {
      buttonContainer: {
        marginTop: "45%"
      }
    }
  }

  render() {
    const { state, lastUpdated, dispatch, getState, playerShotStats } = this.props
    const styles = this.getStyles();

    console.log(this.props)
    return (
      <div>
      <Header />
        <Picker onChange={e => {
          if(e.keyCode == 13){
            dispatch(searchPlayer(e.target.value, state.playerList.items))
            hashHistory.pushState(null, '/#/');
            e.target.value = ''
          }
        }}/>
        {state.playerShotStats.playerAllShots ?
          <div>
              <GraphContainer playerShotStats={playerShotStats} />
              <div style={styles.buttonContainer}>
                <ChartButton route={"/#/"} buttonText={"Player Stats"} />
              </div>
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
