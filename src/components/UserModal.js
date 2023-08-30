import {
  View,
  Text,
  Modal,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useContext, useState} from 'react';
import * as Constant from '../utilities/Constant';
import {fetchUser} from '../services/UserServices';
import {AuthContext} from '../navigation/AuthenticationProvider';

const UserModal = ({modalVisibility, handleProfileBackPress}) => {
  const {user, logOut} = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const getUser = async () => {
    const userDetails = await fetchUser(user?.uid);
    setUserEmail(userDetails.userName);
    console.log('userDetails: ', userDetails);
  };
  useEffect(() => {
    getUser();
  });
  const handleProfilePress = () => {
    setShowModal(true);
  };
  const handleBackPress = () => {
    setShowModal(false);
  };
  return (
    <View>
      <Modal
        animationType="slide"
        visible={modalVisibility}
        onRequestClose={handleProfileBackPress}
        transparent={true}>
        <View style={styles.container}>
          <TouchableOpacity onPress={handleProfilePress}>
            <Image
              source={require('../assets/a.png')}
              style={styles.profile_pic}
            />
          </TouchableOpacity>
          <Text style={styles.text}>{userEmail}</Text>
          <Button title="LogOut" onPress={logOut} />
        </View>
      </Modal>
      <Modal
        animationType="slide"
        visible={showModal}
        onRequestClose={handleBackPress}
        transparent={true}>
        <View style={styles.container}>
          <Text>Akshay Shedge</Text>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Constant.margin.medium,
    marginVertical: Constant.margin.modalMargin,
    height: Constant.height.modalHeight,
    width: Constant.width.extralarge,
    backgroundColor: Constant.Color.backgroundColor,
    borderColor: Constant.Color.lightColor,
    borderLeftWidth: Constant.borderWidth.large,
    borderRightWidth: Constant.borderWidth.large,
    borderTopWidth: Constant.borderWidth.extralarge,
    borderBottomWidth: Constant.borderWidth.extralarge,
    borderRadius: Constant.borderRadius.large,
  },
  profile_pic: {
    height: Constant.height.small,
    width: Constant.width.small,
    marginLeft: Constant.margin.medium,
    borderRadius: Constant.borderRadius.large,
  },
  text: {
    padding: Constant.padding.medium,
  },
});

export default UserModal;
