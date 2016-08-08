import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux';
var ReactDOM = require('react-dom');
import { changeShotRange } from '../actions/actions'

let createHandlers = function(dispatch) {
  let onClick = function(node, data) {
    dispatch(actions.nodeClicked(data))
  };

  return {
    onClick
  };
}


export default class GraphSelectors extends Component {
  constructor(props) {
    super(props);
    this.handlers = createHandlers(this.props.dispatch);
  }

  getStyles() {
    return {
      optionsContainerStyle: {
        maxWidth: "50%",
        display: "block",
        margin: "0 auto",
        marginBottom: "-25px",
        marginTop: "25px"
      },
      optionStyle: {
        display: "inline-block",
        color: "#000",
        width: "25%",
        cursor: "pointer",
        fontSize: "22px",
        fontFamily: "Roboto",
        textAlign: "center",
        fontWeight: "100",
        ":hover": {
         color: "#344146"
        }
      }
    }
  }

  render() {
    const styles = this.getStyles();

    return (
       <div style={styles.optionsContainerStyle}>
          <h6 style={styles.optionStyle} onClick={() => this.props.dispatch(changeShotRange('lessThan8', this.props.playerShotStats.playerAllShots))}>>8'</h6>
          <h6 style={styles.optionStyle} onClick={() => this.props.dispatch(changeShotRange('eightTo16', this.props.playerShotStats.playerAllShots))}>8'-16'</h6>
          <h6 style={styles.optionStyle} onClick={() => this.props.dispatch(changeShotRange('sixteenTo24', this.props.playerShotStats.playerAllShots))}>16'-24'</h6>
          <h6 style={styles.optionStyle} onClick={() => this.props.dispatch(changeShotRange('twentyfourPlus', this.props.playerShotStats.playerAllShots))}>24'+</h6>
       </div>
    )
  }
}

GraphSelectors.propTypes = {
  playerShotStats: PropTypes.object.isRequired
}

export default connect()(GraphSelectors);
