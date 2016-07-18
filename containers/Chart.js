import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { advancedStatsAction } from '../actions/actions'
import Picker from '../components/Picker'
import Stats from '../components/Posts'

class Chart extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props
    advancedStatsAction()
  }

  handleChange(state) {
    // this.setState(state)
  }

  render() {
    const { state, isFetching, lastUpdated, dispatch, getState, selectedPlayerStats } = this.props
    return (
      <div>
      <div>
        <h1>Charts!</h1>
      </div>
        <Picker onChange={e => {
          if(e.keyCode == 13){
            dispatch(searchPlayer(e.target.value, state.playerList.items))
            e.target.value = ''
          }
        }}/>
        {isFetching &&
          <h2>Loading...</h2>
        }
        {state.selectedPlayerStats.fetched == true &&
          <div>
            <Graphs graphData={graphData} />
          </div>
        }
      </div>
    )
  }
}

Chart.propTypes = {
  selectedPlayer: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  selectedPlayerStats: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  console.log(state)
  const { selectedPlayer,  getPlayerList, selectedPlayerStats} = state

  return {
    selectedPlayer,
    getPlayerList,
    selectedPlayerStats,
    state
  }
}

export default connect(mapStateToProps)(Chart)
