import React, { PropTypes, Component } from 'react'
var ReactDOM = require('react-dom');
import Radium from 'radium'
import { VictoryPie } from "victory";

export default class Graphs extends Component {
  getStyles() {
    return {
      chartStyle: {
        maxWidth: "300px"
      },
      ChartContainerStyle: {
        height: "100px",
        width: "50%",
        margin: "0 auto",
        "@media (max-width : 460px)": {
          width: "75%",
          paddingTop: "10px",
          paddingBottom: "10%"
        },
      }
    }
  }

  render() {
    const styles = this.getStyles();

    return (
    <div>
      {this.props.switchPlayerShotRange.playerPercents ?
        <div style={styles.ChartContainerStyle}>
          <VictoryPie
            style={styles.chartStyle}
            colorScale={[
              "#344146",
              "#99FF00"
            ]}
            data={[
            {x: 'Missed ' + this.props.switchPlayerShotRange.playerPercents.remainder + '%', y: this.props.switchPlayerShotRange.playerPercents.remainder},
            {x: 'Made ' + this.props.switchPlayerShotRange.playerPercents.percent + '%', y: this.props.switchPlayerShotRange.playerPercents.percent}
            ]}
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
    </div>
    )
  }
}

Graphs.propTypes = {
  switchPlayerShotRange: PropTypes.object.isRequired
}

module.exports = Radium(Graphs)
