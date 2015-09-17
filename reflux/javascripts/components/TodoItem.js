import React, { PropTypes, Component } from 'react';
import TodoActions from '../actions/TodoActions.js';
import _ from 'lodash';
import ReactRouter from 'react-router';

class TodoItem extends Component {
	constructor (props) {
		super(props);
	}
	mixins: [React.addons.LinkedStateMixin]
	getInitialState () {
		return {};
	}
	handleToggle (evt) {
		TodoActions.toggleItem(this.props.id);
	}
	handleEditStart (evt) {
		evt.preventDefault();
		this.setState({
			isEditing: true,
			editValue: this.props.label
		}, function() {
			this.refs.editInput.getDOMNode().focus();
		});
	}
	handleValueChange (evt) {
		var text = this.state.editValue; 
		if (evt.which === 13 && text) {
			this.refs.editInput.getDOMNode().blur();
		}
		else if (evt.which === 27) {
			this.setState({ isEditing: false },function(){
				this.refs.editInput.getDOMNode().blur();
			});
		}
	}
	handleBlur () {
		var text = this.state.editValue; 
		if (this.state.isEditing && text) {
			TodoActions.editItem(this.props.id, text);
		}
		this.setState({isEditing:false});
	}
	handleDestroy () {
		TodoActions.removeItem(this.props.id);
	}
	render () {
		var classes = React.addons.classSet({
			'completed': this.props.isComplete,
			'editing': this.state.isEditing
		});
		return (
			<li className={classes}>
				<div className="view">
					<input className="toggle" type="checkbox" checked={!!this.props.isComplete} onChange={this.handleToggle.bind(this)} />
					<label onDoubleClick={this.handleEditStart.bind(this)}>{this.props.label}</label>
					<button className="destroy" onClick={this.handleDestroy.bind(this)}></button>
				</div>
				<input ref="editInput" className="edit" valueLink={this.linkState('editValue')} onKeyUp={this.handleValueChange.bind(this)} onBlur={this.handleBlur.bind(this)} />
			</li>
		);
	}
}


TodoItem.propTypes = {
  label: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  id: PropTypes.number
};

export default TodoItem;
