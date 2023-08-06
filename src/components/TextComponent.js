import React from 'react';
import {StyleSheet, View , Text} from 'react-native';
import {Colors} from '../config/Colors';
import { useSelector } from 'react-redux';

const TextComponent = (props) => {
  const theme = useSelector(state => state.AppReducer.theme)

  return (
    <Text style={[{color: theme ? Colors.WHITE : Colors.BLACK} , props?.style]}>{props?.text}</Text>
  )};

export default TextComponent;

const styles = StyleSheet.create({

});
