import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import App from './App'
import Menu from './Menu'
import "../css/index.css";
import "bootstrap/dist/css/bootstrap.css"
const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Route path="/:groupId?" component={App} />
    </Router>
  </Provider>
)
export default Root;
