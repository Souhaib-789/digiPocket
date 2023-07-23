import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import AppStack from './AppStack';


export default function Navigation() {
    return (
      <NavigationContainer>
      {/* <AuthStack /> */}
      <AppStack />
      </NavigationContainer>
    );
  }