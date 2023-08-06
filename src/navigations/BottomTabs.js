import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Transactions from '../screens/Transactions/Transactions';
import Home from '../screens/Home/Home';
import Analytics from '../screens/Analytics/Analytics';
import MoneyBox from '../screens/Goals/Goals';
import Settings from '../screens/Settings/Settings';
import { Colors } from '../config/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Goals from '../screens/Goals/Goals';
import { useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
    const hideHeader = {headerShown: false}
    const theme = useSelector(state => state.AppReducer.theme)

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
          } else if (route?.name == 'Goals') {
            iconName = 'trending-up-sharp';
          } else if (route?.name == 'Settings') {
            iconName = 'settings-outline';
          }
          return <Ionicons name={iconName} size={23} color={color} />;
        },
        tabBarShowLabel: false ,
        tabBarActiveTintColor: 'white',
        tabBarActiveBackgroundColor: Colors.PRIMARY_COLOR,
        tabBarItemStyle: {borderRadius: 50 , margin: 5},
        tabBarInactiveTintColor: theme ? Colors.LLGREY : Colors.BLACK,
        tabBarStyle: {  backgroundColor: theme ? Colors.BLACK : Colors.WHITE ,
           position: 'absolute', bottom: 25 ,left: 20 , right: 20 ,
            elevation: 3 ,borderRadius: 50 , height: 60 , 
            borderBlockColor: Colors.LLGREY, shadowColor: theme ? Colors.WHITE : Colors.GREY },
      })}
      >

      <Tab.Screen name="Home" component={Home}            options={hideHeader} />
      <Tab.Screen name="Analytics" component={Analytics}  options={hideHeader} />
      <Tab.Screen name="Transactions" component={Transactions}  options={hideHeader} />
      <Tab.Screen name="Goals" component={Goals}    options={hideHeader}/>
      <Tab.Screen name="Settings" component={Settings}    options={hideHeader}/>

      </Tab.Navigator>
  
  );
}