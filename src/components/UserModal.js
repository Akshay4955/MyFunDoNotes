import {View, Text, Modal} from 'react-native';
import React from 'react';

const UserModal = ({modalVisibility, handleProfileBackPress}) => {
  return (
    <Modal animationType='slide'
    visible= {modalVisibility}
    onRequestClose={handleProfileBackPress}>
      <View>
        <Text>UserModal</Text>
      </View>
    </Modal>
  );
};

export default UserModal;
