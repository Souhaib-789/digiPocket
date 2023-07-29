import React from 'react';
import {StyleSheet, View , Text, FlatList} from 'react-native';
import {Colors} from '../../config/Colors';
import { Sizes } from '../../config/Sizes';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import TextComponent from '../../components/TextComponent';

const Income = () => {

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

  return (
  <View style={styles.container}>
   <FlatList
          data={[1, 2, 3 , 4 , 5, 6, 7, 8]}
          renderItem={renderListItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
  </View>
  )};

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
    marginVertical: 15,
  },
  
  flex: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
