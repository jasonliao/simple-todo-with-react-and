import React from 'react';

import TodoActions from '../actions/TodoActions';
import TodoTextInput from './TodoTextInput';

var ReactPropTypes = React.PropTypes;

export default class TodoItem extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isEditing: false
    };
  }
  propTypes: {
    todo: ReactPropTypes.object.isRequired
  }
  _onSave (text) {
    TodoActions.updateText(this.props.todo.id, text);
    this.setState({
      isEditing: false
    });
  }
  _onToggleComplete () {
    TodoActions.toggleComplete(this.props.todo);
  }
  _onDoubleClick () {
    this.setState({
      isEditing: true
    });
  }
  _onDestroyClick () {
    TodoActions.destroy(this.props.todo.id);
  }
  render () {
    var todo = this.props.todo;
    var className = (todo.complete ? 'completed ' : '') +
                    (this.state.isEditing ? 'editing' : '');
    var input;
    if (this.state.isEditing) {
      input = <TodoTextInput className="edit" onSave={this._onSave.bind(this)} value={todo.text} />;
    }

    return (
      <li className={className} key={todo.id}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={todo.complete} onChange={this._onToggleComplete.bind(this)} />
          <label onDoubleClick={this._onDoubleClick.bind(this)}>{todo.text}</label>
          <button className="destroy" onClick={this._onDestroyClick.bind(this)} />
        </div>
        {input}
      </li>
    );
  }
}
