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
import { useDispatch, useSelector } from 'react-redux';
import { Fonts } from '../../config/Fonts';
import { showAlert, showLoading } from '../../redux/actions/AppAction';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


const EditProfile = () => {
  const [image, setimage] = useState(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const theme = useSelector(state => state.AppReducer.theme)
  const user = useSelector(state => state.AuthReducer.userInfo)
  const userID = useSelector(state => state.AuthReducer.userInfo?.uid)

  console.log('----------------', user?.photoURL);
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
      uploadPhotoToStorage()
    });
  };

//   const onPressSave = async () => {
//     if (!image) {
//         dispatch(showAlert('File Not supported!'))
//     } else {
//         dispatch(showLoading())
//         const uploadUri = image ? image?.uri : null;
//         let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

//         // Add timestamp to File Name
//         const extension = filename.split('.').pop();
//         const name = filename.split('.').slice(0, -1).join('.');
//         let filenamex = name + Date.now() + '.' + extension;
//         // console.log('============= filename ==================',filenamex)
//         const storageRef = storage().ref(`photos/${filenamex}`);
//         // console.log('=========== storageRef ==================',storageRef)
//         await storageRef.putFile(uploadUri);

//         try {
//             const url = await storage().ref(`photos/${filenamex}`).getDownloadURL();
//             dispatch(AlertAction.HideLoading())
//             await firestore()
//                 .collection('Users')
//                 .doc(USER.uid)
//                 .update({
//                     userImg: url ? url : routeData?.img,
//                     city: location ? location : routeData?.city,
//                     phoneno: phone ? phone : routeData?.phone,
//                 });
//             dispatch(AlertAction.showAlert('Profile Updated Successfully!'))
//             navigation.goBack();
//         } catch (e) {
//             console.log(e.message);
//             dispatch(AlertAction.HideLoading())
//             return null;
//         }
//     }
// };

const uploadPhotoToStorage = async () => {
  // let filename = name + Date.now() + '.' + extension;
  const storageRef = storage().ref(`photos/${userID}`);
  try {
    await storageRef.putFile(image?.uri);
    const downloadUrl = await storageRef.getDownloadURL();
    console.log(downloadUrl);
  } catch (error) {
    console.error('Error uploading photo: ', error);
    return null;
  }
};






const handleUpdateProfile = async () => {
  try {
    const user = auth().currentUser;
    if (user) {
      await user.updateProfile({
        photoURL: image?.uri,
      });
      alert('Success', 'Profile updated successfully');
    }
  } catch (error) {
    console.error('Error updating profile: ', error);
    alert('Error', 'Failed to update profile');
  }
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
