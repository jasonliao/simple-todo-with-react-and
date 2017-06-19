# Simple Todo with React and Reflux

这个是 [simple Todo with React and](https://github.com/jasonliao/simple-todo-with-react-and) 的第二部 - Reflux

第一部可以看 [simple Todo with React and Flux](https://github.com/jasonliao/simple-todo-with-react-and/blob/master/flux/README.md) 也可以看 [学习flux的一些浅显理解](http://react-china.org/t/flux/1797)

Reflux 相对 Flux 来说，真的是简单很多，好理解很多。[官方API](https://github.com/reflux/refluxjs) 和很多开发者的分享也都说得很明白了。所以我就简单讲讲我的理解


## How Reflux Works

Reflux 给我们封装了一些方法和属性，可以让我们的数据和操作可以在 Actions、Stores 和 Components 之间单向流动，不再需要 Dispatcher

- 用 `Reflux.createStore()` 方法创建的 Store 可以添加一个 `listenables` 的属性，只要把我们的 Actions 放在里面，当我们执行 Actions 里的行动的时候，就会自动触发 Store 里的 `on"Actions"` 的方法，就这完成了 Actions -> Stores
- 而在 Controller View 中，有 `Store.listen(fn)` 方法，只要 Store 执行了 `this.trigger()`，就会触发这个在 Controller View 里的 `fn` 函数，我们就可以在这个 `fn` 里改变 `state` 的值， Components 也会随之变化，这就完成了 Stores -> View Components
- 而在任意的 Components 内直接触发 Actions 的行动，就可以完成 View Components -> Actions

好了，Reflux 的使用就在这里讲完了，因为对比 Flux 来说，真是简单了太多了不是吗？但我在写这个 demo 的时候，遇到了很多的坑，下面就一个个说下。

## Refactoring React Components to ES6 Classes

所谓的坑，就是从这里开始

从 React 0.13 开始，我们就都可以用 ES6 的语法来写 React 的组件了，具体看[这里](https://facebook.github.io/react/docs/reusable-components.html)，但很多的教程都还是运用 `React.createClass()` 的方式，当然啦，`React.createClass()` 也有他的好处，例如 `Autobinding` `mixins` 等等，但我觉得用 ES6 写会更优雅，但把原来的改写就有很多坑，所以现在就来一个一个填吧！

<s>
### 1. We don't need `componentDidMonut` any more

`componentDidMonut` 这个方法已经不再需要了，我们把渲染组件之前要做的事情放在 `constructor` 里，例如如果我们设置我们的 `state`，我们可以这样

```javascript
class ExampleComponent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      // set your state
    };
  }
}
```
</s>

**我也忘记我当时为什么这样说了，但这种说法是绝对错误的。**这个生命周期函数非常的重要，一般会在这里对该组件里需要的数据进行加载，然后改变我们的 `state` 的值。

而从上面的代码看出来，应该是对初始化 `state` 不一致而导致了误解。在之前 `createClass` 方式，使用 `getInitialState` 函数来初始化。而在使用类声明的组件里，则可直接在 `constructor` 构造函数里 `this.state = { ... }`  的方式来初始化。当然了，也可以直接定义 `state` 为类的变量。就像下面这样：

```javascript
class ExampleComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = { counter: 0 }
  }
}

// or
class ExampleComponent extends React.Component {
  state = { counter: 0 }
}
```

### 2. Autobinding and No Autobinding

改用了 ES6 的语法之后，函数的 `this` 不再是绑定在了自身的实例身上，这里可以有两个方法去解决这个问题

1. use arrow function `=>`

当你在组件里写的方法是用 arrow function，那么 `this` 就会自动绑在实例身上，后面调用方法的时候，就可以直接调用了

```javascript
class ExampleComponent extends React.Component {
  constructor (props) {
    super(props);
  }
  _handleClick = () => {
    console.log(this);
  }
  render () { 
    return <div onClick={this._handleClick}>Hello, React!</div>;
  }
}
```

2. use `bind(this)`

还有一种就是利用 `bind(this)` 

```javascript
// use `bind(this)` when called
class ExampleComponent extends React.Component {
  constructor (props) {
    super(props);
  }
  _handleClick () {
    console.log(this);
  }
  render () { 
    return <div onClick={this._handleClick.bind(this)}>Hello, Reactr!</div>;
  }
}

// use `bind(this)` in constructor
class ExampleComponent extends React.Component {
  constructor (props) {
    super(props);
    this.handleClick = this._handleClick.bind(this);
  }
  _handleClick () {
    console.log(this);
  }
  render () { 
    return <div onClick={this.handleClick}Hello, Reactr!</div>;
  }
}
```

### 3. No Mixins

ES6 不支持 mixins 了，but [Mixins Are Dead. Long Live Composition](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750)
  
Reflux 官方的 TodoApp 有 mixins，那我们怎么来修改他呢

1. TodoApp 里的 `mixins: [Reflux.connect(TodoStores,"list")]`

`Reflux.connect` 方法主要作用是当 TodoStores 执行 `this.trigger()` 方法的时候，TodoApp 就会重新 `setState` 来更新数据，所以我们可以用 TodoStores 的 `listen` 方法来监听，再调用 TodoApp 自身的 `onStateChange` 方法

2. TodoMain 里的 `mixins: [ ReactRouter.State ]`

这个在 react-router 1.0.0 之后就不再有了，[UPGRADE_GUIDE](https://github.com/rackt/react-router/blob/master/UPGRADE_GUIDE.md)也写得很明白了，只要把 `switch` 里的 `getPath()` 改成 `this.props.location.pathname` 就可以了

3. TodoItem 里的 `mixins: [React.addons.LinkedStateMixin]`

这个是用来做 `input` 数据双向绑定的，不用 mixins 怎么做，React 的[官方文档](https://facebook.github.io/react/docs/two-way-binding-helpers.html)也写得很清楚

可以对比看看 [我的代码](https://github.com/L-movingon/simple-todo-with-react-and/tree/master/reflux/javascripts) 和 [官方的代码](https://github.com/reflux/refluxjs-todo/tree/master/js)

## Use React-Router 1.0.0-rc1

```bash
npm install react-router@1.0.0-rc1
```

好像用上面的命令才可以下到 1.0.0 不然直接 `npm install react-router` 下的还是 0.13 的（现在都出到 4.0 了，可以想象这文章是多久之前的了吧，但了解一下 React 的发展也是很好的喔）

Reflux 官方的 TodoApp 用的 react-router 是 0.13 版的，但现在出到 1.0 了，[UPGRADE_GUIDE](https://github.com/rackt/react-router/blob/master/UPGRADE_GUIDE.md) 也写得很明白了，所以还是用 1.0 的吧

而在这个 TodoApp 中，受到影响的就是 [Rendering](https://github.com/rackt/react-router/blob/master/UPGRADE_GUIDE.md#rendering)、[Links](https://github.com/rackt/react-router/blob/master/UPGRADE_GUIDE.md#links)、[RouteHandler](https://github.com/rackt/react-router/blob/master/UPGRADE_GUIDE.md#routehandler) 和 [State mixin](https://github.com/rackt/react-router/blob/master/UPGRADE_GUIDE.md#state-mixin)

## Summary

希望这篇东西可以帮到那些也想用 ES6 写 React，但总是被坑的朋友们，有问题也可以一起多加讨论，共同学习

想看完整代码的可以到 [simple-todo-with-react-and-reflux](https://github.com/L-movingon/simple-todo-with-react-and/tree/master/reflux) 

如有错误，欢迎指出 :)
