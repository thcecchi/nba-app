import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectedPlayer, searchPlayer, getPlayerList } from '../actions/actions'
import Picker from '../components/Picker'
import Stats from '../components/Posts'

class AsyncApp extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getPlayerList())
  }

  handleChange(state) {
    this.setState(state)
  }

  render() {
    const { state, isFetching, lastUpdated, dispatch, getState, selectedPlayerStats } = this.props
    return (
      <div>
        {state.playerList.isFetching == false ?
          <Picker onChange={e => {
            if(e.keyCode == 13){
              dispatch(searchPlayer(e.target.value, state.playerList.items))
              e.target.value = ''
            }
          }}/> : <p>Loading...</p>
        }

        {state.selectedPlayerStats.fetched == true &&
          <div>
            <Stats selectedPlayerStats={selectedPlayerStats} />
          </div>
        }
      </div>
    )
  }
}

AsyncApp.propTypes = {
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

export default connect(mapStateToProps)(AsyncApp)
