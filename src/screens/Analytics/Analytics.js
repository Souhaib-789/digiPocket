import React from 'react';
import {StyleSheet, View , Text} from 'react-native';
import {Colors} from '../../config/Colors';

const Analytics = () => {
  return (
  <View style={styles.container}>
    <Text>Analytics</Text>
  </View>
  )};

export default Analytics;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
});
