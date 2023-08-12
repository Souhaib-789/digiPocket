import React, { useEffect, useState, useCallback } from 'react';
import {StyleSheet, View, RefreshControl, ScrollView, TouchableOpacity} from 'react-native';
import {Colors} from '../../config/Colors';
import {Sizes} from '../../config/Sizes';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import TextComponent from '../../components/TextComponent';
import {SwipeListView} from 'react-native-swipe-list-view';
import {ListEmptyComponent} from '../../components/ListEmptyComponent';
import {useNavigation} from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import { hideLoading, showAlert, showLoading } from '../../redux/actions/AppAction';
import moment from 'moment';
import Icon from '../../components/Icon';

const Income = () => {

  const navigation = useNavigation()
  const dispatch = useDispatch();
  const theme = useSelector(state => state.AppReducer.theme)
  const userID = useSelector(state => state.AuthReducer.userInfo.uid);
  const [myincomes, setmyincomes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);


  useEffect(() => {
    getUserIncome();
  }, []);

  const getUserIncome = async () => {
    const usersCollectionRef = firestore().collection('Users');
    try {
      dispatch(showLoading());
      const userDoc = await usersCollectionRef.doc(userID).get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        const incomeArray = userData.income || [];
        // console.log('User income array:', incomeArray);
        setmyincomes(incomeArray);
      } else {
        console.log('User document not found');
        return [];
      }
    } catch (error) {
      console.error('Error fetching user expenses: ', error);
      dispatch(showAlert('Something went wrong'))
      return [];
    }finally{
      dispatch(hideLoading())
  }
  };

  const renderListItem = ({item}) => {
    return (
      <View style={[styles.list_item , {backgroundColor: theme ? Colors.BLACK : Colors.WHITE}]}>
        <View style={[styles.flex, { width: '67%'}]}>
          <View style={styles.icon_circle}>
        <Icon category={item?.category} />
          </View>
          <View style={{marginLeft: 10,  width: '72%' , }}>
            <TextComponent text={item?.name} numberOfLines={1}  style={[styles.list_text, {  color: theme ? Colors.WHITE : Colors.BLACK}]} />
            <TextComponent text={moment(item?.date).format('DD/MM/YY')} style={styles.sub_heading} />
          </View>
        </View>
        <View style={{ alignItems: 'flex-end',  width: '35%'}}>
        <TextComponent text={`+Rs.${item?.amount}`} style={styles.expense_text} />
        </View>
      </View>
    );
  };

  const renderBackItem = ({item}) => {
    return (
      <View style={[styles.list_item, {justifyContent: 'flex-end', backgroundColor: theme ? Colors.BLACK : Colors.WHITE}]}>
        <View style={[styles.flex, {gap: 15, marginRight: 5}]}>
          <TouchableOpacity style={styles.hidden_button} onPress={()=> navigation.navigate('AddTransaction', {item: item , purpose : 'Edit', type: 'Income'})}>
            <Feather size={20} color={theme ? Colors.WHITE : Colors.WHITE} name="edit" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.hidden_buttonx , {backgroundColor: theme ? Colors.BLACK : Colors.WHITE}]}>
            <AntDesign size={20} color={Colors.PRIMARY_COLOR} name="delete" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const onScrollRefreshing = useCallback(() => {
    setRefreshing(true);
    getUserIncome();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <View style={[styles.container , { backgroundColor: theme ? Colors.BLACK : Colors.WHITE}]}>
              <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onScrollRefreshing} colors={[Colors.PRIMARY_COLOR , Colors.BLACK]} />} showsVerticalScrollIndicator={false}>

      <SwipeListView
        style={{marginTop: 7}}
        data={myincomes}
        renderItem={renderListItem}
        renderHiddenItem={renderBackItem}
        rightOpenValue={-150}
        disableRightSwipe={true}
        ListEmptyComponent={ListEmptyComponent}
        showsVerticalScrollIndicator={false}
      />
      </ScrollView>
    </View>
  );
};

export default Income;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    borderColor: Colors.PRIMARY_COLOR,
    borderWidth: 1,
    borderRadius: 10,
    height: 60,
    width: 39,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
