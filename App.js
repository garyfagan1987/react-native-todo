import React from 'react';
import { Alert, FlatList } from 'react-native';
import * as Animatable from 'react-native-animatable';

import Container from './components/Container';
import Empty from './components/Empty';
import Form from './components/Form';
import List from './components/List';
import Main from './components/Main';
import Title from './components/Title';

export default class App extends React.Component {
  state = {
    todos: [],
    todo: '',
  };

  handleSubmit = () => {
    const { todo, todos } = this.state;
    if(todo.length > 3) {
      this.setTodos({checked: false, id: todos.length + 1, name: todo });
      this.setTodo('');
    } else {
      Alert.alert('🤦 Woops', 'Your todo must be over 3 characters long', [{ text: 'Understood' }])
    }
  }

  handleChecked = (id) => {
    this.removeTodo(id);
  }

  setTodo(text) {
    this.setState(() => {
      return {todo: text};
    })
  }

  setTodos(todo) {
    this.setState((prevState) => {
      return {
        todos: [
          ...prevState.todos,
          todo,
        ]
      };
    })
  }

  removeTodo(id) {
    const todos = this.state.todos.filter(todo => todo.id != id);
    this.setState(() => {
      return { todos }
    });
  }

  render() {
    const { todo, todos } = this.state;
    return (
      <Container>
        <Title>Todo</Title>
        <Main>
          <Form
            handleSubmit={this.handleSubmit}
            onChangeText={text => this.setTodo(text)}
            value={todo}
          />
          {todos.length < 1 && (
            <Animatable.View animation="bounceIn">
              <Empty>🎉 Enjoy your day!</Empty>
            </Animatable.View>
          )}
          <FlatList
            data={todos}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <List
                onChange={() => this.handleChecked(item.id)}
                item={item}
              />
            )}
          />
        </Main>
      </Container>
    );
  }
}
