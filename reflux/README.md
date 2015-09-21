# Simple Todo with React and Reflux

## Questions

> `this.getPath()` is not a function

那是因为 `React-Router` 版本更新了，所以要根据最新的语法去写

详情看 [UPGRADE_GUIDE](https://github.com/rackt/react-router/blob/master/UPGRADE_GUIDE.md)

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

所以我们在 TodoMain 里的 `switch` 就要改一下

```javascript
switch (this.props.location.pathname) {
  // case go here
}
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

### React-Router 1.0.0-rc1

```bash
npm install react-router@1.0.0-rc1
```

> mixins does't work

[Mixins Are Dead. Long Live Composition](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750)

but how to make todo app work

