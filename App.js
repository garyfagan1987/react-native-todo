import React from 'react';
import { Alert, FlatList, Platform, Vibration } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

import Container from './components/Container';
import Empty from './components/Empty';
import Form from './components/Form';
import List from './components/List';
import Main from './components/Main';
import Title from './components/Title';

export default class App extends React.Component {
  state = {
    expoPushToken: '',
    notification: {},
    todos: [],
    todo: '',
  };

  handleSubmit = () => {
    const { todo, todos } = this.state;
    if(todo.length > 3) {
      this.setTodos({checked: false, id: todos.length + 1, name: todo });
      this.setTodo('');
    } else {
      Alert.alert('Woops', 'Todo must be over three characters long', [{ text: 'Understood' }])
    }
  }

  handleChecked = (id) => {
    this.sendPushNotification()
    this.removeTodo(id);
  }

  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = await Notifications.getExpoPushTokenAsync();
      this.setState({ expoPushToken: token });
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }
  };

  componentDidMount() {
    this.registerForPushNotificationsAsync();
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  };

  _handleNotification = notification => {
    Vibration.vibrate();
    console.log(notification);
    this.setState({ notification: notification });
  };

  sendPushNotification = async () => {
    const message = {
      to: this.state.expoPushToken,
      sound: 'default',
      title: 'Todo Completed',
      body: 'Awesome you completed a Todo!',
      data: { data: 'goes here' },
      _displayInForeground: true,
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  };

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
          {todos.length < 1 && <Empty>No todos, enjoy the rest of your day</Empty>}
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
