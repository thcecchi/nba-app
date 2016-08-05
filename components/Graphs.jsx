import React, { PropTypes, Component } from 'react'
var ReactDOM = require('react-dom');
import { VictoryPie } from "victory";

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

export default class Graphs extends Component {
  render() {
    return (
    <div>
      {this.props.switchPlayerShotRange.playerPercents ?
        <div>
          <VictoryPie
            data={[
            {x: 'Missed ' + this.props.switchPlayerShotRange.playerPercents.remainder + '%', y: this.props.switchPlayerShotRange.playerPercents.remainder},
            {x: 'Made ' + this.props.switchPlayerShotRange.playerPercents.percent + '%', y: this.props.switchPlayerShotRange.playerPercents.percent}
            ]}
            width={300}
            height={200}
            animate={{
              duration: 500,
              onEnter: {
                duration: 500,
                before: () =>
                  ({y: 0, label: " "}),
                after: (datum) =>
                  ({y: datum.y, label: ""})
              }
            }}
          />
        </div> : <p>Loading...</p>
      }
      <a href="/#/">Advanced Stats</a>
    </div>
    )
  }
}

Graphs.propTypes = {
  switchPlayerShotRange: PropTypes.object.isRequired
}
