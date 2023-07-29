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

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [hidePassword, sethidePassword] = useState(true);

  const onPressLogin = () => {};

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={Corner} style={styles.image} />

        <View style={styles.ScrollView}>
          <TextComponent text={'Sign in'} style={styles.heading} />
                                           
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

          <Button
            title={'Sign in'}
            onPress={onPressLogin}
            style={styles.button}
          />

          <View style={styles.flex}>
            <TextComponent
              text={"Don't have an account ?"}
              style={styles.link}
            />
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <TextComponent text={' Create Now'} style={[styles.link , {fontWeight: 'bold'}]} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;

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
    color: Colors.BLACK,
    fontSize: 27,
    fontWeight: 'bold',
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
    marginVertical: 30
  },
  link: {
    fontSize: Sizes.h5,
    color: 'grey',
  },
});
