import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux';
var ReactDOM = require('react-dom');
import Radium from 'radium'
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
    this.state = {active: false};
  }

  click() {
      this.setState({active: true});
  }

  getStyles() {
    return {
      optionsContainerStyle: {
        maxWidth: "50%",
        display: "block",
        margin: "0 auto",
        marginBottom: "-25px",
        marginTop: "25px",
        "@media (max-width : 768px)": {
          width: "95%"
        }
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
          color: "#344146",
          textDecoration: "underline"
        },
        "@media (max-width : 768px)": {
          width: "50%",
          marginTop: "10px",
          marginBottom: "20px"
        },
        "active": {
          color: "#344146",
          textDecoration: "underline"
        },
        "inactive": {
          color: "#344146",
          textDecoration: "none"
        }
      }
    }
  }

  render() {
    const styles = this.getStyles();

    return (
       <div style={styles.optionsContainerStyle}>
          <h6 key="lessThan8" style={styles.optionStyle} onClick={() => this.props.dispatch(changeShotRange('lessThan8', this.props.playerShotStats.playerAllShots))}>>8'</h6>
          <h6 key="eightTo16" style={styles.optionStyle} onClick={() => this.props.dispatch(changeShotRange('eightTo16', this.props.playerShotStats.playerAllShots))}>8'-16'</h6>
          <h6 key="sixteenTo24" style={styles.optionStyle} onClick={() => this.props.dispatch(changeShotRange('sixteenTo24', this.props.playerShotStats.playerAllShots))}>16'-24'</h6>
          <h6 key="twentyfourPlus" style={styles.optionStyle} onClick={() => this.props.dispatch(changeShotRange('twentyfourPlus', this.props.playerShotStats.playerAllShots))}>24'+</h6>
       </div>
    )
  }
}

GraphSelectors.propTypes = {
  playerShotStats: PropTypes.object.isRequired
}

GraphSelectors = Radium(GraphSelectors)
export default connect()(GraphSelectors);
