import React, {useState} from 'react';
import {
  Modal as RNModal,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Colors} from '../config/Colors';
import TextComponent from './TextComponent';
import {Sizes} from '../config/Sizes';
import { useSelector } from 'react-redux';

export const Modal = props => {

  const theme = useSelector(state => state.AppReducer.theme)

  return (
    <RNModal
      animationType="slide"
      transparent={true}
      visible={props?.visible}
      onRequestClose={props?.onClose}>
      <View style={styles.centeredView}>
        <View style={[styles.modalView , { backgroundColor: theme ? Colors.BLACK : Colors.WHITE}]}>
          <Image source={props?.image} style={styles.image} />
          <TextComponent text={props?.title} style={[styles.modalHeading  , {color : theme ? Colors.WHITE : Colors.BLACK}]} />
          <TextComponent text={props?.text} style={styles.modalText} />

          <View style={styles.btnview}>
            {props?.closeText && (
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={props?.cancelModal}>
                <TextComponent
                  style={styles.textStyle}
                  text={props?.closeText}
                />
              </TouchableOpacity>
            )}

            {props?.yesText && (
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={props?.onPressYes}>
                <TextComponent style={styles.textStyle} text={props?.yesText} />
              </TouchableOpacity>
            )}

            {props?.Ok && (
              <TouchableOpacity
                style={styles.button}
                onPress={props?.onPressOK}>
                <TextComponent style={styles.textStyle} text={'OK'} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.RGBA3,
  },
  modalView: {
    borderRadius: 15,
    paddingHorizontal: 10,
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
    shadowColor: Colors.PRIMARY_COLOR,
    height: 400,
    width: '80%'
  },
  button: {
    borderRadius: 10,
    padding: 10,
    width: '80%',
    elevation: 2,
    backgroundColor: Colors.PRIMARY_COLOR,
  },
  textStyle: {
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    fontSize: Sizes.h5,
    color: Colors.GREY,
    textAlign: 'center',
  },
  modalHeading: {
    color: Colors.BLACK,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Sizes.h1,
  },
  btnview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'flex-end',
    marginTop: 20,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 15,
  },
});
