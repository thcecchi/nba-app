import React, { Component, PropTypes } from 'react'
import Radium from 'radium'

export default class ChartButton extends Component {

  getStyles() {

    return {
      chartButtonContainerStyle: {
        width: "300px",
        height: "50px",
        margin: "0 auto",
        background: "rgb(153, 255, 0)",
        boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
        marginTop: "50px",
        marginBottom: "25px",
        borderRadius: "5px",
        display: "block",
        "@media (max-width : 460px)": {
          width: "80%"
        },
        ":hover": {
          background: "#7CEF00"
        }
      },
      chartButtonStyle: {
        display: "block",
        paddingTop: "15px",
        letterSpacing: "1.25",
        textAlign: "center",
        fontFamily: "Roboto",
        color: "#344146",
        textDecoration: "none"
      }
    }
  }
  render() {
    const { value, onChange, options, buttonProps } = this.props
    const styles = this.getStyles();

    return (
    <div style={styles.chartButtonContainerStyle}>
      <a style={styles.chartButtonStyle} href={this.props.route}>{this.props.buttonText}</a>
    </div>
    )
  }
}

ChartButton.propTypes = {

}

module.exports = Radium(ChartButton)
