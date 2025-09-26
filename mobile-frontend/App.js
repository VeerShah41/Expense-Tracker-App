// all required imports 

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
// Removed unused imports


// all required imports for todo app => ( components )
import Home from './src/screens/tabs/Home';
import AddExpences from './src/screens/tabs/AddExpense';
import Visualize from './src/screens/tabs/Visualize'; 
import SettingsScreen from './src/screens/SettingScreen';
import Profile from './src/screens/Profile';

const tab = createBottomTabNavigator();
const drawer = createDrawerNavigator();
// app builder function
function MyTabs() {
  return (
    <tab.Navigator>
      <tab.Screen name="All Expenses" component={Home} />
      <tab.Screen name="Entry Expenses" component={AddExpences} />
      <tab.Screen name="Visualize" component={Visualize} />
    </tab.Navigator>
  );

}


export default function App() {
  return (
    <NavigationContainer>
      
      <drawer.Navigator>
        <drawer.Screen name="Expense Tracker" component={MyTabs} />
        
        <drawer.Screen name="Profile" component={Profile} />
        <drawer.Screen name="Settings" component={SettingsScreen} />
      </drawer.Navigator>
    </NavigationContainer>
  );
}
