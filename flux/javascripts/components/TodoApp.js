/**
 * This component operates as a "Controller View". It listens for changes in
 * the TodoStore and passes the new data to its children
 */

import React from 'react';

import Header from './Header';
import MainSection from './MainSection';
import Footer from './Footer';

import TodoStore from '../stores/TodoStore';

export default class TodoApp extends React.Component {
  constructor (props) {
    super(props);
    this.state = this.getTodoState.bind(this)(); 
  }
  getTodoState () {
    return {
      allTodos: TodoStore.getAll(),
      areAllComplete: TodoStore.areAllComplete()
    }
  }
  componentDidMount () {
    TodoStore.addChangeListener(this._onChange.bind(this));
  }
  componentWillUnmount () {
    TodoStore.removeChangeListener(this._onChange.bind(this));
  }
  _onChange () {
    this.setState(this.getTodoState.bind(this)());
  }
  render () {
    return (
      <div>
        <Header />
        <MainSection allTodos={this.state.allTodos} areAllComplete={this.state.areAllComplete} />
        <Footer allTodos={this.state.allTodos} />
      </div>
    );
  }
}
