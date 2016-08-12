import React, { PropTypes, Component } from 'react'
import Radium from 'radium'

export default class Stats extends Component {
  getStyles() {

   return {
     nameContainerStyle: {
      marginTop: "50px",
       display: "block",
       textAlign: "center"
     },
     statContainerStyle: {
      marginTop: "20px",
       display: "block",
       textAlign: "center"
     },
     HeaderStyle: {
       color: '#000',
       fontFamily: 'Roboto',
       letterSpacing: 1.75,
       fontWeight: 500,
       fontSize: "28px",
       display: "inline"
     },
     subheadStyle: {
       color: '#344146',
       fontFamily: 'Roboto',
       letterSpacing: 1.5,
       fontWeight: 100,
       fontSize: "22px",
       display: "inline",
       paddingLeft: "5px"
     },
     statsHeaderContainerStyle: {
      height: "40px",
      width: "300px",
      margin: "0 auto",
      background: "000",
      "@media (max-width : 460)": {
        width: "95%"
      }
     },
     statsHeaderStyle: {
       color: '#000',
       fontFamily: 'Roboto',
       letterSpacing: 1.75,
       fontWeight: 100,
       fontSize: "22px",
       display: "block",
       paddingTop: "25px"
     },
     statsBodyStyle: {
       color: '#fff',
       fontFamily: 'Roboto',
       letterSpacing: 1.75,
       fontWeight: 500,
       fontSize: "28px",
       display: "block",
       margin: "0",
       paddingTop: "23px"
     },
     statsBodyContainerStyle: {
      minHeight: "75px",
      paddingBottom: "5px",
      width: "300px",
      margin: "0 auto",
      borderTop: "20px solid rgb(153, 255, 0)",
      background: "#344146",
      boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
      "@media (max-width : 460)": {
        width: "100%"
      }
     },
     bodyContainer: {
      width: "300px",
      margin: "0 auto",
      marginBottom: "20px"
     }
   }
  }

  render() {
    const styles = this.getStyles();

    return (
      <div>
        <div style={styles.nameContainerStyle}>
            <h2 style={styles.HeaderStyle}>{this.props.selectedPlayerStats.selectedPlayerStats.selectedPlayerStats.displayFirstLast}</h2>
            <span style={styles.subheadStyle}>{this.props.selectedPlayerStats.selectedPlayerStats.selectedPlayerStats.teamName}</span>
        </div>

        <div style={styles.statContainerStyle}>
          <div style={styles.bodyContainer}>
            <div style={styles.statsHeaderContainerStyle}>
              <span style={styles.statsHeaderStyle}>Pie%</span>
            </div>
            <div style={styles.statsBodyContainerStyle}>
              <h2 style={styles.statsBodyStyle}>{this.props.selectedPlayerStats.selectedPlayerStats.playerHeadlineStats.pie}</h2>
            </div>
          </div>

          <div style={styles.bodyContainer}>
            <div style={styles.statsHeaderContainerStyle}>
              <span style={styles.statsHeaderStyle}>Points</span>
            </div>
            <div style={styles.statsBodyContainerStyle}>
              <h2 style={styles.statsBodyStyle}>{this.props.selectedPlayerStats.selectedPlayerStats.playerHeadlineStats.pts}</h2>
            </div>
          </div>

          <div style={styles.bodyContainer}>
            <div style={styles.statsHeaderContainerStyle}>
              <span style={styles.statsHeaderStyle}>Assists</span>
            </div>
            <div style={styles.statsBodyContainerStyle}>
              <h2 style={styles.statsBodyStyle}>{this.props.selectedPlayerStats.selectedPlayerStats.playerHeadlineStats.ast}</h2>
            </div>
          </div>

          <div style={styles.bodyContainer}>
            <div style={styles.statsHeaderContainerStyle}>
              <span style={styles.statsHeaderStyle}>Rebounds</span>
            </div>
            <div style={styles.statsBodyContainerStyle}>
              <h2 style={styles.statsBodyStyle}>{this.props.selectedPlayerStats.selectedPlayerStats.playerHeadlineStats.reb}</h2>
            </div>
          </div>

          <div style={styles.bodyContainer}>
            <div style={styles.statsHeaderContainerStyle}>
              <span style={styles.statsHeaderStyle}>School</span>
            </div>
            <div style={styles.statsBodyContainerStyle}>
              <h2 style={styles.statsBodyStyle}>{this.props.selectedPlayerStats.selectedPlayerStats.selectedPlayerStats.school}</h2>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Stats.propTypes = {
  selectedPlayerStats: PropTypes.object.isRequired,
}

module.exports = Radium(Stats)
