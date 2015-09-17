import React from 'react';
import TodoActions from '../actions/TodoActions';
import TodoTextInput from './TodoTextInput';

export default class Header extends React.Component {
  constructor (props) {
    super(props);
  }
  _onSave (text) {
    if (text.trim()) {
      TodoActions.create(text);
    }
  }
  render () {
    return (
      <header id="header">
        <h1>todos</h1>
        <TodoTextInput
          id="new-todo"
          placeholder="What needs to be done?"
          onSave={this._onSave.bind(this)}
        />
      </header>
    );
  }
}
