import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import * as Constant from '../utilities/Constant';
import {useSelector} from 'react-redux';
import {Chip} from 'react-native-paper';
import MomentTime from './MomentTime';

const NoteCard = ({item}) => {
  const gridVIew = useSelector(state => state.reducer);

  let newDate;
  {
    JSON.stringify(item.reminderDate) !== '{}' && item.reminderDate
      ? (newDate = item.reminderDate.toDate())
      : newDate;
  }
  return (
    <View style={gridVIew ? styles.note_container_grid : styles.note_container}>
      <Text style={styles.title} numberOfLines={1}>
        {item.title}
      </Text>
      <Text style={styles.note} numberOfLines={gridVIew ? 3 : 5}>
        {item.data}
      </Text>
      <View style={styles.chipContainer}>
        {item.labels?.map(item => (
          <Chip key={item.id} children={item.Label} style={styles.chip} />
        ))}
        {newDate ? (
          <Chip children={<MomentTime time={newDate} />} style={styles.chip} />
        ) : (
          <></>
        )}
      </View>
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
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    marginVertical: 2,
    marginRight: 2,
    backgroundColor: Constant.Color.activeTintColor,
  },
});

export default NoteCard;
