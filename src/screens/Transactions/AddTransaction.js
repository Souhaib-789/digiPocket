import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity, ScrollView} from 'react-native';
import {Colors} from '../../config/Colors';
import TextComponent from '../../components/TextComponent';
import {Sizes} from '../../config/Sizes';
import Input from '../../components/Input';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {Switch} from 'react-native-switch';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SelectDropdown from 'react-native-select-dropdown';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {Modal} from '../../components/Modal';
import {useDispatch, useSelector} from 'react-redux';
import {Fonts} from '../../config/Fonts';
import {
  hideLoading,
  showAlert,
  showLoading,
} from '../../redux/actions/AppAction';
import firestore from '@react-native-firebase/firestore';

const AddTransaction = props => {
  const routeData = props?.route?.params?.item;
  const Transtype = props?.route?.params?.type;
  const purpose = props?.route?.params?.purpose;
  const theme = useSelector(state => state.AppReducer.theme);
  const userID = useSelector(state => state.AuthReducer.userInfo.uid);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [name, setname] = useState(routeData?.name);
  const [amount, setamount] = useState(routeData?.amount);
  const [type, settype] = useState('Expense');
  const [category, setcategory] = useState(routeData?.category);
  const [TransactionDate, setTransactionDate] = useState(routeData?.transaction_date);
  const [description, setdescription] = useState(routeData?.description);
  const transactionid = Math.random().toString().substring(2, 8);
  const [date, setDate] = useState(new Date());
  const [openModal, setOpenModal] = useState(false);
  const [Value, setValue] = useState(Transtype == 'Income' ? true : false);
  const [openSuccesModal, setopenSuccesModal] = useState(false);
  
  const IncomeCategories = ['Salary', 'Awards', 'Profit', 'Grants', 'Refunds'];
  const ExpenseCategories = [
    'Food',
    'Education',
    'Shopping',
    'Travel',
    'Bills',
    'Sport',
    'Gift',
    'Fuel',
    'Rent',
    'Medical',
  ];

  const onPressAddExpense = async () => {
    if (!name) {
      dispatch(showAlert('Enter transaction name'));
    } else if (!amount) {
      dispatch(showAlert('Enter amount!'));
    } else if (!TransactionDate) {
      dispatch(showAlert('Select date!'));
    } else if (!category) {
      dispatch(showAlert('Select category!'));
    } else {
      dispatch(showLoading());
      let newExpenses = {
        id: transactionid,
        name: name,
        amount: amount,
        transaction_date: TransactionDate,
        category: category,
        description: description ? description : null,
      };
      const usersCollectionRef = firestore().collection('Users');
      // The arrayUnion method will ensure that the new expenses are appended to the "expenses" array in the document, and any duplicate expenses will not be added again.
      await usersCollectionRef
        .doc(userID)
        .update({
          expenses: firestore.FieldValue.arrayUnion(newExpenses),
        })
        .then(() => {
          setopenSuccesModal(true);
        })
        .catch(error => {
          console.log('Something went wrong with order posting', error);
          dispatch(showAlert('something went wrong'));
        })
        .finally(() => {
          dispatch(hideLoading());
        });
    }
  };

  const onPressAddIncome = async () => {
    if (!name) {
      dispatch(showAlert('Enter transaction name'));
    } else if (!amount) {
      dispatch(showAlert('Enter amount!'));
    } else if (!TransactionDate) {
      dispatch(showAlert('Select date!'));
    } else if (!category) {
      dispatch(showAlert('Select category!'));
    } else {
      dispatch(showLoading());
      let newExpenses = {
        id: transactionid,
        name: name,
        amount: amount,
        transaction_date: TransactionDate,
        category: category,
        description: description ? description : null,
      };
      const usersCollectionRef = firestore().collection('Users');
      // The arrayUnion method will ensure that the new expenses are appended to the "expenses" array in the document, and any duplicate expenses will not be added again.
      await usersCollectionRef
        .doc(userID)
        .update({
          income: firestore.FieldValue.arrayUnion(newExpenses),
        })
        .then(() => {
          setopenSuccesModal(true);
        })
        .catch(error => {
          console.log('Something went wrong with order posting', error);
          dispatch(showAlert('Network Error'));
        })
        .finally(() => {
          dispatch(hideLoading());
        });
    }
  };

  const onPressUpdateTransaction = async () => {
    const usersCollectionRef = firestore().collection('Users');
    try {
      dispatch(showLoading())
      const userDoc = await usersCollectionRef.doc(userID).get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        let expensesArray = userData.expenses || [];
  
        // Find the index of the expense to update
        const expenseIndex = expensesArray.findIndex(e => e.id == routeData?.id);
        if (expenseIndex !== -1) {
          // Update the specific expense object
          expensesArray[expenseIndex] = {
            id: routeData?.id,
            name: name,
            amount: amount,
            transaction_date: TransactionDate,
            category: category ,
            description: description ,
          };
  
          // Update the entire "expenses" array in Firestore
          await usersCollectionRef.doc(userID).update({
            expenses: expensesArray,
          });
        }
         else {
          console.log('Expense not found in the array');
          dispatch(hideLoading())
        }
      } else {
        console.log('User document not found');
        dispatch(showAlert('something went wrong'));
      }
    } catch (error) {
      console.error('Error updating expense: ', error);
    } finally {
      dispatch(hideLoading())
      navigation.goBack()
    }
  };
  
  const onPressUpdateIncome = async () => {
    const usersCollectionRef = firestore().collection('Users');
    try {
      dispatch(showLoading())
      const userDoc = await usersCollectionRef.doc(userID).get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        let incomeArray = userData.income || [];
  
        // Find the index of the income to update
        const incomeIndex = incomeArray.findIndex(e => e.id == routeData?.id);
        if (incomeIndex !== -1) {
          // Update the specific income object
          incomeArray[incomeIndex] = {
            id: routeData?.id,
            name: name,
            amount: amount,
            transaction_date: TransactionDate,
            category: category ,
            description: description ,
          };
          // Update the entire "incomes" array in Firestore
          await usersCollectionRef.doc(userID).update({
            income: incomeArray,
          });
        }
         else {
          console.log('Income not found in the array');
          dispatch(hideLoading())
        }
      }
       else {
        console.log('User document not found');
        dispatch(showAlert('something went wrong'));
      }
    } catch (error) {
      console.error('Error updating income: ', error);
    } 
    finally {
      dispatch(hideLoading())
      navigation.goBack()
    }}

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: theme ? Colors.BLACK : Colors.WHITE},
      ]}>
      <View style={[styles.flex, {marginBottom: 40, gap: 12}]}>
        {purpose ? null : (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign
              size={23}
              color={theme ? Colors.WHITE : Colors.BLACK}
              name="arrowleft"
            />
          </TouchableOpacity>
        )}

        <TextComponent
          text={purpose ? 'Edit Transaction' : 'Add New Transaction'}
          style={styles.heading}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={[
            styles.flex,
            {justifyContent: 'space-around', marginBottom: 20, marginTop: 10},
          ]}>
          <View style={styles.flex}>
            <MaterialCommunityIcons
              size={20}
              color={!Value ? Colors.PRIMARY_COLOR : Colors.GREY}
              name="arrow-top-right-thin-circle-outline"
            />
            <TextComponent
              text={'Expense'}
              style={{
                color: !Value ? Colors.PRIMARY_COLOR : Colors.GREY,
                fontFamily: !Value ? Fonts.SemiBold : Fonts.Regular,
              }}
            />
          </View>

          <Switch
            value={Value}
            disabled={purpose ? true : false}
            onValueChange={val => {
              setValue(val), settype(val ? 'Income' : 'Expense');
            }}
            circleSize={30}
            barHeight={22}
            circleBorderWidth={3}
            backgroundActive={Colors.PRIMARY_COLOR}
            backgroundInactive={Colors.PRIMARY_COLOR}
            circleActiveColor={Colors.WHITE}
            renderActiveText={false}
            renderInActiveText={false}
          />

          <View style={styles.flex}>
            <MaterialCommunityIcons
              size={20}
              color={Value ? Colors.PRIMARY_COLOR : Colors.GREY}
              name="arrow-bottom-left-thin-circle-outline"
            />
            <TextComponent
              text={'Income'}
              style={{
                color: Value ? Colors.PRIMARY_COLOR : Colors.GREY,
                fontWeight: Value ? 'bold' : 'normal',
              }}
            />
          </View>
        </View>

        <Input
          label={'Name'}
          value={name}
          onChangeText={e => setname(e)}
          placeholder={'i.e : College Fees'}
        />

        <Input
          label={'Amount'}
          value={amount}
          onChangeText={e => setamount(e)}
          keyboardType={'phone-pad'}
          placeholder={'Rs. 10000'}
          maxLength={7}
        />

        <Input
          label={'Date'}
          value={ TransactionDate && moment(TransactionDate).format('DD MMM YYYY') }
          onChangeText={e => setTransactionDate(e)}
          placeholder={'select date'}
          rightIcon={ <AntDesign name="calendar" size={20} color={Colors.GREY} /> }
          editable={false}
          onPressRightIcon={() => setOpenModal(true)}
        />

        <SelectDropdown
          data={Value ? IncomeCategories : ExpenseCategories}
          buttonStyle={styles.dropdown}
          onSelect={(selectedItem, index) => {
            setcategory(selectedItem);
          }}
          defaultButtonText={
            routeData?.category ? routeData?.category : 'Select category'
          }
          buttonTextStyle={{
            fontSize: Sizes.h5,
            color: theme ? Colors.WHITE : Colors.BLACK,
            fontFamily: Fonts.Regular,
          }}
          search
          renderDropdownIcon={() => (
            <MaterialIcons
              name="keyboard-arrow-down"
              size={18}
              color={theme ? Colors.WHITE : Colors.BLACK}
            />
          )}
          renderSearchInputLeftIcon={() => (
            <AntDesign name="search1" color={Colors.GREY} size={20} />
          )}
          searchPlaceHolder="Search category"
          showsVerticalScrollIndicator={false}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return <TextComponent text={item} style={{fontSize: Sizes.h5}} />;
          }}
          searchInputStyle={{
            borderBottomColor: Colors.LLGREY,
            borderBottomWidth: 1,
            backgroundColor: theme ? Colors.BLACK : Colors.WHITE,
          }}
          selectedRowTextStyle={{
            color: Colors.PRIMARY_COLOR,
            fontFamily: Fonts.Regular,
          }}
          dropdownStyle={{
            borderRadius: 10,
            backgroundColor: theme ? Colors.BLACK : Colors.WHITE,
            borderWidth: 1,
            borderColor: Colors.GREY,
          }}
        />

        <Input
          label={'Description'}
          value={description}
          multiline={true}
          onChangeText={e => setdescription(e)}
          style={{lineHeight: 25}}
        />

        <Button
          title={purpose ? 'Save' : 'Add'}
          onPress={
            purpose ? ( Transtype == 'Income' ? onPressUpdateIncome : onPressUpdateTransaction)
              : type == 'Income'
              ? onPressAddIncome
              : onPressAddExpense
          }
          style={{marginTop: 40}}
        />

        {purpose ? (
          <Button
            title={'Cancel'}
            onPress={() => navigation.goBack()}
            style={{
              marginTop: 10,
              borderColor: Colors.PRIMARY_COLOR,
              borderWidth: 1,
              backgroundColor: theme ? Colors.BLACK : Colors.WHITE,
            }}
            textStyle={{color: Colors.PRIMARY_COLOR}}
          />
        ) : null}
      </ScrollView>

      <DatePicker
        modal
        mode="date"
        open={openModal}
        date={date}
        theme={theme ? 'dark' : 'light'}
        onConfirm={date => {
          setOpenModal(false);
          setTransactionDate(date);
        }}
        onCancel={() => {
          setOpenModal(false);
        }}
      />

      <Modal
        visible={openSuccesModal}
        Ok={true}
        onPressOK={() => {
          setopenSuccesModal(false), navigation.goBack();
        }}
        title={'Transaction Added !'}
        text={'Your transaction has been added successfully.'}
        image={require('../../assets/ok.png')}
      />
    </View>
  );
};

export default AddTransaction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: Sizes.h3,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  dropdown: {
    width: '70%',
    marginVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.LLGREY,
    borderRadius: 8,
    backgroundColor: 'transparent',
    fontSize: Sizes.h5,
  },
});
