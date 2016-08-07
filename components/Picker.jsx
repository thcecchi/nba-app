import React, { Component, PropTypes } from 'react'
import Radium from 'radium'


export default class Picker extends Component {

  getStyles() {

    return {
      inputStyle: {
        margin: "0 auto",
        background: "#344146",
        marginTop: "100px",
        display: "block",
        width: "50%",
        height: "50px",
        boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
        border: "none",
        fontSize: "30px",
        fontWeight: 400,
        borderRadius: "5px",
        letterSpacing: 1.5,
        fontFamily: 'Roboto',
        color: 'rgb(153, 255, 0)',
        textAlign: "center",
        ":focus": {
          outline: "none"
        }
      }
    }
  }
  render() {
    const { value, onChange, options } = this.props
    const styles = this.getStyles();

    return (
      <div>
         <input style={styles.inputStyle} type="text" onKeyUp={onChange}/>
      </div>
    )
  }
}

Picker.propTypes = {
  onChange: PropTypes.func.isRequired
}

module.exports = Radium(Picker)
