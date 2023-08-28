import {View, Text} from 'react-native';
import React from 'react';
import GlobalStyleSheet from '../utilities/GlobalStyleSheet';

const Deleted = () => {
  const styles = GlobalStyleSheet();
  return (
    <View style={styles.screen_container}>
      <Text>Deleted</Text>
    </View>
  );
};

export default Deleted;
