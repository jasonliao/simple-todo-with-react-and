import React from 'react';
import TodoActions from '../actions/TodoActions';

var ReactPropTypes = React.PropTypes;

export default class Footer extends React.Component {
  propTypes: {
    allTodos: ReactPropTypes.object.isRequired
  }
  _onClearCompletedClick () {
    TodoActions.destroyCompleted();
  }
  render () {
    var allTodos = this.props.allTodos,
        total = Object.keys(allTodos).length;

    if (total === 0) {
      return null;
    }

    var completed = 0;
    for (var key in allTodos) {
      if (allTodos[key].complete) {
        completed++;
      }
    }

    var itemsLeft = total - completed,
        itemsLeftPhrase = itemsLeft === 1?
                          ' item ' :
                          ' items ';
    itemsLeftPhrase += 'left';

    var clearCompletedButton;
    if (completed) {
      clearCompletedButton = 
        <button id="clear-complete" onClick={this._onClearCompletedClick.bind(this)}>
        Clear completed ({completed})
        </button>;
    }

    return (
      <footer id="footer">
        <span id="todo-count">
          <strong>
            {itemsLeft}
          </strong>
          {itemsLeftPhrase}
        </span>
        {clearCompletedButton}
      </footer>
    );
  }
}
