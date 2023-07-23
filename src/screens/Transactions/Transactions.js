import React from 'react';
import {StyleSheet, View , Text} from 'react-native';
import {Colors} from '../../config/Colors';

const Transactions = () => {
  return (
  <View style={styles.container}>
    <Text>Transactions</Text>
  </View>
  )};

export default Transactions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
});
