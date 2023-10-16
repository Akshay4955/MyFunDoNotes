import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import GlobalStyleSheet from '../utilities/GlobalStyleSheet';
import * as Constant from '../utilities/Constant';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import UserButton from '../components/UserButton';
import {useDispatch, useSelector} from 'react-redux';
import {changeLanguage, changeTheme} from '../redux/Action';
import {Language} from '../utilities/Language';

const Settings = ({navigation}) => {
  const styles = GlobalStyleSheet();
  const dispatch = useDispatch();
  const language = useSelector(state => state.LanguageReducer);
  const theme = useSelector(state => state.ThemeReducer);
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

  const handleThemePress = () => {
    if (theme === 'DARK') {
      dispatch(changeTheme('LIGHT'));
    } else {
      dispatch(changeTheme('DARK'));
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
      </View>
      <View style={{flex: 1}}>
        <UserButton
          name="Change Language"
          handleOnPress={handleLanguagePress}
        />
        <UserButton name="Change Theme" handleOnPress={handleThemePress} />
      </View>
    </View>
  );
};

export default Settings;
