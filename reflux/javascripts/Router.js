import React from 'react';
import { Router, Route, Link } from 'react-router';
// import ReactRouter from 'react-router';
import TodoApp from './components/TodoApp';
import TodoMain from './components/TodoMain';

// var routes = (
//   <ReactRouter.Route handler={TodoApp}>
//       <ReactRouter.Route name="All" path="/" handler={TodoMain} />
//       <ReactRouter.Route name="Completed" path="/completed" handler={TodoMain} />
//       <ReactRouter.Route name="Active" path="/active" handler={TodoMain} />
//   </ReactRouter.Route>
// );

// ReactRouter.run(routes, function(Handler) {
//   React.render(<Handler/>, document.getElementById('todoapp'));
// });

React.render((
  <Router>
    <Route component={TodoApp}>
      <Route path="/" component={TodoMain} />
      <Route path="/completed" component={TodoMain} />
      <Route path="/active" component={TodoMain} />
  	</Route>
  </Router>
), document.getElementById('todoapp'));