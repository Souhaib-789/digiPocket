import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Transactions from '../screens/Transactions/Transactions';
import Home from '../screens/Home/Home';
import Analytics from '../screens/Analytics/Analytics';
import MoneyBox from '../screens/MoneyBox/MoneyBox';
import Settings from '../screens/Settings/Settings';
import { Colors } from '../config/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons'

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
    const hideHeader = {headerShown: false}

  return (
  
      <Tab.Navigator
      labeled={false}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route?.name == 'Home') {
            iconName = 'home-outline';
          } else if (route?.name == 'Analytics') {
            iconName = 'bar-chart-outline';
          } else if (route?.name == 'Transactions') {
            iconName = 'list-circle-outline';
          } else if (route?.name == 'MoneyBox') {
            iconName = 'gift-outline';
          } else if (route?.name == 'Settings') {
            iconName = 'settings-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarShowLabel: false ,
        tabBarActiveTintColor: Colors.BLACK,
        tabBarInactiveTintColor: 'black',
        tabBarStyle: { paddingTop: 5, backgroundColor: 'white', height: 55, borderTopWidth: 0 },
      })}>

      <Tab.Screen name="Home" component={Home}            options={hideHeader} />
      <Tab.Screen name="Analytics" component={Analytics}  options={hideHeader} />
      <Tab.Screen name="Transactions" component={Transactions}  options={hideHeader} />
      <Tab.Screen name="MoneyBox" component={MoneyBox}    options={hideHeader}/>
      <Tab.Screen name="Settings" component={Settings}    options={hideHeader}/>

      </Tab.Navigator>
  
  );
}