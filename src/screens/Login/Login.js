import React from 'react';
import {StyleSheet, View , Text} from 'react-native';
import {Colors} from '../../config/Colors';

const Login = () => {
  return (
  <View style={styles.container}>
    <Text>Login</Text>
  </View>
  )};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
});
