import {View, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import IonIcon from 'react-native-vector-icons/Ionicons';
import * as Constant from '../utilities/Constant';

const NotesFooter = ({navigation}) => {
  const onHandleAddNote = () => {
    navigation.navigate('CreateNote');
  };
  return (
    <View style={styles.notes_footer}>
      <TouchableOpacity>
        <AntDesignIcon
          name="checksquareo"
          size={25}
          style={styles.footer_Content}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <FontAwesomeIcon
          name="paint-brush"
          size={25}
          style={styles.footer_Content}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <FeatherIcon name="mic" size={25} style={styles.footer_Content} />
      </TouchableOpacity>
      <TouchableOpacity>
        <AntDesignIcon name="picture" size={25} style={styles.footer_Content} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onHandleAddNote}>
        <IonIcon name="add" size={70} style={styles.add_icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  notes_footer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    height: Constant.height.large,
    width: Constant.width.full,
    backgroundColor: Constant.Color.lightColor,
  },
  footer_Content: {
    height: Constant.height.verysmall,
    width: Constant.width.verySmall,
    margin: Constant.margin.medium,
    borderRadius: Constant.borderRadius.small,
  },
  add_icon: {
    marginLeft: Constant.margin.extralarge,
    marginBottom: Constant.margin.large,
  },
});

export default NotesFooter;
