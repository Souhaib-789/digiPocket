import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Colors} from '../../config/Colors';
import TextComponent from '../../components/TextComponent';
import Alternate from '../../assets/alternate.jpg';
import {Sizes} from '../../config/Sizes';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Home = () => {
  const renderListItem = ({item}) => {
    return (
      <View style={styles.list_item}>
        <View style={styles.flex}>
          <View style={styles.icon_circle}>
            <FontAwesome6 size={18} color={Colors.BLACK} name="cart-shopping" />
          </View>
          <View style={{marginLeft: 10}}>
            <TextComponent text={'Shopping'} style={styles.list_text} />
            <TextComponent text={'05/03/23'} style={styles.sub_heading} />
          </View>
        </View>
        <TextComponent text={'-$ 200'} style={styles.expense_text} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.flexA}>
          <View>
            <TextComponent text={'Welcome Back ,'} style={styles.sub_heading} />
            <TextComponent text={'Sarah Doe'} style={styles.heading} />
          </View>

          <Image
            source={Alternate}
            style={styles.profile_image}
            resizeMode="contain"
          />
        </View>

        <View
          style={[
            styles.box,
            {
              marginTop: 25,
              backgroundColor: Colors.PRIMARY_COLOR,
              gap: 5,
              width: '60%',
              flexDirection: 'column',
              alignItems: 'flex-start',
            },
          ]}>
          <TextComponent
            text={'Total Balance'}
            style={[styles.box_span, {color: 'white'}]}
          />
          <TextComponent
            text={'$ 5000.00'}
            style={[
              styles.box_heading,
              {color: 'white', marginLeft: 15, fontSize: Sizes.h1},
            ]}
          />
        </View>

        <View style={[styles.flexA, {marginTop: 20}]}>
          <View style={styles.box}>
            <AntDesign
              name="arrowdown"
              color={Colors.PRIMARY_COLOR}
              size={25}
            />
            <View>
              <TextComponent text={'Income'} style={styles.box_span} />
              <TextComponent text={'$ 5000.00'} style={styles.box_heading} />
            </View>
          </View>
          <View style={styles.box}>
            <AntDesign name="arrowup" color={Colors.PRIMARY_COLOR} size={25} />
            <View>
              <TextComponent text={'Expense'} style={styles.box_span} />
              <TextComponent text={'$ 200.00'} style={styles.box_heading} />
            </View>
          </View>
        </View>

        <View style={[styles.flexA, {marginTop: 30}]}>
          <TextComponent text={'Recent Transactions'} style={styles.headingx} />
          <TouchableOpacity>
            <TextComponent text={'All >'} style={styles.sub_heading} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={[1, 2, 3]}
          renderItem={renderListItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    padding: 18,
  },
  profile_image: {
    width: 40,
    height: 40,
    borderRadius: 40,
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
  sub_heading: {
    color: Colors.GREY,
    fontSize: Sizes.h6,
  },
  heading: {
    color: Colors.BLACK,
    fontSize: Sizes.h2,
  },
  headingx: {
    color: Colors.BLACK,
    fontSize: Sizes.h3,
    fontWeight: 'bold',
  },
  box: {
    backgroundColor: Colors.WHITE,
    elevation: 5,
    borderRadius: 10,
    paddingVertical: 20,
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
    fontSize: Sizes.h2,
    fontWeight: 'bold',
  },
  icon_circle: {
    backgroundColor: Colors.LLLGREY,
    width: 50,
    height: 50,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list_text: {
    color: Colors.BLACK,
    fontSize: Sizes.h4,
  },
  expense_text: {
    color: Colors.GREEN,
    fontSize: Sizes.h3,
  },
  list_item: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
});
