import React, { PropTypes, Component } from 'react';
import ReactRouter from 'react-router';
import Reflux from 'reflux';

import TodoStores from '../stores/TodoStores';

import TodoHeader from './TodoHeader';
import TodoMain from './TodoMain';
import TodoFooter from './TodoFooter';

class TodoApp extends Component {
	constructor (props) {
		super(props);
		this.state = {
			list: TodoStores.list
		};
    this.unsubscribe = TodoStores.listen(this.onStatusChange.bind(this));
	}

  componentWillUnmount () {
    this.unsubscribe();
  }

  onStatusChange (list) {
  	this.setState({
  		list: list
  	})
  }

	render () {
		return (
			<div>
				<TodoHeader />
				{React.cloneElement(this.props.children, {list: this.state.list })}
				<TodoFooter list={this.state.list} />
			</div>
		);
	}
}

export default TodoApp;
