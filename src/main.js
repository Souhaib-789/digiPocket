import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Colors} from './config/Colors';

const Main = () => {
  return (
  <View style={styles.container}></View>
  )};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY_COLOR,
  },
});
