import {View, TextInput} from 'react-native';
import React, {useState} from 'react';
import AddNoteHeader from '../components/AddNoteHeader';
import AddNoteFooter from '../components/AddNoteFooter';
import GlobalStyleSheet from '../utilities/GlobalStyleSheet';

const CreateNote = ({navigation}) => {
  const styles = GlobalStyleSheet();
  const [text, setText] = useState('');
  const [noteText, setNoteText] = useState('');
  return (
    <View style={styles.screen_container}>
      <AddNoteHeader navigation={navigation} />
      <View style={styles.note_title_container}>
        <TextInput
          style={styles.note_title_text}
          onChangeText={setText}
          placeholder="Title"
          value={text}></TextInput>
      </View>
      <View style={styles.note_container}>
        <TextInput
          style={styles.note_content}
          multiline
          onChangeText={setNoteText}
          placeholder="Note"
          value={noteText}></TextInput>
      </View>
      <AddNoteFooter />
    </View>
  );
};

export default CreateNote;
