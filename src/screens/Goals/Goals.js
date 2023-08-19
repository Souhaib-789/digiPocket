import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, View,  FlatList, ScrollView,ImageBackground, TouchableOpacity , RefreshControl} from 'react-native';
import {Colors} from '../../config/Colors';
import {Sizes} from '../../config/Sizes';
import TextComponent from '../../components/TextComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Switch} from 'react-native-switch';
import * as Progress from 'react-native-progress';
import { useNavigation , useFocusEffect} from '@react-navigation/native';
import { ListEmptyComponent } from '../../components/ListEmptyComponent';
import { useDispatch, useSelector } from 'react-redux';
import { Fonts } from '../../config/Fonts';
import firestore from '@react-native-firebase/firestore';
import { hideLoading, showAlert, showLoading } from '../../redux/actions/AppAction';
import Icon from '../../components/Icon';

const Goals = () => {

  const navigation = useNavigation()
  const dispatch = useDispatch();

  const theme = useSelector(state => state.AppReducer.theme)
  const userID = useSelector(state => state.AuthReducer.userInfo.uid);
  const [refreshing, setRefreshing] = useState(false);

  const [allGoalsLength, setallGoalsLength] = useState(0);
  const [Value, setValue] = useState(false);
  const [currGoals, setcurrGoals] = useState([]);
  const [achievedGoals, setachievedGoals] = useState([]);

  

  useFocusEffect(
    useCallback(() => {
     getAllGoals();
     }, [userID])
  );

  const getAllGoals = async () => {
    const usersCollectionRef = firestore().collection('Users');
    try {
      dispatch(showLoading());
      const userDoc = await usersCollectionRef.doc(userID).get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        const goalsArray = userData.goals || [];
        setallGoalsLength(goalsArray?.length)

        let achievedGoalsArray = goalsArray.filter(item => item?.status == 'achieved')
        setachievedGoals(achievedGoalsArray)
        
        let currGoalsArray = goalsArray.filter(item => item?.status == 'unachieved')
        setcurrGoals(currGoalsArray);
      } else {
        console.log('User document not found');
        return [];
      }
    } catch (error) {
      console.error('Error fetching user expenses: ', error);
      dispatch(showAlert('Something went wrong'))
      return [];
    }
    finally{
      dispatch(hideLoading())
  }
  };

  const renderListItem = ({item}) => {

    const normalizedValue = item?.collected_amount / item?.amount; 
    const scaledValue = 0.1 + normalizedValue * (0.9 - 0.1); 

    return (
      <TouchableOpacity style={styles.list_item} onPress={()=> navigation.navigate('AddGoal' , {item: item })}>
        <View style={styles.flex}>
          <Icon category={item?.category} color={theme? Colors.WHITE : Colors.BLACK} />
          <View style={{gap: 8 , width: '88%'}}>
            <View style={styles.flexA}>
            <TextComponent text={item?.name} style={[styles.list_text , {color: theme ? Colors.WHITE : Colors.BLACK}]} />
            <TextComponent text={`Rs.${Intl.NumberFormat('en-US').format(item?.amount)}`} style={[styles.expense_text , {color : theme ? Colors.WHITE : Colors.BLACK  }]} />
            </View>

            <Progress.Bar
              progress={item?.collected_amount ? scaledValue.toFixed(1) : 0}
              height={5}
              width={200}
              animated={true}
              useNativeDriver={true}
              color={Colors.PRIMARY_COLOR}
              borderWidth={1}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderAchievedListItem = ({item , index}) => {

    const scaledValue = (item?.amount - item?.amount / 2 ) / (item?.amount - 0) * (0.1 - 0.9) + 0.1;

    return (
      <TouchableOpacity style={styles.list_item} onPress={()=> navigation.navigate('AddGoal' , {item: item ,index: index, Type : 'achieved'})}>
        <View style={styles.flex}>
          <Icon category={item?.category} color={Colors.BLACK} />
          <View style={{gap: 8 , width: '88%'}}>
            <View style={styles.flexA}>
            <TextComponent text={item?.name} style={[styles.list_text , {color: theme ? Colors.WHITE : Colors.BLACK}]} />
            <TextComponent text={`Rs.${Intl.NumberFormat('en-US').format(item?.amount)}`} style={[styles.expense_text , {color : theme ? Colors.WHITE : Colors.BLACK  }]} />
            </View>

          
            <Progress.Bar
              progress={1}
              height={5}
              width={200}
              animated={true}
              useNativeDriver={true}
              color={Colors.PRIMARY_COLOR}
              borderWidth={1}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container , {backgroundColor: theme ? Colors.BLACK : Colors.WHITE}]}>

      <TextComponent text={'Goals'} style={styles.heading} />

      <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getAllGoals} colors={[Colors.PRIMARY_COLOR , Colors.BLACK]} />}>
        <View style={[styles.box, {backgroundColor : theme ? Colors.BLACK : Colors.WHITE}]}>
          <Ionicons
            name="checkmark-done-circle"
            color={Colors.PRIMARY_COLOR}
            size={30}
          />
          <View>
            <TextComponent text={'Goals Achieved'} style={[styles.box_span , {color: theme ? Colors.WHITE : Colors.BLACK}]} />
            <TextComponent text={`${achievedGoals?.length}/${allGoalsLength}`} style={[styles.box_heading , {color: theme ? Colors.WHITE : Colors.BLACK}]} />
          </View>
        </View>

        <View style={styles.flex}>
          <TextComponent text={'Show Achieved Goals'} style={[styles.box_span , {color: theme ? Colors.WHITE : Colors.BLACK}]} />

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

        <TextComponent text={'Current Goals'} style={[styles.sub_heading, { color: theme ? Colors.WHITE: Colors.BLACK}]} />
        <FlatList
          data={currGoals}
          renderItem={renderListItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={ListEmptyComponent}
        />

        {Value && (
          <>
            <TextComponent text={'Achieved Goals'} style={[styles.sub_heading, { color: theme ? Colors.WHITE: Colors.BLACK}]} />
            <FlatList
              data={achievedGoals}
              renderItem={renderAchievedListItem}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={ListEmptyComponent}
            />
          </>
        )}

      </ScrollView>
      <TouchableOpacity style={styles.add_button} onPress={()=> navigation.navigate('AddGoal')}>
  <Ionicons name={'add'} color={Colors.WHITE} size={25} />
</TouchableOpacity>

    </View>
  );
};

export default Goals;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 80,
  },
  heading: {
    fontSize: Sizes.h3,
  },
  box: {
    elevation: 5,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
    width: '50%',
    gap: 12,
    marginVertical: 20,
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  box_span: {
    fontSize: Sizes.h6,
  },
  box_heading: {
    fontSize: Sizes.h3,
  fontFamily: Fonts.SemiBold
  },
  flex: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
  },
  flexA:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  list_text: {
    fontSize: Sizes.h5,
  },
  expense_text: {
    color: Colors.BLACK,
    fontSize: Sizes.h5,
    fontFamily: Fonts.SemiBold
  },
  sub_heading: {
    fontSize: Sizes.h5,
  fontFamily: Fonts.SemiBold,
    marginTop: 30,
    marginBottom: 5,
  },
  list_item: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    backgroundColor: Colors.RGBA2,
    padding: 15,
    borderRadius: 5,
  },
  add_button:{
    backgroundColor: Colors.PRIMARY_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
 width: 50,
 height: 50,
 position: 'absolute',
 bottom: 100,
 right: 20
  }
});
