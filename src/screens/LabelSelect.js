import {View, TextInput, TouchableOpacity, FlatList, Text} from 'react-native';
import React, {useState} from 'react';
import GlobalStyleSheet from '../utilities/GlobalStyleSheet';
import AntIcon from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import CheckBox from '@react-native-community/checkbox';
import {useSelector} from 'react-redux';
import {Language} from '../utilities/Language';

const LabelSelect = ({navigation, route}) => {
  const {editData, noteId} = route.params;
  const language = useSelector(state => state.LanguageReducer);
  const styles = GlobalStyleSheet();
  const [text, onChangeText] = useState('');
  const [selectedLabels, setSelectedLabels] = useState(
    editData.selectedLabels || [],
  );
  receivedLabels = useSelector(data => data.LabelReducer);
  const toggleCheckBox = item => {
    setSelectedLabels(prevSelectedLabels => {
      if (
        prevSelectedLabels.some(val => {
          return val.Label === item.Label && val.id === item.id;
        })
      ) {
        return prevSelectedLabels.filter(
          value => value.Label !== item.Label && value.id !== item.id,
        );
      } else {
        return [...prevSelectedLabels, item];
      }
    });
  };
  const handleBackPress = () => {
    editData.selectedLabels = selectedLabels;
    navigation.navigate('CreateNote', {editData, noteId});
  };

  return (
    <View style={styles.screen_container}>
      <View style={styles.create_note_header}>
        <TouchableOpacity onPress={handleBackPress}>
          <AntIcon name="arrowleft" size={25} style={styles.notes_content} />
        </TouchableOpacity>
        <TextInput
          style={styles.notes_header_text}
          onChangeText={onChangeText}
          placeholder={
            language === 'ENGLISH' ? Language[19].english : Language[19].hindi
          }
          value={text}
        />
      </View>
      <FlatList
        data={receivedLabels}
        renderItem={({item}) => (
          <View style={styles.create_note_header}>
            <MaterialIcon name="label-outline" size={25} />
            <Text style={styles.label_text}>{item.Label}</Text>
            <CheckBox
              value={selectedLabels.some(value => {
                return value.Label === item.Label && value.id === item.id;
              })}
              onValueChange={() => {
                toggleCheckBox(item);
              }}
            />
          </View>
        )}
      />
    </View>
  );
};

export default LabelSelect;
