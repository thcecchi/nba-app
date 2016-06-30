import React, { PropTypes, Component } from 'react'

var HeaderStyle = {
  color: '#2980b9',
  fontFamily: 'Roboto',
  letterSpacing: 1
};

export default class Stats extends Component {
  render() {
    return (
    <div>
      <ul>
          <h2 style={HeaderStyle}>{this.props.selectedPlayerStats.selectedPlayerStats.displayFirstLast}</h2>
          <li>{this.props.selectedPlayerStats.selectedPlayerStats.school}</li>
          <li>{this.props.selectedPlayerStats.selectedPlayerStats.teamCity} {this.props.selectedPlayerStats.selectedPlayerStats.teamName}</li>
      </ul>
      <ul>
          <li>Points per game: {this.props.selectedPlayerStats.playerHeadlineStats.pts}</li>
          <li>Assists per game: {this.props.selectedPlayerStats.playerHeadlineStats.ast}</li>
          <li>Rebounds per game: {this.props.selectedPlayerStats.playerHeadlineStats.reb}</li>
      </ul>
    </div>
    )
  }
}

Stats.propTypes = {
  selectedPlayerStats: PropTypes.object.isRequired
}
