import React from 'react';
import { Router, Route, Link } from 'react-router';
// import ReactRouter from 'react-router';
import TodoApp from './components/TodoApp';
import TodoMain from './components/TodoMain';

React.render((
  <Router>
    <Route component={TodoApp}>
      <Route path="/" component={TodoMain} />
      <Route path="/completed" component={TodoMain} />
      <Route path="/active" component={TodoMain} />
  	</Route>
  </Router>
), document.getElementById('todoapp'));
