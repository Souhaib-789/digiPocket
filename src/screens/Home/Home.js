import React from 'react';
import {StyleSheet, View , Text} from 'react-native';
import {Colors} from '../../config/Colors';

const Home = () => {
  return (
  <View style={styles.container}>
    <Text>Home</Text>
  </View>
  )};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
});
