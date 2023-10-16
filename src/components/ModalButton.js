import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import * as Constant from '../utilities/Constant';
import {useSelector} from 'react-redux';

const ModalButton = ({name, handleOnPress}) => {
  const theme = useSelector(state => state.ThemeReducer);
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      margin: Constant.margin.medium,
      borderWidth: Constant.borderWidth.small,
      borderColor:
        theme === 'DARK'
          ? Constant.Color.whiteColor
          : Constant.Color.backgroundColor,
      borderRadius: Constant.borderRadius.large,
      height: Constant.height.modalButton,
      width: Constant.width.medium,
      padding: Constant.padding.small,
    },
    content: {
      marginLeft: Constant.margin.small,
      color:
        theme === 'DARK'
          ? Constant.Color.whiteColor
          : Constant.Color.backgroundColor,
    },
  });
  return (
    <TouchableOpacity style={styles.container} onPress={handleOnPress}>
      <FeatherIcon
        name="camera"
        size={24}
        color={
          theme === 'DARK'
            ? Constant.Color.whiteColor
            : Constant.Color.backgroundColor
        }
      />
      <Text style={styles.content}>{name}</Text>
    </TouchableOpacity>
  );
};

export default ModalButton;
