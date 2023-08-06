import React from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import TextComponent from './TextComponent';
import {Colors} from '../config/Colors';
import {Sizes} from '../config/Sizes';
import { Fonts } from '../config/Fonts';

const Button = props => {
  return (
    <TouchableOpacity style={[styles.button, {...props?.style}]} onPress={props?.onPress}>
      <TextComponent text={props?.title} style={[styles.button_text , {...props?.textStyle}]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.PRIMARY_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 5,
    width: '100%',
    alignSelf: 'center'
  },
  button_text: {
    color: 'white',
    fontSize: Sizes.h5,
    fontFamily: Fonts.SemiBold
  },
});

export default Button;
