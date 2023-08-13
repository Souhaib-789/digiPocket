import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Colors } from '../../config/Colors';
import TextComponent from '../../components/TextComponent';
import { Sizes } from '../../config/Sizes';
import Input from '../../components/Input';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Switch } from 'react-native-switch';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SelectDropdown from 'react-native-select-dropdown';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { Modal } from '../../components/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { Fonts } from '../../config/Fonts';
import { hideLoading, showAlert, showLoading } from '../../redux/actions/AppAction';
import firestore from '@react-native-firebase/firestore';

const AddGoal = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const routeData = props?.route?.params?.item;
  const ItemType = props?.route?.params?.Type;
  const ItemIndex = props?.route?.params?.index;


  const [name, setname] = useState(routeData?.name);
  const [amount, setamount] = useState(routeData?.amount);
  const [collectedAmount, setcollectedAmount] = useState(routeData?.collected_amount ? routeData?.collected_amount : 0);
  const [category, setcategory] = useState(routeData?.category);
  const [description, setdescription] = useState(routeData?.description ? routeData?.description : null);
  const [Value, setValue] = useState(false);
  const [openModal, setopenModal] = useState(false);

  const theme = useSelector(state => state.AppReducer.theme)
  const goalID = Math.random().toString().substring(2, 6);
  const userID = useSelector(state => state.AuthReducer.userInfo.uid);


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

  const onPressAddGoal = async () => {
    if (!name) {
      dispatch(showAlert('Enter goal name'));
    } else if (!amount) {
      dispatch(showAlert('Enter amount!'));
    } else if (!category) {
      dispatch(showAlert('Select category!'));
    } else {
      dispatch(showLoading());
      let newGoal = {
        id: goalID,
        name: name,
        amount: amount,
        collected_amount: collectedAmount,
        category: category,
        status: 'unachieved',
        description: description,
      };
      const usersCollectionRef = firestore().collection('Users');
      await usersCollectionRef
        .doc(userID)
        .update({
          goals: firestore.FieldValue.arrayUnion(newGoal),
        })
        .then(() => {
          setopenModal(true);
        })
        .catch(error => {
          console.log('Something went wrong with adding goal', error);
          dispatch(showAlert('something went wrong'));
        })
        .finally(() => {
          dispatch(hideLoading());
        });
    }
  };

  const onPressUpdateGoal = async () => {
    if (collectedAmount > amount) {
      dispatch(showAlert('Collected amount should be greater than or equal to total amount !'))
    } else {
      const usersCollectionRef = firestore().collection('Users');
      try {
        dispatch(showLoading())
        const userDoc = await usersCollectionRef.doc(userID).get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          let goalsArray = userData.goals || [];
          const goalIndex = goalsArray.findIndex(e => e.id == routeData?.id);
          if (goalIndex !== -1) {
            goalsArray[goalIndex] = {
              id: routeData?.id,
              name: name,
              amount: amount,
              category: category,
              description: description,
              status: collectedAmount == amount ? 'achieved' : 'unachieved',
              collected_amount: collectedAmount
            };

            await usersCollectionRef.doc(userID).update({
              goals: goalsArray,
            });
            if(amount == collectedAmount){
              dispatch(showAlert('Congratulations !! You achieved this goal'))
            }
          }
          else {
            console.log('goal not found in the array');
            dispatch(hideLoading())
          }
        }
        else {
          console.log('User document not found');
          dispatch(showAlert('something went wrong'));
        }
      } catch (error) {
        console.error('Error updating goal: ', error);
      }
      finally {
        dispatch(hideLoading())
        navigation.goBack()
      }
    }
  }

  const onPressDeleteGoal = async () => {
    const usersCollectionRef = firestore().collection('Users');

    try {
      dispatch(showLoading())
      const userDoc = await usersCollectionRef.doc(userID).get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        const GoalsArray = userData.goals || [];
        let achievedGoals = GoalsArray?.filter(item => item?.status == 'achieved')
        achievedGoals.splice(ItemIndex, 1);

        await usersCollectionRef.doc(userID).update({
          goals: achievedGoals,
        });

        await dispatch(showAlert('Goal deleted!'))
      } else {
        dispatch(showAlert('Something went wrong while deleting this goal'))
      }
      navigation.goBack()
    } catch (error) {
      console.error('Error deleting goal by index: ', error);
      dispatch(showAlert('Something went wrong'))
    } finally {
      dispatch(hideLoading())
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme ? Colors.BLACK : Colors.WHITE }]}>
      <View style={[styles.flex, { marginBottom: 40, gap: 12 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign size={23} color={theme ? Colors.WHITE : Colors.BLACK} name="arrowleft" />
        </TouchableOpacity>
        <TextComponent text={routeData ? routeData?.name : 'Add New Goal'} style={[styles.heading]} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Input
          label={'Name'}
          value={name}
          onChangeText={e => setname(e)}
          placeholder={'i.e : Car'}
          editable={routeData ? false : true}
        />

        <Input
          label={'Amount'}
          value={amount}
          onChangeText={e => setamount(e)}
          keyboardType={'phone-pad'}
          placeholder={'Rs. 10000'}
          editable={routeData ? false : true}

        />

        <SelectDropdown
          data={GoalCategories}
          disabled={routeData ? true : false}
          buttonStyle={styles.dropdown}
          onSelect={(selectedItem, index) => {
            setcategory(selectedItem);
          }}
          defaultButtonText={routeData?.category ? routeData?.category : "Select category"}
          buttonTextStyle={{ fontSize: Sizes.h5, color: theme ? Colors.WHITE : Colors.BLACK, fontFamily: Fonts.Regular }}
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
            return <TextComponent text={item} style={{ fontSize: Sizes.h5 }} />;
          }}
          searchInputStyle={{
            borderBottomColor: Colors.LLGREY,
            borderBottomWidth: 1,
            backgroundColor: theme ? Colors.BLACK : Colors.WHITE,
          }}
          selectedRowTextStyle={{ color: Colors.PRIMARY_COLOR }}
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
          style={{ lineHeight: 25 }}
          editable={routeData ? false : true}

        />

        {
          !ItemType ?

            <View style={[styles.flex, { marginVertical: 15 }]}>
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
            : null
        }


        {Value && (
          <Input
            label={'Collected Amount'}
            value={collectedAmount}
            onChangeText={e => setcollectedAmount(e)}
            keyboardType={'phone-pad'}
          />
        )}

        {
          !ItemType ?
            <Button
              title={routeData ? 'Save' : 'Add it'}
              onPress={routeData ? onPressUpdateGoal : onPressAddGoal}
              style={{ marginTop: 80 }}
            />
            : null}

        {ItemType ? (
          <Button
            title={'Delete'}
            onPress={onPressDeleteGoal}
            style={{
              marginTop: 10,
              borderColor: Colors.RED,
              borderWidth: 1,
              backgroundColor: Colors.WHITE,
            }}
            textStyle={{ color: Colors.RED }}
          />
        ) : (
          <Button
            title={'Make it complete'}
            onPress={() => setopenPopper(true)}
            style={{
              marginTop: 10,
              borderColor: Colors.PRIMARY_COLOR,
              borderWidth: 1,
              backgroundColor: Colors.WHITE,
            }}
            textStyle={{ color: Colors.PRIMARY_COLOR }}
          />
        )}

      </ScrollView>

      <Modal
        visible={openModal}
        Ok={true}
        onPressOK={() => { setopenModal(false), navigation.goBack() }}
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
