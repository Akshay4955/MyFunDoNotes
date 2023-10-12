import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import GlobalStyleSheet from '../utilities/GlobalStyleSheet';
import * as Constant from '../utilities/Constant';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {useSelector} from 'react-redux';
import {Language} from '../utilities/Language';

const Reminders = ({navigation}) => {
  const language = useSelector(state => state.LanguageReducer);
  const styles = GlobalStyleSheet();
  const handleMenuPress = () => {
    navigation.openDrawer();
  };
  return (
    <View style={styles.screen_container}>
      <View style={styles.create_note_header}>
        <TouchableOpacity onPress={handleMenuPress}>
          <EntypoIcon name="menu" size={25} style={styles.notes_content} />
        </TouchableOpacity>
        <Text style={styles.note_type}>
          {language === 'ENGLISH' ? Language[4].english : Language[4].hindi}
        </Text>
        <TouchableOpacity style={{marginLeft: Constant.margin.headerMargin}}>
          <EntypoIcon name="dots-three-vertical" size={25} />
        </TouchableOpacity>
      </View>
      <Text style={{flex: 1}}>
        {language === 'ENGLISH' ? Language[4].english : Language[4].hindi}
      </Text>
    </View>
  );
};

export default Reminders;
