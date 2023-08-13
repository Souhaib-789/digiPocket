import React from 'react';
import {StyleSheet, View, Modal} from 'react-native';
import {Colors} from '../config/Colors';
import TextComponent from './TextComponent';
import * as Progress from 'react-native-progress';
import { useSelector } from 'react-redux';
import { Fonts } from '../config/Fonts';
import Spinner from 'react-native-spinkit';

export const Loader = (props) => {
  const theme = useSelector(state => state.AppReducer.theme)

  return (
    <Modal 
     animationType="fade"
    transparent={true}
    visible={props?.visible} >
    <View style={styles.container} >

      <Spinner
      isVisible={true}
      color={Colors.PRIMARY_COLOR}
      size={120}
      type={'Pulse'}
      />

      {/* <View style={[styles.sub_container , {     backgroundColor: theme ? Colors.BLACK : Colors.WHITE,
}]}>
      <TextComponent text={'Please Wait ...'} style={[styles.text , {    color: theme ? Colors.WHITE: Colors.PRIMARY_COLOR,
}]} />
      <Progress.Bar
        progress={2}
        height={8}
        width={200}
        animated={true}
        useNativeDriver={true}
        color={Colors.PRIMARY_COLOR}
        indeterminate={true}
        borderWidth={1}
      />
      </View> */}
    </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(00, 00, 00, 0.3)",
      alignItems: 'center',
    justifyContent: 'center',
  },
  sub_container:{
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    padding: 40
  },
  text: {
    fontFamily: Fonts.SemiBold
  },
});
