import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux';
var ReactDOM = require('react-dom');
import { VictoryPie } from "victory";
import { changeShotRange } from '../actions/actions'

// Style //
var nameContainerStyle = {
  display: "block",
  textAlign: "center"
};

var HeaderStyle = {
  color: '#ffffff',
  fontFamily: 'Roboto',
  letterSpacing: 2,
  fontWeight: 500,
  fontSize: "28px",
  display: "inline"
};

var subheadStyle = {
  color: '#92F22A',
  fontFamily: 'Open Sans',
  letterSpacing: 1.75,
  fontWeight: 100,
  fontSize: "20px",
  display: "inline",
  paddingLeft: "5px"
};

var statsHeaderStyle = {
  fontFamily: "Open Sans",
  letterSpacing: 1.75,
  color: "#92F22A",
  fontSize: "20px",
  fontWeight: 100,
  display: "block",
  paddingTop: "20px",
  paddingBottom: "10px"
};

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
  render() {
    return (
       <div>
          <h6 onClick={() => this.props.dispatch(changeShotRange('lessThan8', this.props.playerShotStats.playerAllShots))}>>8'</h6>
          <h6 onClick={() => this.props.dispatch(changeShotRange('eightTo16', this.props.playerShotStats.playerAllShots))}>8'-16'</h6>
          <h6 onClick={() => this.props.dispatch(changeShotRange('sixteenTo24', this.props.playerShotStats.playerAllShots))}>16'-24'</h6>
          <h6 onClick={() => this.props.dispatch(changeShotRange('twentyfourPlus', this.props.playerShotStats.playerAllShots))}>24'+</h6>
       </div>
    )
  }
}

GraphSelectors.propTypes = {
  playerShotStats: PropTypes.object.isRequired
}

export default connect()(GraphSelectors);
