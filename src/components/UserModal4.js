import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import * as Constant from '../utilities/Constant';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {AuthContext} from '../navigation/AuthenticationProvider';
import {deleteNote} from '../services/NotesServices';

const UserModal4 = ({modalVisibility, handleBackPress, deleteData}) => {
  const {user} = useContext(AuthContext);
  const handleDeletePress = () => {
    deleteNote(user?.uid, deleteData);
  };
  return (
    <Modal
      animationType="slide"
      visible={modalVisibility}
      onRequestClose={handleBackPress}
      transparent={true}
      style={styles.modal}>
      <View style={styles.container}>
        <View style={styles.modal}>
          <AntIcon name="delete" size={25} />
          <TouchableOpacity onPress={handleDeletePress}>
            <Text style={styles.modalText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default UserModal4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  modal: {
    flexDirection: 'row',
    alignContent: 'flex-start',
    backgroundColor: Constant.Color.lightColor,
    padding: Constant.padding.medium,
    height: Constant.height.large,
    width: Constant.width.full,
  },
  modalText: {
    fontSize: Constant.fontSize.medium,
    marginLeft: Constant.margin.medium,
  },
});
