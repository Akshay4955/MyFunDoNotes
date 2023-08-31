import {View, Text, Button} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import GlobalStyleSheet from '../utilities/GlobalStyleSheet';
import NotesHeader from '../components/NotesHeader';
import NotesFooter from '../components/NotesFooter';
import {AuthContext} from '../navigation/AuthenticationProvider';
import UserModal from '../components/UserModal';

const Notes = ({navigation}) => {
  const {logOut} = useContext(AuthContext);
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
    </View>
  );
};

export default Notes;
