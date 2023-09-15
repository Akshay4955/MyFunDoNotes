import {View, Text} from 'react-native';
import React from 'react';
import moment from 'moment';

const MomentTime = time => {
  const Time = moment(time.time).calendar();
  return <Text>{Time}</Text>;
};

export default MomentTime;
