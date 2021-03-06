import React, { PropTypes, Component } from 'react';
import TodoActions from '../actions/TodoActions.js';

class TodoHeader extends Component {
	constructor (props) {
		super(props);
	}
	handlevaluechange (evt) {
		var text = evt.target.value;
		if (evt.which === 13 && text) { 
			TodoActions.additem(text);
			evt.target.value = '';
		} else if (evt.which === 27) { 
			evt.target.value = '';
		}
	}
	render () {
		return (
			<header id="header">
				<h1>todos</h1>
				<input id="new-todo" placeholder="what needs to be done?" autoFocus onKeyUp={this.handlevaluechange.bind(this)}/>
			</header>
		);
	}
};

export default TodoHeader;
