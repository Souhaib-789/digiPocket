import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Colors} from '../config/Colors';
import TextComponent from './TextComponent';
import * as Progress from 'react-native-progress';

export const Loader = () => {
  return (
    <View style={styles.container}>
      <TextComponent text={'Please Wait ...'} style={styles.text} />
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  text: {
    color: Colors.PRIMARY_COLOR,
    fontWeight: 'bold'
  },
});
