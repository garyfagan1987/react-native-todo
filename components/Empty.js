import React from 'react';
import { StyleSheet, Text } from 'react-native';

const Empty = ({
  children
}) => (
  <Text style={styles.empty}>{children}</Text>
);

const styles = StyleSheet.create({
  empty: {
    backgroundColor: '#FFE794',
    borderRadius: 10,
    color: '#000',
    fontSize: 20,
    marginTop: 20,
    padding: 20,
  },
});

export default Empty;