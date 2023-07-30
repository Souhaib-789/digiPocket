import React from 'react';
import { StyleSheet,  View,  Image, ScrollView,  TouchableOpacity, FlatList} from 'react-native';
import {Colors} from '../../config/Colors';
import TextComponent from '../../components/TextComponent';
import Alternate from '../../assets/alternate.jpg';
import {Sizes} from '../../config/Sizes';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import { ListEmptyComponent } from '../../components/ListEmptyComponent';

const Home = () => {
  const navigation = useNavigation();
  const renderListItem = ({item}) => {
    return (
      <View style={styles.list_item}>
        <View style={styles.flex}>
          <View style={styles.icon_circle}>
            <FontAwesome6
              size={18}
              color={Colors.PRIMARY_COLOR}
              name="cart-shopping"
            />
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
      <ScrollView>
        <View style={styles.sub_container} >

          <View style={styles.flexA}>
            <View>
              <TextComponent text={'Welcome Back ,'} style={[styles.sub_heading , {color: Colors.LLLLGREY}]}              />
              <TextComponent text={'Sarah Doe'} style={styles.heading} />
            </View>
            <TouchableOpacity  onPress={() => navigation.navigate('EditProfile')}>
              <Image source={Alternate} style={styles.profile_image} resizeMode="contain" />
            </TouchableOpacity>
          </View>

          <View style={styles.main_heading}>
            <TextComponent  text={'Total Balance'} style={[styles.box_span, {color: 'white'}]} />
            <TextComponent text={'$ 5000.00'} style={[ styles.box_heading, {color: 'white', fontSize: 27}]} />
          </View>
        </View>

        <View style={styles.cards_view}>
          <View style={styles.box}>
            <MaterialCommunityIcons name="arrow-bottom-left"  color={Colors.PRIMARY_COLOR} size={25}  />
            <View>
              <TextComponent text={'Income'} style={styles.box_span} />
              <TextComponent text={'$ 5000.00'} style={styles.box_heading} />
            </View>
          </View>

          <View style={styles.box}>
            <MaterialCommunityIcons name="arrow-top-right" color={Colors.PRIMARY_COLOR} size={25}  />
            <View>
              <TextComponent text={'Expense'} style={styles.box_span} />
              <TextComponent text={'$ 200.00'} style={styles.box_heading} />
            </View>
          </View>
        </View>

        <View style={styles.lower_container}>
          <View style={styles.flexA}>
            <TextComponent text={'Recent Transactions'} style={styles.headingx} />
            <TouchableOpacity onPress={() => navigation.navigate('Transactions')} >
              <TextComponent text={'See all '} style={styles.sub_heading} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={[1,2,3]}
            renderItem={renderListItem}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={ListEmptyComponent}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  sub_container: {
    backgroundColor: Colors.PRIMARY_COLOR,
    padding: 20,
    paddingBottom: 80,
  },
  lower_container: {
    padding: 20,
     marginTop: 60
    },
  main_heading: {
    marginTop: 40,
    gap: 5,
  },
  profile_image: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  cards_view: {
    position: 'absolute',
   top: 200, 
   marginHorizontal: 20, 
     flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center'
}, 
  flex: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  flexA: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  upper_view: {
    backgroundColor: Colors.PRIMARY_COLOR,
    height: 230,
    padding: 20,
  },
  heading: {
    color: Colors.WHITE,
    fontSize: Sizes.h3,
  },
  headingx: {
    color: Colors.BLACK,
    fontSize: Sizes.h4,
    fontWeight: 'bold',
  },
  box: {
    backgroundColor: Colors.WHITE,
    elevation: 5,
    borderRadius: 10,
    paddingVertical: 25,
    paddingHorizontal: 15,
    width: '48%',
    gap: 7,
    marginHorizontal: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  box_span: {
    color: Colors.BLACK,
    fontSize: Sizes.h6,
  },
  box_heading: {
    color: Colors.BLACK,
    fontSize: Sizes.h3,
    fontWeight: 'bold',
  },
  icon_circle: {
    backgroundColor: Colors.WHITE,
    elevation: 3,
    width: 45,
    marginLeft: 2,
    height: 45,
    borderRadius: 10,
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
});
