import React, { PropTypes, Component } from 'react';
import Addons from 'react/addons';
import TodoActions from '../actions/TodoActions.js';
import _ from 'lodash';
import { Router, Route, Link } from 'react-router';

class TodoFooter extends Component {
	constructor (props) {
		super(props);
	}
	render () {
		var nbrcompleted = _.filter(this.props.list, "isComplete").length,
				nbrtotal = this.props.list.length,
				nbrincomplete = nbrtotal-nbrcompleted,
				clearButtonClass = Addons.addons.classSet({"hidden": nbrcompleted < 1}),
				footerClass = Addons.addons.classSet({"hidden": !nbrtotal }),
				completedLabel = "Clear completed (" + nbrcompleted + ")",
				itemsLeftLabel = nbrincomplete === 1 ? " item left" : " items left";
		return (
			<footer id="footer" className={footerClass}>
				<span id="todo-count"><strong>{nbrincomplete}</strong>{itemsLeftLabel}</span>
				<ul id="filters">
					<li>
						<Link activeClassName="selected" to="/">All</Link>
					</li>
					<li>
						<Link activeClassName="selected" to="/active">Active</Link>
					</li>
					<li>
						<Link activeClassName="selected" to="/completed">Completed</Link>
					</li>
				</ul>
				<button id="clear-completed" className={clearButtonClass} onClick={TodoActions.clearCompleted}>{completedLabel}</button>
			</footer>
		);
	}
}

TodoFooter.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default TodoFooter;
