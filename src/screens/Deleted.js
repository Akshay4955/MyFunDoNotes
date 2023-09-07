import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import GlobalStyleSheet from '../utilities/GlobalStyleSheet';
import {AuthContext} from '../navigation/AuthenticationProvider';
import {fetchNotes} from '../services/NotesServices';
import NoteCard from '../components/NoteCard';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import * as Constant from '../utilities/Constant';
import UserModal3 from '../components/UserModal3';
import UserModal4 from '../components/UserModal4';

const Deleted = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const [deletedNotes, setDeletedNotes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deleteNoteId, setDeleteNoteId] = useState('');
  const styles = GlobalStyleSheet();
  const getNotes = async () => {
    const fetchedNotes = await fetchNotes(user?.uid);
    const fetchedDeletedNotes = fetchedNotes?.filter(
      note => note.deleteData === true && note.archiveData === false,
    );
    setDeletedNotes(fetchedDeletedNotes);
  };
  useEffect(() => {
    getNotes();
  }, [showModal]);
  const handleMenuPress = () => {
    navigation.openDrawer();
  };
  const handleEditNote = item => {
    navigation.navigate('CreateNote', {editData: item, noteId: item.id});
  };
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      getNotes();
      setRefreshing(false);
    }, 2000);
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
        <Text style={styles.note_type}>Deleted</Text>
        <TouchableOpacity style={{marginLeft: Constant.margin.headerMargin}}>
          <EntypoIcon name="dots-three-vertical" size={25} />
        </TouchableOpacity>
      </View>
      <FlatList
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
            <NoteCard title={item.title} data={item.data} />
          </TouchableOpacity>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />
    </View>
  );
};

export default Deleted;
