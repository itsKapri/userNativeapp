import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Entry from './Page/Entry';
import Home from './Page/Home';
import Map from './Page/Map';
import registerNNPushToken from 'native-notify';
const Stack=createNativeStackNavigator();

export default function App() {

  registerNNPushToken(12443, 'MMz84LRDrV9b81cJTQmRtr');
  return (
    <NavigationContainer>
      <Stack.Navigator
       screenOptions={{headerShown:false}}>
         <Stack.Screen
        name='Welcome'
          component={Entry}
        />
        <Stack.Screen
        name='home'
          component={Home}
        />
        <Stack.Screen
        name='Map'
        component={Map}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
