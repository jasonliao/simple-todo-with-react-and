import React, { PropTypes, Component } from 'react';
import TodoActions from '../actions/TodoActions.js';
import _ from 'lodash';
import ReactRouter from 'react-router';

class TodoMain extends Component {
	constructor (props) {
		super(props);
	}
	toggleAll (evt) {
		TodoActions.toggleAllItems(evt.target.checked);
	}
	render () {
		var filteredList;
		switch (this.props.location) {
			case '/completed':
				filteredList = _.filter(this.props.list,(item) => { return item.isComplete; });
				break;
			case '/active':
				filteredList = _.filter(this.props.list,(item) => { return !item.isComplete; });
				break;
			default:
				filteredList = this.props.list;
		}
		var classes = React.addons.classSet({
			"hidden": this.props.list.length < 1
		});
		return (
			<section id="main" className={classes}>
				<input id="toggle-all" type="checkbox" onChange={this.toggleAll.bind(this)} />
				<label htmlFor="toggle-all">Mark all as complete</label>
				<ul id="todo-list">
					{ filteredList.map((item) => {
						return <TodoItem label={item.label} isComplete={item.isComplete} id={item.key} key={item.key}/>;
					})}
				</ul>
			</section>
		);
	}
}

TodoMain.propTypes = {
  list: PropTypes.object.isRequired
}

export default TodoMain;
