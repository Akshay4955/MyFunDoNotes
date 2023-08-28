import {View, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AntIcon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import * as Constant from '../utilities/Constant';
import React from 'react';

const AddNoteFooter = () => {
  return (
    <View style={styles.notes_footer}>
      <TouchableOpacity>
        <AntIcon name="plussquareo" size={25} style={styles.footer_Content} />
      </TouchableOpacity>
      <TouchableOpacity>
        <EntypoIcon
          name="dots-three-vertical"
          size={25}
          style={styles.footer_Content}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  notes_footer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    height: Constant.height.small,
    width: Constant.width.full,
    backgroundColor: Constant.Color.lightColor,
  },
  footer_Content: {
    height: Constant.height.verysmall,
    width: Constant.width.verySmall,
    margin: Constant.margin.medium,
    borderRadius: Constant.borderRadius.small,
  },
});
export default AddNoteFooter;
