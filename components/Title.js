import React from 'react';
import { StyleSheet, Text } from 'react-native';

const Title = ({
  children
}) => (
  <Text style={styles.title}>{children}</Text>
);

const styles = StyleSheet.create({
  title: {
    backgroundColor: 'red',
    color: '#FFF',
    paddingTop: 50,
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    textAlign: "center",
  }
});

export default Title;