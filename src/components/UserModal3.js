import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import React from 'react';
import * as Constant from '../utilities/Constant';
import AntIcon from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
const UserModal3 = ({
  modalVisibility,
  handleBackPress,
  setDeleteData,
  deleteData,
  navigation,
  editData,
  noteId,
}) => {
  return (
    <Modal
      animationType="slide"
      visible={modalVisibility}
      onRequestClose={handleBackPress}
      transparent={true}
      style={styles.modal}>
      <View style={styles.container}>
        <View style={styles.modal}>
          <TouchableOpacity
            style={styles.content}
            onPress={() => {
              setDeleteData(!deleteData);
            }}>
            <AntIcon
              name="delete"
              size={25}
              color={
                deleteData
                  ? Constant.Color.activeTintColor
                  : Constant.Color.inActiveTintColor
              }
            />
            <Text style={styles.modalText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.content}>
            <AntIcon name="copy1" size={25} />
            <Text style={styles.modalText}>Make a copy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.content}>
            <AntIcon name="sharealt" size={25} />
            <Text style={styles.modalText}>Send</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.content}>
            <AntIcon name="adduser" size={25} />
            <Text style={styles.modalText}>Collaborator</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.content}
            onPress={() => {
              navigation.navigate('LabelSelect', {editData, noteId});
            }}>
            <MaterialIcon name="label-outline" size={25} />
            <Text style={styles.modalText}>Labels</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.content}>
            <IonIcon name="help-circle" size={25} />
            <Text style={styles.modalText}>Help & feedback</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default UserModal3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modal: {
    alignContent: 'flex-start',
    backgroundColor: Constant.Color.lightColor,
    padding: Constant.padding.medium,
    marginTop: Constant.margin.footerMargin,
    height: Constant.height.modal3Height,
    width: Constant.width.full,
  },
  content: {
    flexDirection: 'row',
    marginTop: Constant.margin.small,
  },
  modalText: {
    fontSize: Constant.fontSize.medium,
    marginLeft: Constant.margin.medium,
  },
});
