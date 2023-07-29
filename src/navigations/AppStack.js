import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Settings from '../screens/Settings/Settings';
import Transactions from '../screens/Transactions/Transactions';
import BottomTabs from './BottomTabs';
import AddTransaction from '../screens/Transactions/AddTransaction';
import AddGoal from '../screens/Goals/AddGoal';

const Stack = createNativeStackNavigator();

export default function AppStack() {

    const hideHeader = {headerShown: false}
    
    return (
        <Stack.Navigator>
           <Stack.Screen name="BottomTabs" component={BottomTabs}  options={hideHeader} />
          <Stack.Screen name="Transactions" component={Transactions}  options={hideHeader} />
          <Stack.Screen name="AddTransaction" component={AddTransaction}  options={hideHeader} />
          <Stack.Screen name="AddGoal" component={AddGoal}  options={hideHeader} />
          <Stack.Screen name="Settings" component={Settings}    options={hideHeader}/>
        </Stack.Navigator>
    );
  }