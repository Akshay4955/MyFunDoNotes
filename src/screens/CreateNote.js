import {View, TextInput, TouchableOpacity} from 'react-native';
import React, {useContext, useState} from 'react';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import GlobalStyleSheet from '../utilities/GlobalStyleSheet';
import {addNote, updateNote} from '../services/NotesServices';
import * as Constant from '../utilities/Constant';
import {AuthContext} from '../navigation/AuthenticationProvider';
import UserModal3 from '../components/UserModal3';

const CreateNote = ({route, navigation}) => {
  const {editData, noteId} = route.params;
  const {user} = useContext(AuthContext);
  const styles = GlobalStyleSheet();
  const [text, setText] = useState(editData.title || '');
  const [noteText, setNoteText] = useState(editData.data || '');
  const [pinnedData, setPinnedData] = useState(editData.pinnedData || false);
  const [archiveData, setArchiveData] = useState(editData.archiveData || false);
  const [deleteData, setDeleteData] = useState(editData.deleteData || false);
  const [showModal, setShowModal] = useState(false);
  const handleBackPress = () => {
    if (noteId) {
      updateNote(
        user?.uid,
        text,
        noteText,
        pinnedData,
        archiveData,
        deleteData,
        noteId,
      );
    } else {
      if (text === '' && noteText === '') {
      } else {
        addNote(user?.uid, text, noteText, pinnedData, archiveData, deleteData);
      }
    }
    navigation.goBack();
  };
  const handleOptionPress = () => {
    setShowModal(true);
  };
  const handleOptionBackPress = () => {
    setShowModal(false);
  };
  return (
    <View style={styles.screen_container}>
      <View style={styles.create_note_header}>
        <TouchableOpacity onPress={handleBackPress}>
          <AntIcon name="arrowleft" size={25} style={styles.notes_content} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginLeft: Constant.margin.headerMargin}}
          onPress={() => setPinnedData(!pinnedData)}>
          <AntIcon
            name="pushpino"
            size={25}
            style={styles.notes_content}
            color={
              pinnedData
                ? Constant.Color.activeTintColor
                : Constant.Color.inActiveTintColor
            }
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntIcon name="bells" size={25} style={styles.notes_content} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setArchiveData(!archiveData)}>
          <FoundationIcon
            name="archive"
            size={25}
            style={styles.notes_content}
            color={
              archiveData
                ? Constant.Color.activeTintColor
                : Constant.Color.inActiveTintColor
            }
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
        <TouchableOpacity
          style={{marginLeft: Constant.margin.footerMargin}}
          onPress={handleOptionPress}>
          <EntypoIcon
            name="dots-three-vertical"
            size={25}
            style={styles.notes_content}
          />
        </TouchableOpacity>
        <UserModal3
          modalVisibility={showModal}
          handleBackPress={handleOptionBackPress}
          setDeleteData={setDeleteData}
          deleteData={deleteData}
        />
      </View>
    </View>
  );
};

export default CreateNote;
