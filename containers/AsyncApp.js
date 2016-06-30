import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectedPlayer, searchPlayer, getPlayerList } from '../actions/actions'
import Picker from '../components/Picker'
import Stats from '../components/Posts'

class AsyncApp extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    // this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount() {
    const { dispatch, selectedSubreddit } = this.props
    // dispatch(fetchPostsIfNeeded(selectedSubreddit))
    dispatch(getPlayerList())
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log(nextProps)
  //   if (nextProps.selectedSubreddit !== this.props.selectedSubreddit) {
  //     const { dispatch, selectedSubreddit } = nextProps
  //     dispatch(fetchPostsIfNeeded(selectedSubreddit))
  //   }
  // }

  handleChange(nextSubreddit) {
    this.props.dispatch(selectSubreddit(nextSubreddit))
  }

  // handleRefreshClick(e) {
  //   e.preventDefault()
  //
  //   const { dispatch, selectedSubreddit } = this.props
  //   // dispatch(invalidateSubreddit(selectedSubreddit))
  //   dispatch(fetchPostsIfNeeded(selectedSubreddit))
  // }

  render() {
    const { state, isFetching, lastUpdated, dispatch, getState, selectedPlayerStats } = this.props
    return (
      <div>
        <Picker onChange={e => {
          if(e.keyCode == 13){
            dispatch(searchPlayer(e.target.value, state.playerList.items))
            e.target.value = ''
          }
        }}/>
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
        </p>
        {isFetching &&
          <h2>Loading...</h2>
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
  selectedPlayer: PropTypes.number.isRequired,
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
