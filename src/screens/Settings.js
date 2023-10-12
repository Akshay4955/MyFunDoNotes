import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import GlobalStyleSheet from '../utilities/GlobalStyleSheet';
import * as Constant from '../utilities/Constant';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import UserButton from '../components/UserButton';
import {useDispatch, useSelector} from 'react-redux';
import {changeLanguage} from '../redux/Action';
import {Language} from '../utilities/Language';

const Settings = ({navigation}) => {
  const styles = GlobalStyleSheet();
  const dispatch = useDispatch();
  const language = useSelector(state => state.LanguageReducer);
  const handleMenuPress = () => {
    navigation.openDrawer();
  };

  const handleLanguagePress = () => {
    if (language === 'ENGLISH') {
      dispatch(changeLanguage('HINDI'));
    } else {
      dispatch(changeLanguage('ENGLISH'));
    }
  };
  return (
    <View style={styles.screen_container}>
      <View style={styles.create_note_header}>
        <TouchableOpacity onPress={handleMenuPress}>
          <EntypoIcon name="menu" size={25} style={styles.notes_content} />
        </TouchableOpacity>
        <Text style={styles.note_type}>
          {language === 'ENGLISH' ? Language[8].english : Language[8].hindi}
        </Text>
        <TouchableOpacity style={{marginLeft: Constant.margin.headerMargin}}>
          <EntypoIcon name="dots-three-vertical" size={25} />
        </TouchableOpacity>
      </View>
      <View style={{flex: 1}}>
        <UserButton
          name="Change Language"
          handleOnPress={handleLanguagePress}
        />
      </View>
    </View>
  );
};

export default Settings;
