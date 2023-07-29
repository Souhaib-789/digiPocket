import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
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
import { useNavigation } from '@react-navigation/native';

const AddTransaction = () => {

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
  const [openDropdown, setopenDropdown] = useState(false);

  const IncomeCategories = ['Salary', 'Awards', 'Profit', 'Grants', 'Refunds'];
  const ExpenseCategories = [ 'Food','Education', 'Shopping', 'Travel', 'Bills','Sport', 'Gift', 'Fuel', 'Rent',];

  const onPressAddTransaction = () => {};

  return (
    <View style={styles.container}>
      <View style={[styles.flex, { marginBottom: 40 , gap: 12}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
      <AntDesign  size={23} color={Colors.BLACK} name="arrowleft"/>
      </TouchableOpacity>
      <TextComponent text={'Add New Transaction'} style={styles.heading} />
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
                fontWeight: !Value ? 'bold' : 'normal',
              }}
            />
          </View>

          <Switch
            value={Value}
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
          buttonTextStyle={{fontSize: Sizes.h5, color: Colors.BLACK}}
          search
          renderDropdownIcon={() => (
            <MaterialIcons
              name="keyboard-arrow-down"
              size={18}
              color={Colors.BLACK}
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
            backgroundColor: Colors.WHITE,
          }}
          selectedRowTextStyle={{color: Colors.PRIMARY_COLOR}}
          dropdownStyle={{
            borderRadius: 10,
            backgroundColor: Colors.WHITE,
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
          title={'Add'}
          onPress={onPressAddTransaction}
          style={{marginTop: 80}}
        />
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
    </View>
  );
};

export default AddTransaction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    padding: 20,
  },
  heading: {
    color: Colors.BLACK,
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