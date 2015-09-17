# Simple Todo with React and Reflux

## Question

> `this.getPath()` is not a function

那是因为 `React-Router` 版本更新了，所以要根据最新的语法去写

详情看[这里](https://github.com/rackt/react-router/blob/master/UPGRADE_GUIDE.md)

### Rendering

```javascript
import React from 'react';
import { Router, Route, Link } from 'react-router';

React.render((
  <Router>
    <Route component={TodoApp}>
      <Route path="/" component={TodoMain} />
      <Route path="/completed" component={TodoMain} />
      <Route path="/active" component={TodoMain} />
    </Route>
  </Router>
), document.getElementById('todoapp'));
```

### State mixin

```javascript
// v0.13.x
var Assignment = React.createClass({
  mixins: [ State ],
  foo () {
    this.getPath()
    this.getParams()
    // etc...
  }
});

// v1.0
// if you are a route component...
<Route component={Assignment} />

var Assignment = React.createClass({
  foo () {
    this.props.location // contains path information
    this.props.params // contains params
    this.props.history.isActive
  }
})
```

### NotFound route

当这个请求为无效请求的时候，从原来的 `<NotFoundRoute />` 改成了 `path` 为 `*` 的 Route

```javascript
// v0.13.x
<NotFoundRoute handler={NoMatch} />

// v1.0
<Route path='*' component={NoMatch} />
```

> Cannot read property 'toUpperCase' of undefined
