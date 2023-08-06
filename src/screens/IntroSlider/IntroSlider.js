import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Colors} from '../../config/Colors';
import AppIntroSlider from 'react-native-app-intro-slider';
import Image1 from '../../assets/onboard1.png';
import Image2 from '../../assets/onboard2.png';
import Image3 from '../../assets/onboard3.png';
import Image4 from '../../assets/onboard4.png';
import TextComponent from '../../components/TextComponent';
import {Sizes} from '../../config/Sizes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import { useSelector } from 'react-redux';

const IntroSlider = () => {
  const navigation = useNavigation();
  const theme = useSelector(state => state.AppReducer.theme)
  const slides = [
    {
      key: 1,
      title: 'Welcome to Digi Pocket',
      text: 'Manage and organize your finances wisely',
      image: Image1,
    },
    {
      key: 2,
      title: 'Track your expenses',
      text: 'See what you are spending , where you can save and track your expenses like never before',
      image: Image2,
    },
    {
      key: 3,
      title: 'Save your money',
      text: 'Build healthy financial habits. Control unnecessary expenses.',
      image: Image3,
    },
    {
      key: 4,
      title: 'Setup your goals',
      text: 'Build your financial life. Make the right financial decisions. Plan only what is important for you.',
      image: Image4,
    },
  ];

  const renderItem = ({item}) => {
    return (
      <View style={[styles.main_container , { backgroundColor:theme ? Colors.BLACK : Colors.WHITE }]}>
        <View style={{flex: 1}}>
          <Image source={item?.image} style={styles.image} />
        </View>
        <View style={styles.bottom_container}>
          <TextComponent text={item?.title} style={styles.heading} />
          <TextComponent text={item?.text} style={styles.text} />
        </View>
      </View>
    );
  };

  return (
    <AppIntroSlider
      data={slides}
      renderItem={renderItem}
      showDoneButton={true}
      showNextButton={true}
      nextLabel={<Ionicons  color={Colors.WHITE} name={'arrow-forward-circle'} size={30} />}
      onDone={() => navigation.navigate('Login')}
    />
  );
};

export default IntroSlider;

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  image: {
    width: 250,
    height: 250,
    alignSelf: 'center',
    marginTop: 150,
  },
  heading: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: Sizes.h1,
  },
  text: {
    textAlign: 'center',
    color: 'white',
    lineHeight: 20,
    fontSize: Sizes.h6,
  },
  bottom_container: {
    backgroundColor: Colors.PRIMARY_COLOR,
    height: 230,
    padding: 30,
    gap: 7,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: 'center',
  },
  button: {
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
