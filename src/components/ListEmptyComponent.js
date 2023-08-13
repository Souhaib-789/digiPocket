import React from 'react';
import TextComponent from './TextComponent';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from '../config/Colors';
import { View } from 'react-native';

export const ListEmptyComponent = props => {
  return (
    <View style={{alignItems: 'center', alignSelf: 'center', flexDirection: 'row', gap: 10, marginTop: 35}}>
        < MaterialCommunityIcons name='note-remove-outline' color={Colors.PRIMARY_COLOR} size={30} />
      <TextComponent text={'No data found'} style={{color: Colors.GREY , fontSize: 13}} />
    </View>
  );
};
