import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import * as Constant from '../utilities/Constant';

const NoteCard = ({title, data}) => {
  return (
    <View style={styles.note_container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.note}>{data}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  note_container: {
    height: Constant.height.noteHeight,
    width: Constant.width.extralarge,
    paddingLeft: Constant.padding.medium,
    borderColor: Constant.Color.lightColor,
    borderWidth: Constant.borderWidth.medium,
    borderRadius: Constant.borderRadius.large,
    marginTop: Constant.margin.small,
  },
  title: {
    fontSize: Constant.fontSize.small,
  },
  note: {
    fontSize: Constant.fontSize.verySmall,
    padding: Constant.padding.small,
  },
});

export default NoteCard;
