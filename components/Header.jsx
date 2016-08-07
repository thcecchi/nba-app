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
      cursor: "pointer"
     },
     underline: {
       height: "15px",
       width: "200px",
       margin: "0 auto",
       zIndex: -1,
       borderBottom: "2px solid rgb(153, 255, 0)",
       ":hover": {
        borderBottom: "15px solid rgb(153, 255, 0)",
       }
     }
   };
  }
  render() {
    const { value, options } = this.props
    const styles = this.getStyles();

    return (
      <div style={styles.headerContainer}>
        <div id="underline" key="underline" style={styles.underline}>
          <h1 key="header-text" key="header-text" style={styles.headerText}>HOOPSTATS</h1>
        </div>
      </div>
    )
  }
}

Header.propTypes = {

}

module.exports = Radium(Header)
