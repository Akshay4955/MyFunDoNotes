import {View, Text, Button} from 'react-native';
import React, {useContext, useEffect} from 'react';
import GlobalStyleSheet from '../utilities/GlobalStyleSheet';
import NotesHeader from '../components/NotesHeader';
import NotesFooter from '../components/NotesFooter';
import {AuthContext} from '../navigation/AuthenticationProvider';
import {fetchUser} from '../services/UserServices';

const Notes = ({navigation}) => {
  const {user, logOut} = useContext(AuthContext);
  const styles = GlobalStyleSheet();
  const onPressHandler = () => {
    navigation.openDrawer();
  };
  const getUser = async () => {
    const userDetails = await fetchUser(user.uid);
    console.log('userDetails: ', userDetails);
  };
  useEffect(() => {
    getUser();
  });
  return (
    <View style={styles.screen_container}>
      <NotesHeader onPressHandler={onPressHandler} />
      <Text style={{flex: 1}}></Text>
      <NotesFooter navigation={navigation} />
      <Button title="LogOut" onPress={logOut} />
    </View>
  );
};

export default Notes;
