import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import * as Constant from '../utilities/Constant';
import AntIcon from 'react-native-vector-icons/AntDesign';
import DateTimePicker from 'react-native-modal-datetime-picker';

const UserModal5 = ({modalVisibility, setModal, setDate}) => {
  const [showModal, setShowModal] = useState(false);
  const handleChooseDate = () => {
    setShowModal(true);
  };
  const handleBackPress = () => {
    setModal(false);
  };
  const handleDateBackPress = () => {
    setShowModal(false);
  };
  const handleConfirmPress = dateTime => {
    setDate(dateTime);
    setShowModal(false);
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
          <TouchableOpacity style={styles.content} onPress={handleChooseDate}>
            <AntIcon name="clockcircleo" size={25} />
            <Text style={styles.modalText}>Choose a date & time</Text>
          </TouchableOpacity>
        </View>
      </View>
      <DateTimePicker
        isVisible={showModal}
        mode="datetime"
        onConfirm={handleConfirmPress}
        onCancel={handleDateBackPress}
        style={styles.date_container}
      />
    </Modal>
  );
};

export default UserModal5;

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
  date_container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Constant.margin.medium,
    marginVertical: Constant.margin.extralarge,
    height: Constant.height.modalHeight,
    width: Constant.width.extralarge,
    backgroundColor: Constant.Color.backgroundColor,
    borderColor: Constant.Color.lightColor,
    borderWidth: Constant.borderWidth.medium,
    borderRadius: Constant.borderRadius.large,
  },
});
