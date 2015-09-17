import React from 'react';

import TodoActions from '../actions/TodoActions';
import TodoItem from './TodoItem';

var ReactPropTypes = React.PropTypes;

export default class MainSection extends React.Component {
  propTypes: {
    allTodos: ReactPropTypes.object.isRequired,
    areAllComplete: ReactPropTypes.bool.isRequired
  }
  _onToggleCompleteAll () {
    TodoActions.toggleCompleteAll();
  }
  render () {
    if (Object.keys(this.props.allTodos).length < 1) {
      return null;
    }

    var allTodos = this.props.allTodos;
    var todos = [];

    for (var key in allTodos) {
      todos.push(<TodoItem key={key} todo={allTodos[key]} />);
    }

    return (
      <section id="main">
        <input id="toggle-all" type="checkbox" onChange={this._onToggleCompleteAll.bind(this)} checked={this.props.areAllComplete ? 'checked' : ''} />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul id="todo-list">{todos}</ul>
      </section>
    );
  }
}
