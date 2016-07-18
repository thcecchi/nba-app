import 'babel-polyfill'

import React from 'react'
import { Provider } from 'react-redux'
import configureStore from './configureStore'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import Root from './containers/Root'
import ChartContainer from './containers/ChartContainer'

const store = configureStore()

// render(
//   <Root />,
//   document.getElementById('root')
// )

render((
<Provider store={store}>
  <Router history={hashHistory}>
      <Route path="/" component={Root} />
      <Route path="/viz" component={ChartContainer} />
    </Router>
</Provider>
), document.getElementById('root'));
