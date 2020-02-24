import React, { useState } from 'react';
import { StyleSheet, Text, View, CheckBox, TextInput } from 'react-native';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState('');
  
  const handleSubmit = () => {
    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        {
          checked: false,
          key: prevTodos.length + 1,
          name: todo,
        },
      ];
    });
    setTodo('');
  }

  const handleChecked = (key) => {
    setTodos((prevTodos) => prevTodos.filter(todo => todo.key != key));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo ({todos.length})</Text>
      <View style={styles.main}>
        <View style={styles.header}>
          <TextInput
            onSubmitEditing={() => handleSubmit()}
            onChangeText={text => setTodo(text)}
            placeholder="Enter a new todo"
            style={styles.input}
            value={todo}
          />
        </View>
        {todos.length < 1 && <Text style={[styles.empty]}>No todos, enjoy the rest of your day</Text>}
        <View>
          {todos.map(todo => (
            <View key={todo.key} style={styles.item}>
              <CheckBox
                onChange={() => handleChecked(todo.key)}
                value={todo.checked}
              />
              <Text style={{marginTop: 5}}> {todo.name}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  empty: {
    backgroundColor: '#FFE794',
    borderRadius: 10,
    color: '#000',
    marginTop: 20,
    padding: 20,
  },
  header: {
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingBottom: 10,
  },
  input: {
    padding: 10,
    width: '100%',
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#AAA',
    flexDirection: 'row',
    paddingBottom: 10,
    paddingTop: 10,
  },
  main: {
    flex: 1,
    padding: 20,
  },
  title: {
    backgroundColor: 'red',
    color: '#FFF',
    marginTop: 30,
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  }
});
