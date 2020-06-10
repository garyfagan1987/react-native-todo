import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

const Form = ({
  handleSubmit,
  onChangeText,
  value,
}) => (
  <View style={styles.header}>
    <TextInput
      onSubmitEditing={handleSubmit}
      onChangeText={onChangeText}
      placeholder="Enter a new todo"
      style={styles.input}
      value={value}
    />
  </View>
);

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingBottom: 10,
  },
  input: {
    fontSize: 20,
    paddingBottom: 10,
    paddingTop: 10,
    width: '100%',
  },
});

export default Form;