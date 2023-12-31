import { Alert } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const ImageUploader = (callback, mediaType = 'any', multiple = false,) => {

    Alert.alert(
        'Options',
        'Select one option to continue',
        [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Camera',
                style: 'default',
                onPress: async () => {
                    try {
                        var image = await ImagePicker.openCamera({
                            multiple: false,
                            width: 200,
                            height: 200,
                            mediaType: mediaType
                        });

                        if (image || image.length > 0) {
                            callback(image);
                        }
                    } catch (error) {
                        console.log(error);
                        // Alert.alert('Error while uploading image');
                    }
                },
            },
            {
                text: 'Library',
                style: 'default',
                onPress: async () => {
                    try {
                        var image = await ImagePicker.openPicker({
                            mediaType: mediaType,
                            multiple: multiple,
                            width: 200,
                            height: 200,
                            cropping: true
                        });
                        if (image || image.length > 0) {
                            callback(image);
                        }
                        // else {
                        //   Alert.alert({
                        //     text: 'Image is not selected',
                        //   });
                        // }
                    } catch (error) {
                        console.log('err ==', error);
                        // Alert.alert('Error while uploading image');
                    }
                },
            },
        ],
        { cancelable: true },
    );
};

export default ImageUploader;