import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from '../configureStore'
import AsyncApp from './AsyncApp'

const store = configureStore()

export default class Root extends Component {
  render() {
    document.body.style.backgroundColor = "#5a5a5a";
    document.body.style.width = "100%";

    return (
      <Provider store={store}>
        <AsyncApp />
      </Provider>
    )
  }
}
