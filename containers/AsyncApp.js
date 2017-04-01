import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Radium, {StyleRoot} from 'radium'
import { selectedPlayer, searchPlayer, getPlayerList, searchName } from '../actions/actions'
import StatContainer from './StatContainer'
import Header from '../components/Header'
import Picker from '../components/Picker'
import SearchButton from '../components/SearchButton'
import Loading from '../components/Loading'

let createHandlers = function(dispatch) {
  let onClick = function(node, data) {
    dispatch(actions.nodeClicked(data))
  };

  return {
    onClick
  };
}

class AsyncApp extends Component {

  getStyles() {
     return {
       autoCompleteContainer: {
         borderRadius: "5px",
         position: "absolute",
         left: "25%",
         boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
         listStyle: "none",
         margin: "0 auto",
         marginTop: "15px",
         background: "#344146",
         display: "block",
         width: "47%",
         border: "none",
         zIndex: "2",
         "@media (max-width : 768px)": {
           width: "80%",
           paddingLeft: "0",
           left: "10%"
         }
       },
       autocompleteItem: {
         paddingTop: "1%",
         paddingBottom: "1%",
         fontSize: "16px",
         fontWeight: 100,
         letterSpacing: 1.5,
         fontFamily: 'Roboto',
         color: 'rgb(153, 255, 0)',
         textAlign: "center",
         cursor: "pointer",
         ":hover": {
           color: "#fff"
         }
       },
       statContainer: {
         zIndex: "-1"
       }
     }
  }

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

  closeKeyboard() {
    this.refs.picker.refs.pickerInput.blur();
  }

  render() {
    const { state, isFetching, lastUpdated, dispatch, getState, selectedPlayerStats } = this.props
    const styles = this.getStyles();
    return (
      <div>
        <Header />
          <StyleRoot>
            {state.playerList.isFetching == false ?
              <div>
                  <Picker ref="picker" onChange={e => {
                    if(e.keyCode == 13){
                      dispatch(searchPlayer(e.target.value, state.playerList.items))
                      e.target.value = ''
                      this.closeKeyboard();
                    }
                    else if(e.keyCode == 65 || e.keyCode == 66 || e.keyCode == 67 || e.keyCode == 68 || e.keyCode == 69 || e.keyCode == 70 || e.keyCode == 71 || e.keyCode == 72 || e.keyCode == 73 || e.keyCode == 74 || e.keyCode == 75 || e.keyCode == 76 || e.keyCode == 77 || e.keyCode == 78 || e.keyCode == 79 || e.keyCode == 80 || e.keyCode == 81 || e.keyCode == 82 || e.keyCode == 83 || e.keyCode == 84 || e.keyCode == 85 || e.keyCode == 86 || e.keyCode == 87 || e.keyCode == 88 || e.keyCode == 89 || e.keyCode == 90 || e.keyCode == 229) {
                      dispatch(searchName(e.target.value, state.playerList.items))
                    }
                  }}/>
                  {state.searchPlayerName.autocompleteList ?
                    <ul style={styles.autoCompleteContainer}>
                      {state.searchPlayerName.autocompleteList.map((item, i) =>
                        <li style={styles.autocompleteItem} key={i} onClick={() => {
                                      dispatch(searchPlayer(item.fullName, state.playerList.items))
                                      this.closeKeyboard();
                                      this.refs.picker.refs.pickerInput.value = item.fullName
                                      dispatch(searchName('undefined', state.playerList.items))
                                    }}>{item.fullName}</li>
                      )}
                    </ul>
                    : <div></div>
                  }
              </div>
              : <Loading text={"Loading..."}/>
            }
          </StyleRoot>

        {state.selectedPlayer.selectedPlayer == 0 ?
          <div></div> :
          <div style={styles.statContainer} key={state.selectedPlayer.selectedPlayer}>
            <StatContainer selectedPlayerStats={selectedPlayerStats}/>
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
  const { selectedPlayer,  getPlayerList, selectedPlayerStats} = state

  return {
    selectedPlayer,
    getPlayerList,
    selectedPlayerStats,
    state
  }
}

AsyncApp = Radium(AsyncApp)
export default connect(mapStateToProps)(AsyncApp);
