import React, { PropTypes, Component } from 'react';
import ReactRouter from 'react-router';
import TodoMain from './TodoMain';
import TodoHeader from './TodoHeader';
import TodoFooter from './TodoFooter';
import TodoStores from '../stores/TodoStores';
import Reflux from 'reflux';

class TodoApp extends Component {
	constructor (props) {
		super(props);
    this.state = {
      list: []
    };
	}
  //mixins: [Reflux.listenTo(TodoStores, 'list')]
	render () {
		return (
			<div>
				<TodoHeader />
        {React.cloneElement(this.props.children, {list: this.state.list})}
				//<ReactRouter.RouteHandler list={this.state.list} />
				<TodoFooter list={this.state.list} />
			</div>
		);
	}
}

export default TodoApp;
