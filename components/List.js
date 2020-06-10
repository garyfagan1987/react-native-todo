import React from 'react';
import { CheckBox, StyleSheet, Text, View } from 'react-native';

const List = ({
  onChange,
  item,
}) => (
  <View style={styles.item}>
    <CheckBox
      onChange={onChange}
      value={item.checked}
    />
    <Text style={styles.text}>{item.name}</Text>
  </View>
);

const styles = StyleSheet.create({
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#AAA',
    flexDirection: 'row',
    paddingBottom: 10,
    paddingTop: 10,
  },
  text: {
    marginTop: 5,
    fontSize: 20,
  },
});

export default List;