import React from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import TextComponent from './TextComponent';
import {Colors} from '../config/Colors';

const Input = props => {
  return (
    <View style={styles.container}>
      {props?.label && (
        <TextComponent text={props?.label} style={styles.label} />
      )}

      <TextInput 
      placeholder={props?.placeholder} 
      value={props?.value}
      onChangeText={props?.onChangeText}
      editable={props?.editable}
      secureTextEntry={props?.secureTextEntry}
      keyboardType={props?.keyboardType}
      multiline={props?.multiline}
      numberOfLines={props?.numberOfLines}
      style={[styles.input , {...props?.style}]}
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
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  input:{
    width: '90%',
    color: Colors.BLACK
  }
});

export default Input;
