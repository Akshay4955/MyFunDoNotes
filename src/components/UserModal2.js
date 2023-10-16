import {View, Text, Modal, StyleSheet} from 'react-native';
import React from 'react';
import * as Constant from '../utilities/Constant';
import ModalButton from './ModalButton';
import {useSelector} from 'react-redux';

const UserModal2 = ({
  modalVisibility,
  handleBackPress,
  handleOpenCamera,
  handlePickImage,
}) => {
  const theme = useSelector(state => state.ThemeReducer);

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
    modalText: {
      fontSize: Constant.fontSize.extralarge,
      fontWeight: 'bold',
      color:
        theme === 'DARK'
          ? Constant.Color.whiteColor
          : Constant.Color.backgroundColor,
    },
  });
  return (
    <Modal
      animationType="slide"
      visible={modalVisibility}
      onRequestClose={handleBackPress}
      transparent={true}>
      <View style={styles.container}>
        <Text style={styles.modalText}>Add Image</Text>
        <ModalButton name="Open Camera" handleOnPress={handleOpenCamera} />
        <ModalButton
          name="Choose Image"
          handleOnPress={handlePickImage}
          color={
            theme === 'DARK'
              ? Constant.Color.whiteColor
              : Constant.Color.backgroundColor
          }
        />
      </View>
    </Modal>
  );
};

export default UserModal2;
