import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Colors} from '../../config/Colors';
import Corner from '../../assets/tri.png';
import TextComponent from '../../components/TextComponent';
import Octicons from 'react-native-vector-icons/Octicons';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {Sizes} from '../../config/Sizes';
import {useDispatch, useSelector} from 'react-redux';
import {
  hideLoading,
  showAlert,
  showLoading,
} from '../../redux/actions/AppAction';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Fonts } from '../../config/Fonts';

const Signup = () => {
  const navigation = useNavigation();
  const theme = useSelector(state => state.AppReducer.theme)
  const dispatch = useDispatch();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setconfirmPassword] = useState();
  const [hidePassword, sethidePassword] = useState(true);
  const [hideConfirmPassword, sethideConfirmPassword] = useState(true);

  const onPressSignup =   () => {
    if (!name) {
      dispatch(showAlert('Please enter your name'));
    }
    else if (!email) {
      dispatch(showAlert('Please enter email address'));
    }
    else if (!password) {
      dispatch(showAlert('Please enter password'));
    }
    else if (!confirmPassword) {
      dispatch(showAlert('Please confirm your entered password'));
    } else if (password !== confirmPassword) {
      dispatch(showAlert('Confirm password does not match'));
    } else {
      dispatch(showLoading());

       auth()
        .createUserWithEmailAndPassword(email, confirmPassword)
        .then(() => {
          dispatch(showAlert('Your account has been created !'));
          console.log('User account created !');

          firestore()
            .collection('Users')
            .doc(auth().currentUser.uid)
            .set({
              name: name,
              email: email,
              createdAt: firestore.Timestamp.fromDate(new Date()),
              userImg: null,
            });

           navigation.navigate('Login');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            dispatch(showAlert('That email address is already in use!'));
          }
          if (error.code === 'auth/invalid-email') {
            dispatch(showAlert('That email address is invalid!'));
          }
          console.error(error);
        })
        .finally(dispatch(hideLoading()));
    }
  };

  return (
    <View style={[styles.container , {backgroundColor: theme ? Colors.BLACK : Colors.WHITE}]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={Corner} style={styles.image} />

        <View style={styles.ScrollView}>
          <TextComponent text={'Create an account'} style={styles.heading} />

          <Input label={'Name'} value={name} onChangeText={e => setName(e)} />

          <Input
            label={'Email'}
            value={email}
            onChangeText={e => setEmail(e)}
          />

          <Input
            label={'Password'}
            value={password}
            onChangeText={e => setPassword(e)}
            rightIcon={
              <Octicons
                color={Colors.LLGREY}
                size={20}
                name={hidePassword ? 'eye-closed' : 'eye'}
              />
            }
            secureTextEntry={hidePassword}
            onPressRightIcon={() => sethidePassword(!hidePassword)}
          />

          <Input
            label={'Confirm Password'}
            value={confirmPassword}
            onChangeText={e => setconfirmPassword(e)}
            rightIcon={
              <Octicons
                color={Colors.LLGREY}
                size={20}
                name={hideConfirmPassword ? 'eye-closed' : 'eye'}
              />
            }
            secureTextEntry={hideConfirmPassword}
            onPressRightIcon={() =>
              sethideConfirmPassword(!hideConfirmPassword)
            }
          />

          <Button
            title={'Sign up'}
            onPress={onPressSignup}
            style={styles.button}
          />

          <View style={styles.flex}>
            <TextComponent
              text={'Already have an account ?'}
              style={styles.link}
            />
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <TextComponent
                text={' Sign in'}
                style={[styles.link, {fontFamily: Fonts.SemiBold}]}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  image: {
    width: 500,
    height: 230,
  },
  ScrollView: {
    padding: 20,
  },
  heading: {
    fontSize: 25,
    fontFamily: Fonts.SemiBold,
    marginBottom: 15,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  button: {
    width: '55%',
    alignSelf: 'flex-end',
    marginVertical: 25,
  },
  link: {
    fontSize: Sizes.h5,
    color: 'grey',
  },
});
