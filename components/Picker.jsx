import React, { Component, PropTypes } from 'react'

var inputStyle = {
  margin: "0 auto",
  marginTop: "100px",
  display: "block",
  width: "50%",
  height: "50px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
  border: "none",
  fontSize: "30px",
  fontWeight: 100,
  borderRadius: "5px",
  letterSpacing: 1.5,
  fontFamily: 'Roboto'
};

export default class Picker extends Component {
  render() {
    const { value, onChange, options } = this.props

    return (
      <div>
         <input style={inputStyle} type="text" onKeyUp={onChange}/>
      </div>
    )
  }
}

Picker.propTypes = {
  onChange: PropTypes.func.isRequired
}
