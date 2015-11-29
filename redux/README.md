# Simple TODO with React and Redux

## Action

Redux 里的 action 本质上是 JavaScript 的普通对象，这个普通对象肯定会有一个 `type` 属性，常常是一个字符串常量，还可能会有其他的属性就是这个 action 要传入的参数

```javascript
// 没有参数的 action
export function completeAll() {
	return {
		type: 'COMPLETE_ALL'
	};
}

// 有参数的 action
export function addTodo(text) {
	return {
		type: 'ADD_TODO',
		text
	};
}
```

当应用规模越来越大时，建议使用单独的模块或文件来存放 action 的类型，然后我们就可以在 action 文件中引入这些类型来使用

```javascript
// constants/ActionTypes.js

export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
// ...

// actions/todos.js

import * as types from '../constants/ActionTypes';
// ...
```

action 创建函数的结果传给 `dispatch()` 方法即可实例化 dispatch，但我们一般用 `bindActionCreators()` 自动把多个 action 创建函数绑定到 `dispatch()` 方法上。

## Reducer

action 只是描述了有事情发生了这一事实，并没有指明应用如何更新 state。而这正是 reducer 要做的事情。

reducer 其实很简单，接收旧的 state 和 action，返回新的 state

```javascript
(previousState, action) => newState
```

保持 reducer 纯净非常重要。永远不要在 reducer 里做这些操作

- 修改传入参数
- 执行有副作用的操作，如 API 请求和路由跳转

要做到不修改传入的参数，其实一般来说

- 对于数组，我们使用 ES6 的 Spread Operator

	```javascript
	let myStuff = [
		{name: 'Jason'}
	];

	return [{ name: 'Liao' }, ...myStuff];
	```

- 对于对象，我们使用 ES6 的 `Object.assign()`

	```javascript
	let myStuff = {
		name: 'Jason',
		age: 19
	};

	return Object.assign({}, myStuff, { name: 'Liao', age: 21 });
	```

最后，Redux 提供了 `combineReducers()` 来把我们所有 reducers 合并起来，虽然现在只有一个

```javascript
import { combineReducers } from 'redux';
import todos from './todos';

const rootReducer = combineReducers({
  todos
});

export default rootReducer;
```

## Store

我们学会了使用 action 来描述发生了什么，和使用 reducers 来根据 action 更新 state 的用法。Store 就是把它们联系到一起的对象，Store 有以下职责

- 维持应用的 state
- 提供 `getState()` 方法获取 state
- 提供 `dispatch(action)` 方法更新 state
- 通过 `subscribe(listener)` 注册监听器

再次强调一下 Redux 应用只有一个单一的 store。当需要拆分处理数据的逻辑时，使用 reducer 组合 而不是创建多个 store

我们可以很简单的根据我们的 reducer 来创建 store

```javascript
import { createStore } from 'redux';
import rootReducer from '../reducers';

export default store = createStore(rootReducer);
```

`createStore()` 的第二个参数可以设置初始状态。 这对开发同构应用时非常有用，可以用于把服务器端生成的 state 转变后在浏览器端传给应用。

所以我们会在我们的 store 里创建一个函数，用来创建一个可能会有初始状态的 store

```javascript
import { createStore } from 'redux';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState);

  return store;
}
```

## *Provider*

`<Provider store>` 使组件层级中的 `connect()` 方法都能够获得 Redux store

## *connect*

连接操作不会改变原来的组件类，反而返回一个新的已与 Redux store 连接的组件类。参数是函数

如果什么参数都不加，就会默认只注入 `dispatch`

```javascript
export default connect()(TodoApp);
```

注入 `dispatch` 和全局 `state` (DON'T DO THAT)

```javascript
export default connect(state => state)(TodoApp);
```

注入 `dispatch` 和 `todos`

```javascript
function mapStateToProps(state) {
  return { todos: state.todos };
}

export default connect(mapStateToProps)(TodoApp);
```

要注意的是，`mapStateToProps()` 里的 `state`，是 `combineReducers()` 里的对象属性，而 `mapStateToProps()` 里返回的 `todos` 就会成为组件里的 `props`，所以组件里的 `this.props` 就会有 `dispatch` 和 `todos` 对象

[read more](http://camsong.github.io/redux-in-chinese/docs/react-redux/api.html)

