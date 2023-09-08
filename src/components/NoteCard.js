import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import * as Constant from '../utilities/Constant';
import {useSelector} from 'react-redux';

const NoteCard = ({title, data}) => {
  const gridVIew = useSelector(state => state.reducer);
  return (
    <View style={gridVIew ? styles.note_container_grid : styles.note_container}>
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
    margin: Constant.margin.small,
  },
  note_container_grid: {
    height: Constant.height.noteHeight,
    width: Constant.width.medium,
    paddingLeft: Constant.padding.medium,
    borderColor: Constant.Color.lightColor,
    borderWidth: Constant.borderWidth.medium,
    borderRadius: Constant.borderRadius.large,
    margin: Constant.margin.small,
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
