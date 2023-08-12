import React from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import TextComponent from './TextComponent';
import {Colors} from '../config/Colors';
import { useSelector } from 'react-redux';
import { Fonts } from '../config/Fonts';

const Input = props => {
  const theme = useSelector(state => state.AppReducer.theme)

  return (
    <View style={styles.container}>
      {props?.label && (
        <TextComponent text={props?.label} style={[styles.label , {     backgroundColor: theme ? Colors.BLACK : Colors.WHITE        }]} />
      )}

      <TextInput 
      placeholder={props?.placeholder} 
      placeholderTextColor={theme ? Colors.LLGREY : null}
      value={props?.value}
      onChangeText={props?.onChangeText}
      editable={props?.editable}
      secureTextEntry={props?.secureTextEntry}
      keyboardType={props?.keyboardType}
      multiline={props?.multiline}
      maxLength={props?.maxLength}
      numberOfLines={props?.numberOfLines}
      style={[styles.input , {    color: theme ? Colors.WHITE: Colors.BLACK
      }, {...props?.style}]}
      />

      {props?.rightIcon && (
        <TouchableOpacity onPress={props?.onPressRightIcon}>
          {props?.rightIcon}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: Colors.LLGREY,
    borderWidth: 1,
    marginVertical: 15,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    position: 'absolute',
    top: -12,
    left: 7,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  input:{
    width: '90%',
    fontFamily: Fonts.Regular
  }
});

export default Input;
