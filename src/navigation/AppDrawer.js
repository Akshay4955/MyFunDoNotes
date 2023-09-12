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
import CustomDrawer from '../components/CustomDrawer';

const Drawer = createDrawerNavigator();

const AppDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
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
      <Drawer.Screen name="Notes" component={Notes} />
      <Drawer.Screen name="Reminders" component={Reminders} />
      <Drawer.Screen name="Create New Label" component={CreateNewLabel} />
      <Drawer.Screen name="Archive" component={Archive} />
      <Drawer.Screen name="Deleted" component={Deleted} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="Help & Feedback" component={HelpAndFeedback} />
    </Drawer.Navigator>
  );
};

export default AppDrawer;
