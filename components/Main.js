import React from 'react';
import { StyleSheet, View } from 'react-native';

const Main = ({
  children
}) => (
  <View style={styles.main}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 20,
  },
});

export default Main;