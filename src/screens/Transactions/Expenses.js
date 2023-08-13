import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet, View, Text, FlatList, TouchableOpacity, RefreshControl, ScrollView} from 'react-native';
import {Colors} from '../../config/Colors';
import {Sizes} from '../../config/Sizes';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import TextComponent from '../../components/TextComponent';
import {SwipeListView} from 'react-native-swipe-list-view';
import {ListEmptyComponent} from '../../components/ListEmptyComponent';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import {hideLoading, showAlert, showLoading} from '../../redux/actions/AppAction';
import Icon from '../../components/Icon';

const Expenses = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const theme = useSelector(state => state.AppReducer.theme);
  const userID = useSelector(state => state.AuthReducer.userInfo.uid);
  const [myexpenses, setmyexpenses] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getUserExpenses();
  }, []);

 
  const getUserExpenses = async () => {
    const usersCollectionRef = firestore().collection('Users');
    try {
      dispatch(showLoading());
      const userDoc = await usersCollectionRef.doc(userID).get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        const expensesArray = userData.expenses || [];
        // console.log('User expenses array:', expensesArray);
        setmyexpenses(expensesArray);
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

const deleteExpense= async (index) => {
  const usersCollectionRef = firestore().collection('Users');

  try {
    dispatch(showLoading())
    const userDoc = await usersCollectionRef.doc(userID).get();

    if (userDoc.exists) {
      const userData = userDoc.data();
      const expensesArray = userData.expenses || [];

      expensesArray.splice(index, 1);

      await usersCollectionRef.doc(userID).update({
        expenses: expensesArray,
      });

      console.log('Expense deleted by index successfully!');
      await dispatch(showAlert('Expense deleted!'))
      getUserExpenses()
    } else {
      console.log('User document not found');
      dispatch(showAlert('Something went wrong'))
    }
  } catch (error) {
    console.error('Error deleting expense by index: ', error);
    dispatch(showAlert('Something went wrong'))
  }finally{
    dispatch(hideLoading())
  }
};

  const renderListItem = ({item}) => {
    return (
      <View
        style={[
          styles.list_item,
          {backgroundColor: theme ? Colors.BLACK : Colors.WHITE},
        ]}>
        <View style={[styles.flex,  { width: '67%'}]}>
          <View style={styles.icon_circle}>
          <Icon category={item?.category} />
          </View>
          <View style={{marginLeft: 10,   width: '72%' }}>
            <TextComponent
            numberOfLines={1}
              text={item?.name}
              style={[
                styles.list_text,
                {color: theme ? Colors.WHITE : Colors.BLACK},
              ]}
            />
            <TextComponent
              text={moment(item?.date).format('DD/MM/YY')}
              style={styles.sub_heading}
            />
          </View>
        </View>
        <View style={{ alignItems: 'flex-end',  width: '35%'}}>
        <TextComponent
          text={`-Rs.${item?.amount}`}
          style={styles.expense_text}
        />
          </View>
      </View>
    );
  };

  const renderBackItem = ({item , index}) => {
    return (
      <View style={[styles.list_item, {justifyContent: 'flex-end'}]}>
        <View style={[styles.flex, {gap: 15, marginRight: 5}]}>
          <TouchableOpacity
            style={styles.hidden_button}
            onPress={() =>
              navigation.navigate('AddTransaction', {
                item: item,
                purpose: 'Edit',
                type: 'Expense'
              })
            }>
            <Feather size={20} color={Colors.WHITE} name="edit" />
          </TouchableOpacity>
          <TouchableOpacity
          onPress={()=> deleteExpense(index)}
            style={[
              styles.hidden_buttonx,
              {backgroundColor: theme ? Colors.BLACK : Colors.WHITE},
            ]}>
            <AntDesign size={20} color={Colors.PRIMARY_COLOR} name="delete" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const onScrollRefreshing = useCallback(() => {
    setRefreshing(true);
    getUserExpenses();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: theme ? Colors.BLACK : Colors.WHITE},
      ]}>
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onScrollRefreshing} colors={[Colors.PRIMARY_COLOR , Colors.BLACK]} />} showsVerticalScrollIndicator={false}>
      <SwipeListView
        style={{marginTop: 7}}
        data={myexpenses}
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

export default Expenses;

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
    fontSize: Sizes.h5,
  },
  expense_text: {
    color: Colors.RED,
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
    height: 60,
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
