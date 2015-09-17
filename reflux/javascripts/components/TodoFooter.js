import React, { PropTypes, Component } from 'react';
import TodoActions from '../actions/TodoActions.js';
import _ from 'lodash';
import ReactRouter from 'react-router';

class TodoFooter extends Component {
	constructor (props) {
		super(props);
	}
	render () {
		var nbrcompleted = _.filter(this.props.list, "isComplete").length,
				nbrtotal = this.props.list.length,
				nbrincomplete = nbrtotal-nbrcompleted,
				clearButtonClass = React.addons.classSet({hidden: nbrcompleted < 1}),
				footerClass = React.addons.classSet({hidden: !nbrtotal }),
				completedLabel = "Clear completed (" + nbrcompleted + ")",
				itemsLeftLabel = nbrincomplete === 1 ? " item left" : " items left";
		return (
			<footer id="footer" className={footerClass}>
				<span id="todo-count"><strong>{nbrincomplete}</strong>{itemsLeftLabel}</span>
				<ul id="filters">
					<li>
						<ReactRouter.Link activeClassName="selected" to="All">All</ReactRouter.Link>
					</li>
					<li>
						<ReactRouter.Link activeClassName="selected" to="Active">Active</ReactRouter.Link>
					</li>
					<li>
						<ReactRouter.Link activeClassName="selected" to="Completed">Completed</ReactRouter.Link>
					</li>
				</ul>
				<button id="clear-completed" className={clearButtonClass} onClick={TodoActions.clearCompleted}>{completedLabel}</button>
			</footer>
		);
	}
}

TodoFooter.propTypes = {
  list: PropTypes.object.isRequired
}

export default TodoFooter;
