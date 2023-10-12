import {Text, StyleSheet} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import * as Constant from '../utilities/Constant';

const UserButton = ({name, handleOnPress}) => {
  return (
    <TouchableOpacity style={styles.auth_button} onPress={handleOnPress}>
      <Text style={styles.auth_button_text}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  auth_button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Constant.Color.activeBackgorundColor,
    width: Constant.width.medium,
    height: Constant.height.small,
    borderWidth: Constant.borderWidth.small,
    borderRadius: Constant.borderRadius.large,
    marginTop: Constant.margin.auth_screen,
  },
  auth_button_text: {
    fontSize: Constant.fontSize.medium,
    fontWeight: 'bold',
    color: Constant.Color.whiteColor,
  },
});
export default UserButton;
