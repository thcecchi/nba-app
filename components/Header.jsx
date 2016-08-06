import React, { Component, PropTypes } from 'react'
import Radium from 'radium'


export default class Header extends Component {
  getStyles() {

   return {
     headerContainer: {
       backgroundColor: "#fff",
       position: "absolute",
       top: 0,
       width: "100%",
       success: {
         backgroundColor: status.success
       },
       error: {
         backgroundColor: status.error
       }
     },
     headerText: {
       textAlign: 'center',
       color: '#000',
       fontFamily: 'Roboto',
       letterSpacing: 1.75,
       fontWeight: 500,
       fontSize: "24px",
       zIndex: "2",
       ":hover": {
         cursor: "pointer"
       }
     },
     underline: {
       height: "10px",
       width: "200px",
       margin: "0 auto",
       backgroundColor: "rgb(153, 255, 0)",
       zIndex: -1,
       ":hover": {
         marginTop: "-30px",
         height: "35px"
       }
     }
   };
  }
  render() {
    const { value, options } = this.props
    const styles = this.getStyles();

    return (
      <div style={styles.headerContainer}>
        <h1 key="one" style={styles.headerText}>HOOPSTATS</h1>
        <div id="one" key="two" style={styles.underline}></div>
      </div>
    )
  }
}

Header.propTypes = {

}

module.exports = Radium(Header)
