import {View, Text, Button} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import GlobalStyleSheet from '../utilities/GlobalStyleSheet';
import NotesHeader from '../components/NotesHeader';
import NotesFooter from '../components/NotesFooter';
import {AuthContext} from '../navigation/AuthenticationProvider';
import {fetchUser} from '../services/UserServices';
import UserModal from '../components/UserModal';

const Notes = ({navigation}) => {
  const {user, logOut} = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const styles = GlobalStyleSheet();
  const handleMenuPress = () => {
    navigation.openDrawer();
  };
  const handleProfilePress = () => {
    setShowModal(true);
  };
  const handleProfileBackPress = () => {
    setShowModal(false);
  };
  const getUser = async () => {
    const userDetails = await fetchUser(user?.uid);
    console.log('userDetails: ', userDetails);
  };
  useEffect(() => {
    getUser();
  });
  return (
    <View style={styles.screen_container}>
      <NotesHeader
        handleMenuPress={handleMenuPress}
        handleProfilePress={handleProfilePress}
      />
      <UserModal
        modalVisibility={showModal}
        handleProfileBackPress={handleProfileBackPress}></UserModal>
      <Text style={{flex: 1}}></Text>
      <NotesFooter navigation={navigation} />
      <Button title="LogOut" onPress={logOut} />
    </View>
  );
};

export default Notes;
