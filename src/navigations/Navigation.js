import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { Loader } from '../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { userExist, userInfo } from '../redux/actions/AuthActions';
import { Snackbar } from 'react-native-paper';
import { Colors } from '../config/Colors';
import { hideAlert } from '../redux/actions/AppAction';
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function Navigation() {

  const dispatch = useDispatch();
  const theme = useSelector(state => state.AppReducer.theme)

  //global state user existed or not (boolean)
  const userExistence = useSelector(state => state.AuthReducer.userExist)

  //global state to show and hide loading (boolean)
  const loading = useSelector(state => state.AppReducer.loading)

  //global state for alert (boolean)
  const showAlert = useSelector(state => state.AppReducer.showAlert)
  //alert state that holds alert message (string)
  const alertMessage = useSelector(state => state.AppReducer.alertMessage)


  React.useEffect(() => {
    checkAuthentication();
  }, [userExistence])


  const checkAuthentication = async () => {
    setTimeout(async () => {
      let user_data = await AsyncStorage.getItem('@user')
      if (user_data != null) {
        dispatch(userExist(true))
        const userdata = JSON.parse(user_data)
        // console.log('====================>>>>>>>>>>>', userdata);
        dispatch(userInfo(userdata))
      } else {
        dispatch(userExist(false))
      }
    }, 1000);
  }

    return (
      <SafeAreaProvider>
      <NavigationContainer>
        {
          userExistence ?
          <AppStack />
          :    <AuthStack /> 
        }
 
     
      <Loader visible={loading} />

      <Snackbar
        duration={3000}
        style={{ backgroundColor: theme ? Colors.PRIMARY_COLOR : Colors.BLACK }}
        visible={showAlert}
        onDismiss={() => dispatch(hideAlert())}
      >
        {alertMessage}
      </Snackbar>

      </NavigationContainer>
      </SafeAreaProvider>
    );
  }