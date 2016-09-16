import React, { Component } from 'react'
import { Provider } from 'react-redux'
import AsyncApp from './AsyncApp'

export default class Root extends Component {
  render() {
    document.body.style.backgroundColor = "#fff";
    document.body.style.width = "100%";
    document.body.style.margin = "0";

    return (
        <AsyncApp />
    )
  }
}
