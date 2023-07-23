import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login/Login';
import Signup from '../screens/Signup/Signup';
import IntroSlider from '../screens/IntroSlider/IntroSlider';

const Stack = createNativeStackNavigator();

export default function AuthStack() {

  const hideHeader = {headerShown: false}

    return (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login}  options={hideHeader}/>
          <Stack.Screen name="Signup" component={Signup} options={hideHeader}/>
          <Stack.Screen name="IntroSlider" component={IntroSlider}  options={hideHeader}/>
        </Stack.Navigator>
    );
  }