import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux';
var ReactDOM = require('react-dom');
import { changeShotRange } from '../actions/actions'

// Style //


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
