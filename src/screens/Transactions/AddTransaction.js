import React, {useState} from 'react';
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
import { useSelector } from 'react-redux';
import { Fonts } from '../../config/Fonts';

const AddTransaction = props => {
  const routeData = props?.route?.params?.item;
  const purpose = props?.route?.params?.purpose;

  const theme = useSelector(state => state.AppReducer.theme)
  const navigation = useNavigation();
  const [name, setname] = useState(null);
  const [amount, setamount] = useState(null);
  const [type, settype] = useState('Expense');
  const [category, setcategory] = useState(null);
  const [TransactionDate, setTransactionDate] = useState(null);
  const [description, setdescription] = useState(null);

  const [date, setDate] = useState(new Date());
  const [openModal, setOpenModal] = useState(false);
  const [Value, setValue] = useState(false);
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
  ];

  const onPressAddTransaction = () => {
    setopenSuccesModal(true);
  };

  const onPressEditTransaction = () => {};
  return (
    <View style={[styles.container  , {backgroundColor: theme ? Colors.BLACK :Colors.WHITE}]}>
      <View style={[styles.flex, {marginBottom: 40, gap: 12}]}>
        {purpose ? null : (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign size={23} color={theme ? Colors.WHITE : Colors.BLACK} name="arrowleft" />
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
        />

        <Input
          label={'Date'}
          value={
            TransactionDate && moment(TransactionDate).format('DD MMM YYYY')
          }
          onChangeText={e => setTransactionDate(e)}
          placeholder={'select date'}
          rightIcon={
            <AntDesign name="calendar" size={20} color={Colors.GREY} />
          }
          editable={false}
          onPressRightIcon={() => setOpenModal(true)}
        />

        <SelectDropdown
          data={Value ? IncomeCategories : ExpenseCategories}
          buttonStyle={styles.dropdown}
          onSelect={(selectedItem, index) => {
            setcategory(selectedItem);
          }}
          defaultButtonText="Select category"
          buttonTextStyle={{fontSize: Sizes.h5, color:theme ? Colors.WHITE : Colors.BLACK,  fontFamily: Fonts.Regular}}
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
            return <TextComponent text={item} style={{fontSize: Sizes.h5 }} />;
          }}
          searchInputStyle={{
            borderBottomColor: Colors.LLGREY,
            borderBottomWidth: 1,
            backgroundColor: theme ? Colors.BLACK: Colors.WHITE,
          }}
          selectedRowTextStyle={{color: Colors.PRIMARY_COLOR,  fontFamily: Fonts.Regular}}
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
          onPress={purpose ? onPressEditTransaction : onPressAddTransaction}
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
              backgroundColor: Colors.WHITE
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
        // theme='dark'
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
