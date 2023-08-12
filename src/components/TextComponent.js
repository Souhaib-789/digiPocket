import React from 'react';
import {StyleSheet, View , Text} from 'react-native';
import {Colors} from '../config/Colors';
import { useSelector } from 'react-redux';
import { Fonts } from '../config/Fonts';

const TextComponent = (props) => {
  const theme = useSelector(state => state.AppReducer.theme)

  return (
    <Text numberOfLines={props?.numberOfLines} style={[{color: theme ? Colors.WHITE : Colors.BLACK ,
    fontFamily: Fonts.Regular} , props?.style]}>{props?.text}</Text>
  )};

export default TextComponent;


