import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Colors} from '../../config/Colors';
import Alternate from '../../assets/alternate.jpg';
import Bubbles from '../../assets/bubbles.png';
import TextComponent from '../../components/TextComponent';
import {Sizes} from '../../config/Sizes';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImageUploader from '../../components/ImageUploader';
import {useNavigation} from '@react-navigation/native';
import { useSelector } from 'react-redux';


const EditProfile = () => {
  const [image, setimage] = useState(null);
  const navigation = useNavigation();
  const theme = useSelector(state => state.AppReducer.theme)

  const openImagePicker = () => {
    ImageUploader(e => {
      let image = e?.path?.split('/');
      let imgObject = {
        name: image[image?.length - 1],
        uri: e?.path,
        size: e?.size,
        type: e?.mime,
      };
      setimage(imgObject);
    });
  };

  return (
    <View style={[styles.container , {backgroundColor: theme ? Colors.BLACK : Colors.WHITE}]}>
      <View style={styles.flex}>
        <TouchableOpacity onPress={()=> navigation.goBack()}>
          <AntDesign size={23} color={theme ? Colors.WHITE : Colors.BLACK} name="arrowleft" />
        </TouchableOpacity>
        <TextComponent text={'Edit Profile'} style={styles.heading} />
      </View>
      <Image source={Bubbles} style={styles.bubbles} />

      <View style={styles.sub_container}>
        <Image
          source={image?.uri ? {uri: image?.uri} : Alternate}
          style={styles.image}
        />
        <TouchableOpacity style={[styles.pick_icon , 
    {backgroundColor: theme ? Colors.BLACK : Colors.WHITE , shadowColor: theme ? Colors.LLGREY : Colors.BLACK}]} onPress={openImagePicker}>
          <Ionicons
            name="camera-outline"
            color={Colors.PRIMARY_COLOR}
            size={20}
          />
        </TouchableOpacity>
        <TextComponent text={'M. Souhaib'} style={styles.sub_heading} />
        <TextComponent text={'souhaib@gmail.com'} style={styles.span} />
      </View>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: Sizes.h3,
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: Colors.PRIMARY_COLOR,
  },
  sub_heading: {
    fontWeight: 'bold',
    fontSize: Sizes.h2,
    marginTop: 15,
    marginBottom: 5,
  },
  span: {
    color: Colors.GREY,
  },
  bubbles: {
    position: 'absolute',
    top: 10,
    right: -2,
    width: 150,
    height: 150,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    margin: 20,
  },
  sub_container: {
    alignItems: 'center',
    marginTop: 150,
  },
  pick_icon: {
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    padding: 8,
    position: 'absolute',
    right: 120,
    top: 100,
  },
});
