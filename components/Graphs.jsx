import React, { PropTypes, Component } from 'react'
var ReactDOM = require('react-dom');
import { VictoryPie } from "victory";

// Style //


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
