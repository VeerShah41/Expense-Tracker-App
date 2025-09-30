import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Home from './src/screens/tabs/Home';
import AddExpences from './src/screens/tabs/AddExpense';
import Visualize from './src/screens/tabs/Visualize'; 
import SettingsScreen from './src/screens/SettingScreen';
import Profile from './src/screens/Profile';


import { ExpenseProvider } from "./src/storage/ExpenseContext";


const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();


function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#D8A47F',
        tabBarInactiveTintColor: '#B0A18A',
        tabBarStyle: { backgroundColor: '#FFF8F0' },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={Home} 
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="home" size={size} color={color} solid />
        }}
      />
      <Tab.Screen 
        name="Transactions" 
        component={AddExpences} 
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="plus-circle" size={size} color={color} solid />
        }}
      />
      <Tab.Screen 
        name="Visualize" 
        component={Visualize} 
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="chart-line" size={size} color={color} solid />
        }}
      />
    </Tab.Navigator>
  );
}

// Drawer without route checks
export default function App() {
  return (
    <ExpenseProvider>
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerActiveTintColor: '#D8A47F',
          drawerInactiveTintColor: '#B0A18A',
          drawerStyle: { backgroundColor: '#FFF8F0' },
        }}
      >
        <Drawer.Screen 
          name="Expense Tracker" 
          component={MyTabs} 
          options={{
            drawerIcon: ({ color, size }) => <Icon name="money-bill" size={size} color={color} solid />
          }}
        />
        <Drawer.Screen 
          name="Profile" 
          component={Profile} 
          options={{
            drawerIcon: ({ color, size }) => <Icon name="user" size={size} color={color} solid />
          }}
        />
        <Drawer.Screen 
          name="Settings" 
          component={SettingsScreen} 
          options={{
            drawerIcon: ({ color, size }) => <Icon name="cog" size={size} color={color} solid />
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
    </ExpenseProvider>
  );
}
