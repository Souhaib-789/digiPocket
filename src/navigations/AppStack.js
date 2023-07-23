import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home/Home';
import Analytics from '../screens/Analytics/Analytics';
import MoneyBox from '../screens/MoneyBox/MoneyBox';
import Settings from '../screens/Settings/Settings';
import Transactions from '../screens/Transactions/Transactions';
import BottomTabs from './BottomTabs';

const Stack = createNativeStackNavigator();

export default function AppStack() {

    const hideHeader = {headerShown: false}
    
    return (
        <Stack.Navigator>
           <Stack.Screen name="BottomTabs" component={BottomTabs}  options={hideHeader} />
          <Stack.Screen name="Transactions" component={Transactions}  options={hideHeader} />
          <Stack.Screen name="Settings" component={Settings}    options={hideHeader}/>
        </Stack.Navigator>
    );
  }