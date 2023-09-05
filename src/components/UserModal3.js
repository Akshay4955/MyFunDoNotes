import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import React from 'react';
import * as Constant from '../utilities/Constant';
import AntIcon from 'react-native-vector-icons/AntDesign';

const UserModal3 = ({
  modalVisibility,
  handleBackPress,
  setDeleteData,
  deleteData,
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
          <AntIcon
            name="delete"
            size={25}
            color={
              deleteData
                ? Constant.Color.activeTintColor
                : Constant.Color.inActiveTintColor
            }
          />
          <TouchableOpacity
            onPress={() => {
              setDeleteData(!deleteData);
            }}>
            <Text style={styles.modalText}>Delete</Text>
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
    flexDirection: 'row',
    alignContent: 'flex-start',
    backgroundColor: Constant.Color.lightColor,
    padding: Constant.padding.medium,
    marginTop: Constant.margin.footerMargin,
    height: Constant.height.modal3Height,
    width: Constant.width.full,
  },
  modalText: {
    fontSize: Constant.fontSize.medium,
    marginLeft: Constant.margin.medium,
  },
});
