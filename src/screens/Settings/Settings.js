import React, {useState} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Colors} from '../../config/Colors';
import TextComponent from '../../components/TextComponent';
import {Sizes} from '../../config/Sizes';
import Feather from 'react-native-vector-icons/Feather';
import {Switch} from 'react-native-switch';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import Alternate from '../../assets/alternate.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme, showAlert, showLoading } from '../../redux/actions/AppAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Logout } from '../../redux/actions/AuthActions';
import { Fonts } from '../../config/Fonts';

const Settings = () => {
  const navigation = useNavigation();
  const theme = useSelector(state => state.AppReducer.theme)
  const user = useSelector(state => state.AuthReducer.userInfo)

  const [Value, setValue] = useState(theme);
  const dispatch = useDispatch()

  const options = [
    {
      icon: <Feather name={'info'} color={theme ? Colors.WHITE : Colors.BLACK} size={20} />,
      name: 'About',
      // onPress:
    },
    {
      icon: <Feather name={'help-circle'} color={theme ? Colors.WHITE : Colors.BLACK} size={20} />,
      name: 'Help',
      // onPress:
    },
    {
      icon: <Feather name={'globe'} color={theme ? Colors.WHITE : Colors.BLACK} size={20} />,
      name: 'Language',
      extraData: 'English'
      // onPress:
    },
    {
      icon: <MaterialIcons name={'logout'} color={Colors.RED} size={20} />,
      name: 'Logout',
      dZ: true,
      onPress:  () => {
        try {
            dispatch(Logout())
             AsyncStorage.clear();
          dispatch(showAlert('Logged out!'))
        } catch (e) {
            console.log(e);
        }
    }
    },
  ];

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity style={styles.option} onPress={item?.onPress}>
        <View style={styles.flex}>
          {item?.icon}
          <TextComponent text={item?.name} style={[styles.text , {color: item?.dZ ? Colors.RED : theme ? Colors.WHITE : Colors.BLACK}]} />
        </View>
        <View style={styles.flex}>
        {item?.extraData && <TextComponent text={item?.extraData} style={styles.textx} /> } 
        {!item?.dZ ? <MaterialIcons name="arrow-forward-ios" color={Colors.GREY} size={15} /> : null }
        </View>
      </TouchableOpacity>
    );
  };

 
  const onChangeTheme = (e) =>  {
  setValue(e);
  dispatch(setTheme(e))
  }

  return (
    <View style={[styles.container , {backgroundColor: theme ? Colors.BLACK : Colors.WHITE}]}>
      
        <TextComponent text={'Settings'} style={[styles.heading , {color: theme ? Colors.WHITE : Colors.BLACK }]} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={()=> navigation.navigate('EditProfile')}
        style={[styles.flex, {justifyContent: 'space-between'}]}>
          <View style={styles.flex}>
            <Image source={Alternate} style={styles.image} />
            <View>
              <TextComponent text={user?.displayName} style={styles.sub_heading} />
              <TextComponent text={'Edit Profile'} style={styles.span} />
            </View>
          </View>

          <MaterialIcons
            name="arrow-forward-ios"
            color={Colors.GREY}
            size={18}
          />
        </TouchableOpacity>

        <TextComponent
          text={'Theme'}
          style={[styles.text, {marginTop: 30, marginBottom: 10}]}
        />
        <View style={[styles.flex, {marginBottom: 40}]}>
          <View style={styles.flex}>
            <MaterialIcons name='light-mode' color={!Value ? Colors.PRIMARY_COLOR : Colors.BLACK} size={20} />
          <TextComponent text={'Light'} style={{color: !Value ? Colors.PRIMARY_COLOR : Colors.BLACK }} />
          </View>

          <Switch
            value={Value}
            onValueChange={(e) => onChangeTheme(e)}
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

<View style={styles.flex}>
            <MaterialIcons name='dark-mode' color={ Value ? Colors.PRIMARY_COLOR : Colors.BLACK} size={20} />
          <TextComponent text={'Dark'} style={{color: Value ? Colors.PRIMARY_COLOR : Colors.BLACK}} />
          </View>

        </View>

        <FlatList
          data={options}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    padding: 20,
  },
  heading: {
    fontSize: Sizes.h3,
    marginBottom: 20
  },
  sub_heading: {
    fontFamily: Fonts.SemiBold,
    fontSize: Sizes.h4,
  },
  span: {
    color: Colors.LLGREY,
    fontSize: Sizes.h6,
  },
  text: {
    fontSize: Sizes.h5,
  },
  textx:{
    color: Colors.LLGREY,
    fontSize: Sizes.h6
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
});
