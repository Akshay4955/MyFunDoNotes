import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import AppDrawer from './AppDrawer';
import CreateNote from '../screens/CreateNote';

const Stack = createStackNavigator();
const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="AppDrawer" component={AppDrawer} />
      <Stack.Screen name="CreateNote" component={CreateNote} />
    </Stack.Navigator>
  );
};

export default AppStack;
