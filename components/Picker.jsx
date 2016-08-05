import React, { Component, PropTypes } from 'react'

var pageHeaderTextStyle = {
  textAlign: 'center',
  color: '#ffffff',
  fontFamily: 'Roboto',
  letterSpacing: 1.75,
  fontWeight: 500,
  fontSize: "24px"
};

var pageHeaderContainerSyle = {
  backgroundColor: "#47D2E9",
  position: "absolute",
  top: 0,
  width: "100%",
  boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"
};

var inputStyle = {
  margin: "0 auto",
  marginTop: "100px",
  display: "block",
  width: "50%",
  height: "50px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
  border: "none",
  fontSize: "30px",
  borderRadius: "5px",
  letterSpacing: 1.5,
  fontFamily: 'Roboto'
};


export default class Picker extends Component {
  render() {
    const { value, onChange, options } = this.props

    return (
    <div>
      <div style={pageHeaderContainerSyle}>
        <h1 style={pageHeaderTextStyle}>HOOPSTATS</h1>
      </div>
      <div>
         <input style={inputStyle} type="text" onKeyUp={onChange}/>
      </div>
    </div>
    )
  }
}

Picker.propTypes = {
  onChange: PropTypes.func.isRequired
}
