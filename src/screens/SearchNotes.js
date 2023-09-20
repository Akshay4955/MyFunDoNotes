import {View, TextInput, TouchableOpacity, FlatList} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import GlobalStyleSheet from '../utilities/GlobalStyleSheet';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {fetchNotes} from '../services/NotesServices';
import {AuthContext} from '../navigation/AuthenticationProvider';
import {useSelector} from 'react-redux';
import NoteCard from '../components/NoteCard';

const SearchNotes = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const gridView = useSelector(state => state.reducer);
  const [searchedNotes, setSearchedNotes] = useState([]);
  const [text, onChangeText] = useState('');
  const styles = GlobalStyleSheet();

  const getNotes = async () => {
    const fetchedNotes = await fetchNotes(user?.uid);
    const searchNotes = fetchedNotes.filter(
      note => note.title.includes(text) || note.data.includes(text),
    );
    setSearchedNotes(searchNotes);
  };
  useEffect(() => {
    if (text !== '') {
      getNotes();
    }
  }, [text]);
  const handleBackPress = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.screen_container}>
      <View style={styles.notes_header}>
        <TouchableOpacity onPress={handleBackPress}>
          <AntIcon name="arrowleft" size={25} style={styles.notes_content} />
        </TouchableOpacity>
        <TextInput
          style={styles.notes_header_text}
          onChangeText={onChangeText}
          placeholder="Serach your note"
          value={text}></TextInput>
      </View>
      <FlatList
        numColumns={gridView ? 2 : 1}
        key={gridView ? 2 : 1}
        data={searchedNotes}
        renderItem={({item}) => (
          <NoteCard
            title={item.title}
            data={item.data}
            labels={item.selectedLabels}
            reminderDate={item.reminderDate}
          />
        )}
      />
    </View>
  );
};

export default SearchNotes;
