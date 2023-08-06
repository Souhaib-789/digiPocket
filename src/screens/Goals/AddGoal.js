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
import {Switch} from 'react-native-switch';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SelectDropdown from 'react-native-select-dropdown';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import { Modal } from '../../components/Modal';
import { useSelector } from 'react-redux';
import { Fonts } from '../../config/Fonts';

const AddGoal = () => {
  const navigation = useNavigation();
  const [name, setname] = useState(null);
  const [amount, setamount] = useState(null);
  const [collectedAmount, setcollectedAmount] = useState(null);
  const [category, setcategory] = useState(null);
  const [description, setdescription] = useState(null);
  const [Value, setValue] = useState(false);
  const [openModal, setopenModal] = useState(false);

  const theme = useSelector(state => state.AppReducer.theme)


  const GoalCategories = [
    'Vehicle',
    'Education',
    'Clothing',
    'Travel',
    'Wedding',
    'Gift',
    'House',
    'Mobile Phone',
  ];

  const onPressAddGoal = () => {
    setopenModal(true)
  };

  return (
    <View style={[styles.container , {backgroundColor: theme ? Colors.BLACK : Colors.WHITE}]}>
      <View style={[styles.flex, {marginBottom: 40, gap: 12}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign size={23} color={theme ? Colors.WHITE : Colors.BLACK} name="arrowleft" />
        </TouchableOpacity>
        <TextComponent text={'Add New Goal'} style={[styles.heading ]} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Input
          label={'Name'}
          value={name}
          onChangeText={e => setname(e)}
          placeholder={'i.e : Car'}
        />

        <Input
          label={'Amount'}
          value={amount}
          onChangeText={e => setamount(e)}
          keyboardType={'phone-pad'}
          placeholder={'Rs. 10000'}
        />

        <SelectDropdown
          data={GoalCategories}
          buttonStyle={styles.dropdown}
          onSelect={(selectedItem, index) => {
            setcategory(selectedItem);
          }}
          defaultButtonText="Select category"
          buttonTextStyle={{fontSize: Sizes.h5, color: theme ? Colors.WHITE : Colors.BLACK , fontFamily: Fonts.Regular}}
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
            backgroundColor: theme ? Colors.BLACK: Colors.WHITE,
          }}
          selectedRowTextStyle={{color: Colors.PRIMARY_COLOR}}
          dropdownStyle={{
            borderRadius: 10,
            backgroundColor: theme ? Colors.BLACK: Colors.WHITE,
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

        <View style={[styles.flex , {marginVertical: 15}]}>
          <TextComponent text={'Add Progress'} style={styles.box_span} />

          <Switch
            value={Value}
            onValueChange={val => {
              setValue(val);
            }}
            circleSize={23}
            barHeight={15}
            circleBorderWidth={2}
            backgroundActive={Colors.RGBA}
            backgroundInactive={Colors.LLGREY}
            circleActiveColor={Colors.PRIMARY_COLOR}
            circleBorderActiveColor={Colors.PRIMARY_COLOR}
            renderActiveText={false}
            renderInActiveText={false}
          />
        </View>

        {Value && (
          <Input
            label={'Collected Amount'}
            value={collectedAmount}
            onChangeText={e => setcollectedAmount(e)}
            keyboardType={'phone-pad'}
          />
        )}

        <Button
          title={'Add it'}
          onPress={onPressAddGoal}
          style={{marginTop: 80}}
        />
      </ScrollView>

      <Modal 
      visible={openModal} 
      Ok={true} 
      onPressOK={()=> {setopenModal(false) , navigation.goBack()}}
      title={'Goal Added !'} 
      text={'Your goal has been added successfully.'}
      image={require('../../assets/done.png')} />
    </View>
  );
};

export default AddGoal;

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
    gap: 10,
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
