import React, { PropTypes, Component } from 'react'
var ReactDOM = require('react-dom');
var PieChart = require('react-d3-basic').PieChart;
import { advancedStatsAction } from '../actions/actions'

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

 var width = 700,
   height = 400,
   value = function(d) {
     if (d.eventType == "Made Shot")
     return +d.eventType;
   },
   name = function(d) {
     return d.actionType;
   },
   chartSeries = [
     {
       "field": "In The Paint (Non-RA)",
       "name": "In da paint"
     },
     {
       "field": "Restricted Area",
       "name": "Restricted area"
     },
     {
       "field": "Mid-Range",
       "name": "Mid-range"
     }
   ]

export default class Graphs extends Component {

  render() {
    return (
    <div>
      <PieChart
        data= {this.props.playerShotStats.playerShotStats.playerShots.shot_Chart_Detail}
        width= {width}
        height= {height}
        chartSeries= {chartSeries}
        value = {value}
        name = {name}
      />
      <a href="/#/">Advanced Stats</a>
    </div>

    )
  }
}

Graphs.propTypes = {
  playerShotStats: PropTypes.object.isRequired
}
