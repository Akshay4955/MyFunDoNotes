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
import ModalButton from './ModalButton';
import storage from '@react-native-firebase/storage';

const UserModal = ({modalVisibility, handleProfileBackPress}) => {
  const {user, logOut} = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState({});
  const [profile, setProfile] = useState('../assets/a.png');
  const getUser = async () => {
    const userDetails = await fetchUser(user?.uid);
    console.log(userDetails);
    setUserData(userDetails);
    setProfile(userDetails?.profilePic);
  };
  useEffect(() => {
    getUser();
  }, [user]);
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
      setProfile(image.path);
      submitImage(image.path);
    });
  };
  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      setProfile(image.path);
      submitImage(image.path);
    });
  };
  const submitImage = async () => {
    const imageUrl = profile;
    console.log(imageUrl);
    const fileName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
    console.log(fileName);
    try {
      await storage.ref(fileName).putFile(imageUrl);
      const downloadURL = await storage.ref(fileName).getDownloadURL();
      updateUser(user?.uid, downloadURL);
    } catch (error) {
      console.log(error);
    }
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
            {user?.photoURL ? (
              <Image source={{uri: user?.photoURL}} style={styles.profile_pic} />
            ) : (
              <Image
                source={
                  userData?.profilePic
                    ? {uri: userData?.profilePic}
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
      <Modal
        animationType="slide"
        visible={showModal}
        onRequestClose={handleBackPress}
        transparent={true}>
        <View style={styles.container}>
          <Text style={styles.modalText}>Add Image</Text>
          <ModalButton name="Open Camera" handleOnPress={openCamera} />
          <ModalButton name="Choose Image" handleOnPress={pickImage} />
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
    height: Constant.height.profilePic,
    width: Constant.width.small,
    marginLeft: Constant.margin.medium,
    borderRadius: Constant.borderRadius.extralarge,
  },
  text: {
    padding: Constant.padding.medium,
    fontSize: Constant.fontSize.small,
    fontWeight: '300',
  },
  modalText: {
    fontSize: Constant.fontSize.extralarge,
    fontWeight: 'bold',
  },
});

export default UserModal;
