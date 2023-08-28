import {View, Text} from 'react-native';
import React from 'react';
import GlobalStyleSheet from '../utilities/GlobalStyleSheet';

const CreateNewLabel = () => {
  const styles = GlobalStyleSheet();
  return (
    <View style={styles.screen_container}>
      <Text>CreateNewLabel</Text>
    </View>
  );
};

export default CreateNewLabel;
