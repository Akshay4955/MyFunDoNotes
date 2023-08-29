import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-gesture-handler';
import * as Constant from '../utilities/Constant';

const UserInput = ({placeholder, value, setText, secured = false}) => {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={setText}
      style={styles.auth_input}
      secureTextEntry={secured}></TextInput>
  );
};

const styles = StyleSheet.create({
  auth_input: {
    backgroundColor: Constant.Color.lightColor,
    width: Constant.width.large,
    height: Constant.height.medium,
    borderWidth: Constant.borderWidth.medium,
    borderRadius: Constant.borderRadius.large,
    paddingLeft: Constant.padding.medium,
    marginTop: Constant.margin.auth_screen,
  },
});
export default UserInput;
