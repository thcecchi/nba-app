import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Router, Route, hashHistory, pushState } from 'react-router'
import Radium, {StyleRoot} from 'radium'
import { selectedPlayer, searchPlayer, advancedStatsAction, searchName } from '../actions/actions'
import Header from '../components/Header'
import Picker from '../components/Picker'
import ChartButton from '../components/ChartButton'
import GraphContainer from './GraphContainer'
import Loading from '../components/Loading'

class Chart extends Component {

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
       },
       buttonContainer: {
         marginTop: "45%"
       }
     }
  }

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props
      dispatch(advancedStatsAction(this.props.selectedPlayer.selectedPlayer))
  }

  componentWillReceiveProps(state) {
    this.setState(state.state)
  }

  handleChange(state) {
    this.setState(state)
  }

  render() {
    const { state, lastUpdated, dispatch, getState, playerShotStats } = this.props
    const styles = this.getStyles();
    return (
      <div>
      <Header />
        <StyleRoot>
          <Picker ref="picker" onChange={e => {
            if(e.keyCode == 13){
              dispatch(searchPlayer(e.target.value, state.playerList.items))
              hashHistory.pushState(null, '/#/');
              e.target.value = ''
            }
            else if(e.keyCode == 65 || e.keyCode == 66 || e.keyCode == 67 || e.keyCode == 68 || e.keyCode == 69 || e.keyCode == 70 || e.keyCode == 71 || e.keyCode == 72 || e.keyCode == 73 || e.keyCode == 74 || e.keyCode == 75 || e.keyCode == 76 || e.keyCode == 77 || e.keyCode == 78 || e.keyCode == 79 || e.keyCode == 80 || e.keyCode == 81 || e.keyCode == 82 || e.keyCode == 83 || e.keyCode == 84 || e.keyCode == 85 || e.keyCode == 86 || e.keyCode == 87 || e.keyCode == 88 || e.keyCode == 89 || e.keyCode == 90) {
              dispatch(searchName(e.target.value, state.playerList.items))
            }
          }}/>
          {state.searchPlayerName.autocompleteList ?
            <ul style={styles.autoCompleteContainer}>
              {state.searchPlayerName.autocompleteList.map((item, i) =>
                <li style={styles.autocompleteItem} key={i} onClick={() => {
                              dispatch(searchPlayer(item, state.playerList.items))
                              hashHistory.pushState(null, '/#/');
                              this.refs.picker.refs.pickerInput.value = item
                              dispatch(searchName('undefined', state.playerList.items))
                            }}>{item}</li>
              )}
            </ul>
            : <div></div>
          }
          {state.playerShotStats.playerAllShots ?
            <div style={styles.statContainer}>
                <GraphContainer playerShotStats={playerShotStats} />
                <div style={styles.buttonContainer}>
                  <ChartButton route={"/#/"} buttonText={"Player Stats"} />
                </div>
            </div> : <Loading text={"Loading..."} />
          }
        </StyleRoot>
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
  const { selectedPlayer,  getPlayerList, selectedPlayerStats, playerShotStats} = state

  return {
    selectedPlayer,
    getPlayerList,
    selectedPlayerStats,
    playerShotStats,
    state
  }
}

Chart = Radium(Chart)
export default connect(mapStateToProps)(Chart);
