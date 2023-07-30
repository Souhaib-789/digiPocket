import React from 'react';
import {StyleSheet, View, Text, FlatList, TouchableOpacity} from 'react-native';
import {Colors} from '../../config/Colors';
import {Sizes} from '../../config/Sizes';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import TextComponent from '../../components/TextComponent';
import {SwipeListView} from 'react-native-swipe-list-view';
import {ListEmptyComponent} from '../../components/ListEmptyComponent';
import {useNavigation} from '@react-navigation/native';

const Income = () => {

  const navigation = useNavigation()

  const renderListItem = ({item}) => {
    return (
      <View style={styles.list_item}>
        <View style={styles.flex}>
          <View style={styles.icon_circle}>
            <FontAwesome6 size={18} color={Colors.WHITE} name="cart-shopping" />
          </View>
          <View style={{marginLeft: 10}}>
            <TextComponent text={'Shopping'} style={styles.list_text} />
            <TextComponent text={'05/03/23'} style={styles.sub_heading} />
          </View>
        </View>
        <TextComponent text={'+$200'} style={styles.expense_text} />
      </View>
    );
  };

  const renderBackItem = ({item}) => {
    return (
      <View style={[styles.list_item, {justifyContent: 'flex-end'}]}>
        <View style={[styles.flex, {gap: 15, marginRight: 5}]}>
          <TouchableOpacity style={styles.hidden_button} onPress={()=> navigation.navigate('AddTransaction', {item: item , purpose : 'Edit'})}>
            <Feather size={20} color={Colors.WHITE} name="edit" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.hidden_buttonx}>
            <AntDesign size={20} color={Colors.PRIMARY_COLOR} name="delete" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SwipeListView
        style={{marginTop: 7}}
        data={[1, 2, 3, 4, 5, 6, 7, 8]}
        renderItem={renderListItem}
        renderHiddenItem={renderBackItem}
        rightOpenValue={-150}
        disableRightSwipe={true}
        ListEmptyComponent={ListEmptyComponent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Income;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    padding: 20,
    paddingBottom: 80,
  },
  icon_circle: {
    backgroundColor: Colors.LLLGREY,
    width: 45,
    height: 45,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list_text: {
    color: Colors.BLACK,
    fontSize: Sizes.h5,
  },
  expense_text: {
    color: Colors.PRIMARY_COLOR,
    fontSize: Sizes.h4,
  },
  sub_heading: {
    color: Colors.GREY,
    fontSize: Sizes.h7,
  },
  list_item: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    paddingVertical: 16,
    paddingHorizontal: 5,
    backgroundColor: Colors.WHITE,
    height: 60
 },

  flex: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  hidden_button: {
    backgroundColor: Colors.RGBA1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: 39,
  },
  hidden_buttonx: {
    backgroundColor: Colors.WHITE,
    borderColor: Colors.PRIMARY_COLOR,
    borderWidth: 1,
    borderRadius: 10,
    height: 60,
    width: 39,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
