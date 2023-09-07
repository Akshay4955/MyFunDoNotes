import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import GlobalStyleSheet from '../utilities/GlobalStyleSheet';
import {AuthContext} from '../navigation/AuthenticationProvider';
import {fetchNotes} from '../services/NotesServices';
import NoteCard from '../components/NoteCard';
import EntypoIcon from 'react-native-vector-icons/Entypo';

const Archive = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const styles = GlobalStyleSheet();
  const getNotes = async () => {
    const fetchedNotes = await fetchNotes(user?.uid);
    const fetchedArchivedNotes = fetchedNotes?.filter(
      note => note.deleteData === false && note.archiveData === true,
    );
    setArchivedNotes(fetchedArchivedNotes);
  };
  useEffect(() => {
    getNotes();
  }, [handleEditNote]);
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
  return (
    <View style={styles.screen_container}>
      <View style={styles.create_note_header}>
        <TouchableOpacity onPress={handleMenuPress}>
          <EntypoIcon name="menu" size={25} style={styles.notes_content} />
        </TouchableOpacity>
        <Text style={styles.note_type}>Archived</Text>
      </View>
      <FlatList
        data={archivedNotes}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              handleEditNote(item);
            }}>
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

export default Archive;
