import React, {useState, useCallback} from 'react';
import {  StyleSheet, View,  Image,  ScrollView,  TouchableOpacity,  FlatList,  RefreshControl,} from 'react-native';
import {Colors} from '../../config/Colors';
import TextComponent from '../../components/TextComponent';
import Alternate from '../../assets/alternate.jpg';
import {Sizes} from '../../config/Sizes';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {ListEmptyComponent} from '../../components/ListEmptyComponent';
import {useDispatch, useSelector} from 'react-redux';
import {Fonts} from '../../config/Fonts';
import firestore from '@react-native-firebase/firestore';
import { hideLoading, showAlert, showLoading, } from '../../redux/actions/AppAction';
import moment from 'moment';
import Icon from '../../components/Icon';
import auth from '@react-native-firebase/auth';

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const theme = useSelector(state => state.AppReducer.theme);
  const user = useSelector(state => state.AuthReducer.userInfo);
  const userProfile = auth().currentUser.photoURL;
  const [refreshing, setRefreshing] = useState(false);
  const IncomeCategories = ['Salary', 'Awards', 'Profit', 'Grants', 'Refunds'];

  const [recentTransactions , setrecentTransactions] = useState([])

  const [incomeSum, setIncomeSum] = useState(0);
  const [ExpenseSum, setExpenseSum] = useState(0);
  const currentBalance = incomeSum - ExpenseSum;

  useFocusEffect(
    useCallback(() => {
     Fetchdata();
     }, [user])
  );

 
  const Fetchdata = async () => {
    const usersCollectionRef = firestore().collection('Users');
    try {
      dispatch(showLoading());
      const userDoc = await usersCollectionRef.doc(user?.uid).get();
      if (userDoc.exists) {
        const userData = userDoc.data();

        //Calculating Income Sum
        const incomeArray = userData.income;
        const i_sum = calculateSum(incomeArray);
        setIncomeSum(i_sum);

        //Calculating Expense Sum
        const expenseArray = userData.expenses;
        const e_sum = calculateSum(expenseArray);
        setExpenseSum(e_sum);

        let copy_income = incomeArray.slice(-2)
        let copy_expense = expenseArray.slice(-1)
        let combine_copies = [...copy_income , ...copy_expense]
        setrecentTransactions(combine_copies)
        console.log('Data loaded successfully');
      } else {
        console.log('User document not found');
        setrecentTransactions([])
        setIncomeSum(0)
        setExpenseSum(0)
      }
    } catch (error) {
      console.error('Error fetching data : =====>>  ', error);
      dispatch(showAlert('Poor internet connection!'))
    } finally {
      dispatch(hideLoading());
    }
  };

  const calculateSum = array => {
    const sum = array.reduce((total, curr) => total + Math.round(curr.amount) , 0);
    return sum;
  };

  const renderListItem = ({item , index}) => {
    let checkIsIncome = IncomeCategories.includes(item?.category)
    const date = moment.unix(item?.transaction_date?.seconds);

    return (
      <View  style={[ styles.list_item,  {backgroundColor: theme ? Colors.BLACK : Colors.WHITE} ]}>
        <View style={styles.flex}>
          <View  style={[ styles.icon_circle,  {backgroundColor: theme ? Colors.BLACK : Colors.WHITE} ]}>
           <Icon category={item?.category} color={Colors.PRIMARY_COLOR} />
          </View>
          <View style={{marginLeft: 10}}>
            <TextComponent text={item?.name ? item?.name : '--'}
              style={[ styles.list_text,  {color: theme ? Colors.WHITE : Colors.BLACK}  ]}  />
            <TextComponent text={date.format('DD/MM/YY')} style={styles.sub_heading} />
          </View>
        </View>
        <TextComponent text={`${checkIsIncome ? '+' : '-' } Rs.${item?.amount}`} style={[styles.expense_text , {color : checkIsIncome ? Colors.PRIMARY_COLOR : Colors.RED}]} />
      </View>
    );
  };

  return (
    <View
      style={[ styles.container,  {backgroundColor: theme ? Colors.BLACK : Colors.WHITE} ]}>
      <ScrollView  refreshControl={  <RefreshControl
            refreshing={refreshing}
            onRefresh={Fetchdata}
            colors={[Colors.PRIMARY_COLOR, Colors.BLACK]}
          /> }>
        <View style={styles.sub_container}>
          <View style={styles.flexA}>
            <View>
              <TextComponent text={'Welcome Back ,'} style={[ styles.sub_heading,  {color: Colors.LLLLGREY, fontSize: Sizes.h7}]}  />
              <TextComponent text={user?.displayName} style={styles.heading} />
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('EditProfile')}>
              <Image source={userProfile ? {uri : userProfile }: Alternate}  style={styles.profile_image}   />
            </TouchableOpacity>
          </View>

          <View style={styles.main_heading}>
            <TextComponent  text={'Current Balance'}  style={[styles.box_span, {color: 'white'}]}  />
            <TextComponent  text={`Rs. ${Intl.NumberFormat('en-IN').format(currentBalance)}`}
              style={[styles.box_heading, {color: currentBalance < 0 ? Colors.RED : 'white', fontSize: 27}]}
            />
          </View>
        </View>

        <View style={styles.cards_view}>
          <View
            style={[  styles.box, {backgroundColor: theme ? Colors.BLACK : Colors.WHITE}]}>
            <MaterialCommunityIcons name="arrow-bottom-left"  color={Colors.PRIMARY_COLOR} size={20}  />
            <View>
              <TextComponent text={'Income'} style={[ styles.box_span, {color: theme ? Colors.WHITE : Colors.BLACK} ]} />
              <View style={styles.flex}>
               <TextComponent text={'Rs. '} style={{color: theme ? Colors.WHITE : Colors.BLACK}} />
              <TextComponent text={`${Intl.NumberFormat('en-IN').format(incomeSum)}`} style={[  styles.box_heading,  {color: theme ? Colors.WHITE : Colors.BLACK}]}  />
              </View>
            </View>
          </View>

          <View  style={[styles.box, {backgroundColor: theme ? Colors.BLACK : Colors.WHITE} ]}>
            <MaterialCommunityIcons name="arrow-top-right"  color={Colors.PRIMARY_COLOR}  size={20}  />
            <View>
              <TextComponent  text={'Expense'} style={[  styles.box_span, {color: theme ? Colors.WHITE : Colors.BLACK} ]}  />
              <View style={styles.flex}>
               <TextComponent text={'Rs. '} style={{color: theme ? Colors.WHITE : Colors.BLACK}} />
              <TextComponent text={`${Intl.NumberFormat('en-IN').format(ExpenseSum)}`} style={[  styles.box_heading,  {color: theme ? Colors.WHITE : Colors.BLACK}]}  />
              </View>
            </View>
          </View>
        </View>

        <View style={[ styles.lower_container, {backgroundColor: theme ? Colors.BLACK : Colors.WHITE} ]}>
          <View style={styles.flexA}>
            <TextComponent
              text={'Recent Transactions'}
              style={[ styles.headingx, {color: theme ? Colors.WHITE : Colors.BLACK}]}  />
            <TouchableOpacity
              onPress={() => navigation.navigate('Transactions')}>
              <TextComponent text={'See all '} style={styles.sub_heading} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={recentTransactions}
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
  },
  sub_container: {
    backgroundColor: Colors.PRIMARY_COLOR,
    padding: 20,
    paddingBottom: 80,
  },
  lower_container: {
    padding: 20,
    marginTop: 60,
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
    alignItems: 'center',
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
    fontSize: Sizes.h3,
    color: 'white',
    fontFamily: Fonts.Medium,
  },
  headingx: {
    color: Colors.BLACK,
    fontSize: Sizes.h4,
    fontFamily: Fonts.SemiBold,
  },
  box: {
    backgroundColor: Colors.WHITE,
    elevation: 5,
    borderRadius: 10,
    paddingVertical: 25,
    paddingHorizontal: 10,
    width: '48%',
    gap: 7,
    marginHorizontal: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  box_span: {
    color: Colors.BLACK,
    fontSize: Sizes.h6,
    fontFamily: Fonts.Regular,
  },
  box_heading: {
    color: Colors.BLACK,
    fontSize: Sizes.h3,
    fontFamily: Fonts.SemiBold,
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
    fontFamily: Fonts.Regular,
  },
  expense_text: {
    color: Colors.PRIMARY_COLOR,
    fontSize: Sizes.h4,
    fontFamily: Fonts.Regular,
  },
  sub_heading: {
    color: Colors.GREY,
    fontSize: Sizes.h6,
    fontFamily: Fonts.Regular,
  },
  list_item: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
});
