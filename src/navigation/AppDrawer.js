import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Notes from '../screens/Notes';
import Reminders from '../screens/Reminders';
import CreateNewLabel from '../screens/CreateNewLabel';
import Archive from '../screens/Archive';
import Deleted from '../screens/Deleted';
import HelpAndFeedback from '../screens/HelpAndFeedback';
import Settings from '../screens/Settings';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import * as Constant from '../utilities/Constant';
import IonIcon from 'react-native-vector-icons/Ionicons';

const Drawer = createDrawerNavigator();

const AppDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Notes"
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: Constant.Color.mediumColor,
        },
        drawerActiveBackgroundColor: Constant.Color.activeBackgorundColor,
        drawerActiveTintColor: Constant.Color.activeTintColor,
        drawerInactiveBackgroundColor: Constant.Color.mediumColor,
        drawerInactiveTintColor: Constant.Color.inActiveTintColor,
      }}>
      <Drawer.Screen
        name="Notes"
        component={Notes}
        options={{
          drawerIcon: focused => (
            <AntIcon
              name="bulb1"
              size={25}
              color={
                focused
                  ? Constant.Color.activeTintColor
                  : Constant.Color.inActiveTintColor
              }
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Reminders"
        component={Reminders}
        options={{
          drawerIcon: focused => (
            <AntIcon
              name="bells"
              size={25}
              color={
                focused
                  ? Constant.Color.activeTintColor
                  : Constant.Color.inActiveTintColor
              }
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Create New Label"
        component={CreateNewLabel}
        options={{
          drawerIcon: focused => (
            <AntIcon
              name="plus"
              size={25}
              color={
                focused
                  ? Constant.Color.activeTintColor
                  : Constant.Color.inActiveTintColor
              }
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Archive"
        component={Archive}
        options={{
          drawerIcon: focused => (
            <FoundationIcon
              name="archive"
              size={25}
              color={
                focused
                  ? Constant.Color.activeTintColor
                  : Constant.Color.inActiveTintColor
              }
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Deleted"
        component={Deleted}
        options={{
          drawerIcon: focused => (
            <AntIcon
              name="delete"
              size={25}
              color={
                focused
                  ? Constant.Color.activeTintColor
                  : Constant.Color.inActiveTintColor
              }
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerIcon: focused => (
            <AntIcon
              name="setting"
              size={25}
              color={
                focused
                  ? Constant.Color.activeTintColor
                  : Constant.Color.inActiveTintColor
              }
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Help & Feedback"
        component={HelpAndFeedback}
        options={{
          drawerIcon: focused => (
            <IonIcon
              name="help-circle"
              size={25}
              color={
                focused
                  ? Constant.Color.activeTintColor
                  : Constant.Color.inActiveTintColor
              }
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default AppDrawer;
