import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { Loader } from '../components/Loader';


export default function Navigation() {
    return (
      <NavigationContainer>
      {/* <AuthStack /> */}
      <AppStack />
      {/* <Loader /> */}
      </NavigationContainer>
    );
  }