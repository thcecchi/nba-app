import React, { PropTypes, Component } from 'react'
import { advancedStatsAction } from '../actions/actions'

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

export default class Stats extends Component {

  getAdvancedStats(state) {
    advancedStatsAction(state)
  }

  render() {
    return (
    <div>
      <div style={nameContainerStyle}>
          <h2 style={HeaderStyle}>{this.props.selectedPlayerStats.selectedPlayerStats.displayFirstLast}</h2>
          <span style={subheadStyle}>{this.props.selectedPlayerStats.selectedPlayerStats.teamName}</span>
      </div>
      <div style={nameContainerStyle}>
          <span style={statsHeaderStyle}>Pie%</span>
          <h2 style={HeaderStyle}>{this.props.selectedPlayerStats.playerHeadlineStats.pie}</h2>

          <span style={statsHeaderStyle}>Points</span>
          <h2 style={HeaderStyle}>{this.props.selectedPlayerStats.playerHeadlineStats.pts}</h2>

          <span style={statsHeaderStyle}>Assists</span>
          <h2 style={HeaderStyle}>{this.props.selectedPlayerStats.playerHeadlineStats.ast}</h2>

          <span style={statsHeaderStyle}>Rebounds</span>
          <h2 style={HeaderStyle}>{this.props.selectedPlayerStats.playerHeadlineStats.reb}</h2>

          <span style={statsHeaderStyle}>School</span>
          <h2 style={HeaderStyle}>{this.props.selectedPlayerStats.selectedPlayerStats.school}</h2>
      </div>
      <div>
        <div onClick={this.getAdvancedStats.bind(this, this.props)}>Advanced Stats</div>
      </div>
    </div>
    )
  }
}

Stats.propTypes = {
  selectedPlayerStats: PropTypes.object.isRequired
}
