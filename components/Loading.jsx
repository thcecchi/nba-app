import React, { Component, PropTypes } from 'react'
import Radium from 'radium'

export default class Loading extends Component {
  getStyles() {

   return {
     loadingContainer: {
       display: "block",
       position: "relative",
       width: "100%",
       marginTop: "20%",
     },
     loading: {
       display: "block",
       margin: "0 auto",
       fontFamily: "Roboto",
       fontWeight: "500",
       textAlign: "center"
     }
   };
  }
  render() {
    const { value, options } = this.props
    const styles = this.getStyles();

    return (
      <div style={styles.loadingContainer}>
        <h1 style={styles.loading}>{this.props.text}</h1>
      </div>
    )
  }
}

Loading.propTypes = {

}

module.exports = Radium(Loading)
