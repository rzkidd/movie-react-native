/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import HomeScreen from './src/screen/home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailScreen from './src/screen/detail';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false, tabBarStyle: {backgroundColor: '#090A0E', borderTopWidth: 0}}}>
      <Tab.Screen 
        name='Home' 
        component={HomeScreen} 
        options={{ 
          tabBarIcon: ()=> {
            return (
              <MaterialIcon.Button 
                name='home' 
                iconStyle={{ marginRight: 0 }} 
                backgroundColor='rgba(0,0,0,0)'
                size={30}
              />
            );
          },
          tabBarShowLabel: false
        }}
      />
      <Tab.Screen 
        name='Login' 
        component={DetailScreen}
        options={{ 
          tabBarIcon: ()=> {
            return (
              <MaterialIcon.Button 
                name='explore' 
                iconStyle={{ marginRight: 0 }} 
                backgroundColor='rgba(0,0,0,0)'
                size={30}
              />
            );
          },
          tabBarShowLabel: false
        }}
      />
      <Tab.Screen 
        name='Detail' 
        component={DetailScreen}
        options={{ 
          tabBarIcon: ()=> {
            return (
              <FontAwesomeIcon.Button 
                name='user' 
                iconStyle={{ marginRight: 0 }} 
                backgroundColor='rgba(0,0,0,0)'
                size={30}
              />
            );
          },
          tabBarShowLabel: false
        }}
      />
    </Tab.Navigator>
  );
}

const App = ()=> {
  return (
    <NavigationContainer>
      <MyTabs/>
    </NavigationContainer>
  )
}

export default App;
