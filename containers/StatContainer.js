import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectedPlayer, searchPlayer, getPlayerList, receivePlayerData } from '../actions/actions'
import Header from '../components/Header'
import Picker from '../components/Picker'
import Stats from '../components/Posts'
import ChartButton from '../components/ChartButton'
import Loading from '../components/Loading'

class StatContainer extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props
    if (this.props.selectedPlayer.selectedPlayer == 0) {
      dispatch(receivePlayerData(null))
    }

    else {
      dispatch(receivePlayerData(this.props.selectedPlayer.selectedPlayer))
    }

    console.log('props: ')
    console.log(this.props)
  }

  handleChange(state) {
    this.setState(state)
  }

  logProps() {
    console.log(this.props)
  }

  render() {
    this.logProps()

    const { state, isFetching, lastUpdated, dispatch, getState, selectedPlayerStats } = this.props
    return (
      <div>
        <Header />

        {state.selectedPlayerStats.selectedPlayerStats ?
          <div>
            <Stats selectedPlayerStats={this.props} />
            <ChartButton route={"/#/viz"} buttonText={"Shooting Stats"}/>
          </div> : <Loading text={"Player not found"} />
        }
      </div>
    )
  }
}

StatContainer.propTypes = {
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

export default connect(mapStateToProps)(StatContainer)
