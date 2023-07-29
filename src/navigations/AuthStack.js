import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Authentication/Login';
import Signup from '../screens/Authentication/Signup';
import IntroSlider from '../screens/IntroSlider/IntroSlider';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  const hideHeader = {headerShown: false};

  return (
    <Stack.Navigator>
      <Stack.Screen name="IntroSlider" component={IntroSlider} options={hideHeader} />
      <Stack.Screen name="Login" component={Login} options={hideHeader} />
      <Stack.Screen name="Signup" component={Signup} options={hideHeader} />
    </Stack.Navigator>
  );
}
