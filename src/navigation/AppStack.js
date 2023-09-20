import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import AppDrawer from './AppDrawer';
import CreateNote from '../screens/CreateNote';
import LabelSelect from '../screens/LabelSelect';
import SearchNotes from '../screens/SearchNotes';

const Stack = createStackNavigator();
const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="AppDrawer" component={AppDrawer} />
      <Stack.Screen name="CreateNote" component={CreateNote} />
      <Stack.Screen name="LabelSelect" component={LabelSelect} />
      <Stack.Screen name="SearchNotes" component={SearchNotes} />
    </Stack.Navigator>
  );
};

export default AppStack;
