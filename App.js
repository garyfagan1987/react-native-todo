import React, { useState } from 'react';
import { Alert, FlatList } from 'react-native';

import Container from './components/Container';
import Empty from './components/Empty';
import Form from './components/Form';
import List from './components/List';
import Main from './components/Main';
import Title from './components/Title';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState('');

  const handleSubmit = () => {
    if(todo.length > 3) {
      setTodos((prevTodos) => {
        return [
          ...prevTodos,
          {
            checked: false,
            id: prevTodos.length + 1,
            name: todo,
          },
        ];
      });
      setTodo('');
    } else {
      Alert.alert('Woops', 'Todo must be over three characters long', [{ text: 'Understood' }])
    }
  }

  const handleChecked = (id) => {
    setTodos((prevTodos) => prevTodos.filter(todo => todo.id != id));
  }

  return (
    <Container>
      <Title>Todo ({todos.length})</Title>
      <Main>
        <Form
          handleSubmit={handleSubmit}
          onChangeText={text => setTodo(text)}
          value={todo}
        />
        {todos.length < 1 && <Empty>No todos, enjoy the rest of your day</Empty>}
        <FlatList
          data={todos}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <List
              onChange={() => handleChecked(item.id)}
              item={item}
            />
          )}
        />
      </Main>
    </Container>
  );
}
