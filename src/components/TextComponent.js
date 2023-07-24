import React from 'react';
import {StyleSheet, View , Text} from 'react-native';
import {Colors} from '../config/Colors';

const TextComponent = (props) => {
  return (
    <Text style={[styles.text , props?.style]}>{props?.text}</Text>
  )};

export default TextComponent;

const styles = StyleSheet.create({
  text: {
    color: Colors.BLACK,
  },
});
