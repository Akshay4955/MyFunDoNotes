import {View, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import React from 'react';
import * as Constant from '../utilities/Constant';

const AddNoteHeader = ({navigation}) => {
  const handleBackPress = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.notes_header}>
      <TouchableOpacity onPress={handleBackPress}>
        <AntIcon name="arrowleft" size={25} style={styles.header_Content} />
      </TouchableOpacity>
      <TouchableOpacity style={{marginLeft: Constant.margin.headerMargin}}>
        <AntIcon name="pushpino" size={25} style={styles.header_Content} />
      </TouchableOpacity>
      <TouchableOpacity>
        <AntIcon name="bells" size={25} style={styles.header_Content} />
      </TouchableOpacity>
      <TouchableOpacity>
        <FoundationIcon
          name="archive"
          size={25}
          style={styles.header_Content}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  notes_header: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: Constant.margin.medium,
    marginVertical: Constant.margin.medium,
    padding: Constant.padding.small,
    height: Constant.height.small,
    width: Constant.width.extralarge,
    borderRadius: Constant.borderRadius.large,
    backgroundColor: Constant.Color.lightColor,
  },
  header_Content: {
    height: Constant.height.verysmall,
    width: Constant.width.verySmall,
    marginLeft: Constant.margin.large,
    borderRadius: Constant.borderRadius.small,
  },
});

export default AddNoteHeader;
