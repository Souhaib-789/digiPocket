import React from 'react';
import {StyleSheet, View , Text} from 'react-native';
import {Colors} from '../../config/Colors';

const MoneyBox = () => {
  return (
  <View style={styles.container}>
    <Text>MoneyBox</Text>
  </View>
  )};

export default MoneyBox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
});
