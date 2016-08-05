import React, { Component, PropTypes } from 'react'

var pageHeaderTextStyle = {
  textAlign: 'center',
  color: '#000',
  fontFamily: 'Roboto',
  letterSpacing: 1.75,
  fontWeight: 500,
  fontSize: "24px",
  zIndex: "2"
};

var pageHeaderContainerSyle = {
  backgroundColor: "#fff",
  position: "absolute",
  top: 0,
  width: "100%"
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
  fontWeight: 100,
  borderRadius: "5px",
  letterSpacing: 1.5,
  fontFamily: 'Roboto'
};

var svgStyle = {
  height: "10px",
  width: "200px",
  margin: "0 auto",
  backgroundColor: "rgb(153, 255, 0)",
  zIndex: -1
}


export default class Picker extends Component {
  render() {
    const { value, onChange, options } = this.props

    return (
    <div>
      <div style={pageHeaderContainerSyle}>
        <h1 style={pageHeaderTextStyle}>HOOPSTATS</h1>
        <div style={svgStyle}></div>
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
