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
import {fetchUser, updateUser} from '../services/UserServices';
import {AuthContext} from '../navigation/AuthenticationProvider';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import UserModal2 from './UserModal2';
import {useSelector} from 'react-redux';

const UserModal = ({modalVisibility, handleProfileBackPress}) => {
  const {user, logOut} = useContext(AuthContext);
  const theme = useSelector(state => state.ThemeReducer);
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState({});
  const getUser = async () => {
    const userDetails = await fetchUser(user?.uid);
    setUserData(userDetails);
  };
  useEffect(() => {
    getUser();
  }, [user, modalVisibility]);
  const handleProfilePress = () => {
    setShowModal(true);
  };
  const handleBackPress = () => {
    setShowModal(false);
  };
  const pickImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      submitImage(image.path);
    });
  };
  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      submitImage(image.path);
    });
  };
  const submitImage = async imagePath => {
    const imageUrl = imagePath;
    const fileName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
    try {
      const reference = storage().ref(fileName);
      await reference.putFile(imageUrl);
      const downloadURL = await reference.getDownloadURL();
      updateUser(user?.uid, downloadURL);
    } catch (error) {
      console.log(error);
    }
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
      backgroundColor:
        theme === 'DARK'
          ? Constant.Color.backgroundColor
          : Constant.Color.whiteColor,
    },
    profile_pic: {
      height: Constant.height.profilePic,
      width: Constant.width.small,
      marginLeft: Constant.margin.medium,
      borderRadius: Constant.borderRadius.extralarge,
    },
    text: {
      padding: Constant.padding.medium,
      fontSize: Constant.fontSize.small,
      fontWeight: '300',
      color:
        theme === 'DARK'
          ? Constant.Color.whiteColor
          : Constant.Color.backgroundColor,
    },
  });
  return (
    <View>
      <Modal
        animationType="slide"
        visible={modalVisibility}
        onRequestClose={handleProfileBackPress}
        transparent={true}>
        <View style={styles.container}>
          <TouchableOpacity onPress={handleProfilePress}>
            {user?.photoURL ? (
              <Image
                source={{uri: user?.photoURL}}
                style={styles.profile_pic}
              />
            ) : (
              <Image
                source={
                  userData?.profilePic
                    ? {uri: userData.profilePic}
                    : require('../assets/a.png')
                }
                style={styles.profile_pic}
              />
            )}
          </TouchableOpacity>
          {userData ? (
            <Text style={styles.text}>{userData.name}</Text>
          ) : (
            <Text style={styles.text}>{user.displayName}</Text>
          )}
          <Button title="LogOut" onPress={logOut} />
        </View>
      </Modal>
      <UserModal2
        modalVisibility={showModal}
        handleBackPress={handleBackPress}
        handleOpenCamera={openCamera}
        handlePickImage={pickImage}
      />
    </View>
  );
};

export default UserModal;
