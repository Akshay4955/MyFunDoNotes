import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import GlobalStyleSheet from '../utilities/GlobalStyleSheet';
import {AuthContext} from '../navigation/AuthenticationProvider';
import {fetchNotes} from '../services/NotesServices';
import NoteCard from '../components/NoteCard';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import * as Constant from '../utilities/Constant';
import UserModal4 from '../components/UserModal4';
import {useSelector} from 'react-redux';
import {Language} from '../utilities/Language';

const Deleted = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const [deletedNotes, setDeletedNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteNoteId, setDeleteNoteId] = useState('');
  const styles = GlobalStyleSheet();
  const gridView = useSelector(state => state.reducer);
  const language = useSelector(state => state.LanguageReducer);
  const getNotes = async () => {
    const fetchedNotes = await fetchNotes(user?.uid);
    const fetchedDeletedNotes = fetchedNotes?.filter(
      note => note.deleteData === true && note.archiveData === false,
    );
    setDeletedNotes(fetchedDeletedNotes);
  };
  useEffect(() => {
    navigation.addListener('focus', () => {
      getNotes();
    });
  }, []);
  const handleMenuPress = () => {
    navigation.openDrawer();
  };
  const handleEditNote = item => {
    navigation.navigate('CreateNote', {editData: item, noteId: item.id});
  };
  const handleLongPress = item => {
    setDeleteNoteId(item.id);
    setShowModal(true);
  };
  const handleOptionBackPress = () => {
    setShowModal(false);
  };
  return (
    <View style={styles.screen_container}>
      <View style={styles.create_note_header}>
        <TouchableOpacity onPress={handleMenuPress}>
          <EntypoIcon name="menu" size={25} style={styles.notes_content} />
        </TouchableOpacity>
        <Text style={styles.note_type}>
          {language === 'ENGLISH' ? Language[7].english : Language[7].hindi}
        </Text>
      </View>
      <FlatList
        numColumns={gridView ? 2 : 1}
        key={gridView ? 2 : 1}
        data={deletedNotes}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              handleEditNote(item);
            }}
            onLongPress={() => {
              handleLongPress(item);
            }}>
            <UserModal4
              modalVisibility={showModal}
              handleBackPress={handleOptionBackPress}
              deleteData={deleteNoteId}
            />
            <NoteCard item={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Deleted;
