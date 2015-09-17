import React from 'react';
import React, { PropTypes, Component } from 'react';
import { Router, Route, Link } from 'react-router';
import TodoApp from './components/TodoApp';
import TodoMain from './components/TodoMain';

var routes = (
  <Router>
    <Route component={TodoApp}>
      <Route path="/" component={TodoMain} />
      <Route path="/completed" component={TodoMain} />
      <Route path="/active" component={TodoMain} />
    </Route>
  </Router>
);

React.render(routes, document.getElementById('todoapp'));
