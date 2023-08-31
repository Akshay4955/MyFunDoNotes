import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import * as Constant from '../utilities/Constant';

const ModalButton = ({name, handleOnPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={handleOnPress}>
      <FeatherIcon name="camera" size={25} />
      <Text style={styles.content}>{name}</Text>
    </TouchableOpacity>
  );
};

export default ModalButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: Constant.margin.medium,
    borderWidth: Constant.borderWidth.medium,
    borderColor: Constant.Color.whiteColor,
    borderRadius: Constant.borderRadius.large,
    height: Constant.height.modalButton,
    width: Constant.width.medium,
    padding: Constant.padding.small,
  },
  content: {
    marginLeft: Constant.margin.small,
  },
});
