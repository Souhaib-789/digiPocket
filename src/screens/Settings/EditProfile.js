import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../config/Colors';
import Alternate from '../../assets/alternate.jpg';
import Bubbles from '../../assets/bubbles.png';
import TextComponent from '../../components/TextComponent';
import { Sizes } from '../../config/Sizes';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImageUploader from '../../components/ImageUploader';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Fonts } from '../../config/Fonts';
import { hideLoading, showAlert, showLoading } from '../../redux/actions/AppAction';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';


const EditProfile = () => {
  const [image, setimage] = useState(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userProfile = auth().currentUser.photoURL;

  const theme = useSelector(state => state.AppReducer.theme)
  const user = useSelector(state => state.AuthReducer.userInfo)

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
      uploadPhotoToStorage(imgObject?.uri)
    } ,'photo')
  };

  const uploadPhotoToStorage = async (img) => {
    
    let filename = img?.substring(img.lastIndexOf('/') + 1);

    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    let filenamex = name + Date.now() + '.' + extension;

    const storageRef = storage().ref(`photos/${filenamex}`);
    try {
      dispatch(showLoading())
      await storageRef.putFile(img);
      const downloadUrl = await storageRef.getDownloadURL();
      // console.log('---- URLLLLL -----------' , downloadUrl);
      handleUpdateProfileURL(downloadUrl)
    } catch (error) {
      // console.error('Error uploading photo: ', error);
      dispatch(hideLoading())
      return null;
    }
  };


  const handleUpdateProfileURL = async (url) => {
    try {
      const user = auth().currentUser;
      if (user) {
        await user.updateProfile({
          photoURL: url,
        });
        dispatch(showAlert('Profile Photo Updated !'))
      }
    } catch (error) {
      console.error('Error updating profile: ', error);
      dispatch(showAlert('Something went wrong'))
    } finally {
      dispatch(hideLoading())
      navigation.goBack()
    }
  };


  return (
    <View style={[styles.container, { backgroundColor: theme ? Colors.BLACK : Colors.WHITE }]}>
      <View style={styles.flex}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign size={23} color={theme ? Colors.WHITE : Colors.BLACK} name="arrowleft" />
        </TouchableOpacity>
        <TextComponent text={'Edit Profile'} style={styles.heading} />
      </View>
      <Image source={Bubbles} style={styles.bubbles} />

      <View style={styles.sub_container}>
        <Image
          source={image?.uri ? { uri: image?.uri } : userProfile ? {uri : userProfile } : Alternate}
          style={styles.image}
        />
        <TouchableOpacity style={[styles.pick_icon,
        { backgroundColor: theme ? Colors.BLACK : Colors.WHITE, shadowColor: theme ? Colors.LLGREY : Colors.BLACK }]} onPress={openImagePicker}>
          <Ionicons
            name="camera-outline"
            color={Colors.PRIMARY_COLOR}
            size={20}
          />
        </TouchableOpacity>
        <TextComponent text={user?.displayName} style={styles.sub_heading} />
        <TextComponent text={user?.email} style={styles.span} />
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
    fontFamily: Fonts.SemiBold,
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
