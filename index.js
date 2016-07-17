import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import Root from './containers/Root'
import Chart from './containers/Chart'

// render(
//   <Root />,
//   document.getElementById('root')
// )

render((
<Router history={hashHistory}>
    <Route path="/" component={Root} />
    <Route path="/viz" component={Chart} />
  </Router>
), document.getElementById('root'));
