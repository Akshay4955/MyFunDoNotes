import {View, TextInput, TouchableOpacity} from 'react-native';
import React, {useContext, useState} from 'react';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import GlobalStyleSheet from '../utilities/GlobalStyleSheet';
import {addNote} from '../services/NotesServices';
import * as Constant from '../utilities/Constant';
import {AuthContext} from '../navigation/AuthenticationProvider';

const CreateNote = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const styles = GlobalStyleSheet();
  const [text, setText] = useState('');
  const [noteText, setNoteText] = useState('');
  const [pinnedData, setPinnedData] = useState(false);
  const [archiveData, setArchiveData] = useState(false);
  const [deleteData, setDeleteData] = useState(false);
  const handleBackPress = () => {
    if (text == '' && noteText == '') {
      navigation.goBack();
    } else {
      addNote(user?.uid, text, noteText, pinnedData, archiveData, deleteData);
      navigation.goBack();
    }
  };
  return (
    <View style={styles.screen_container}>
      <View style={styles.create_note_header}>
        <TouchableOpacity onPress={handleBackPress}>
          <AntIcon name="arrowleft" size={25} style={styles.notes_content} />
        </TouchableOpacity>
        <TouchableOpacity style={{marginLeft: Constant.margin.headerMargin}}>
          <AntIcon name="pushpino" size={25} style={styles.notes_content} />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntIcon name="bells" size={25} style={styles.notes_content} />
        </TouchableOpacity>
        <TouchableOpacity>
          <FoundationIcon
            name="archive"
            size={25}
            style={styles.notes_content}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.createNote_title_container}>
        <TextInput
          style={styles.createNote_title_text}
          onChangeText={setText}
          placeholder="Title"
          value={text}></TextInput>
      </View>
      <View style={styles.createNote_note_container}>
        <TextInput
          style={styles.createNote_note_content}
          multiline
          onChangeText={setNoteText}
          placeholder="Note"
          value={noteText}></TextInput>
      </View>
      <View style={styles.create_note_footer}>
        <TouchableOpacity>
          <AntIcon name="plussquareo" size={25} style={styles.notes_content} />
        </TouchableOpacity>
        <TouchableOpacity style={{marginLeft: Constant.margin.footerMargin}}>
          <EntypoIcon
            name="dots-three-vertical"
            size={25}
            style={styles.notes_content}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateNote;
