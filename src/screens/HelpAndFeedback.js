import {View, Text} from 'react-native';
import React from 'react';
import GlobalStyleSheet from '../utilities/GlobalStyleSheet';

const HelpAndFeedback = () => {
  const styles = GlobalStyleSheet();
  return (
    <View style={styles.screen_container}>
      <Text>HelpAndFeedback</Text>
    </View>
  );
};

export default HelpAndFeedback;
