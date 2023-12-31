import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import IonIcon from 'react-native-vector-icons/Ionicons';
import GlobalStyleSheet from '../utilities/GlobalStyleSheet';
import UserModal from '../components/UserModal';
import {fetchNotes} from '../services/NotesServices';
import {fetchUser} from '../services/UserServices';
import {AuthContext} from '../navigation/AuthenticationProvider';
import NoteCard from '../components/NoteCard';
import {viewChange} from '../redux/Action';
import {useDispatch, useSelector} from 'react-redux';
import {createTable, fetchNoteSQL} from '../services/NoteSQLiteServices';
import {Language} from '../utilities/Language';

const Notes = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const [sqlData, setSqlData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [pinnedNotes, setPinnedNotes] = useState([]);
  const [otherNotes, setOtherNotes] = useState([]);
  const styles = GlobalStyleSheet();
  const dispatch = useDispatch();
  const gridView = useSelector(state => state.reducer);
  const language = useSelector(state => state.LanguageReducer);

  const getNotes = async () => {
    const fetchedNotes = await fetchNotes(user?.uid);
    const fetchedPinnedNotes = fetchedNotes?.filter(
      note =>
        note.pinnedData === true &&
        note.archiveData === false &&
        note.deleteData === false,
    );
    setPinnedNotes(fetchedPinnedNotes);
    const fetchedOtherNotes = fetchedNotes?.filter(
      note =>
        note.pinnedData === false &&
        note.archiveData === false &&
        note.deleteData === false,
    );
    setOtherNotes(fetchedOtherNotes);
  };
  const getUser = async () => {
    const userDetails = await fetchUser(user?.uid);
    setUserData(userDetails);
  };

  useEffect(() => {
    navigation.addListener('focus', () => {
      getNotes();
      getUser();
      fetchNoteSQL().then(data => setSqlData(data));
    });
  }, [user]);
  useEffect(() => {
    createTable();
  }, [user]);
  const handleMenuPress = () => {
    navigation.openDrawer();
  };
  const handleProfilePress = () => {
    setShowModal(true);
  };
  const handleProfileBackPress = () => {
    setShowModal(false);
  };
  const handleAddNote = () => {
    navigation.navigate('CreateNote', {editData: {}, noteId: ''});
  };
  const handleEditNote = item => {
    const note = sqlData.filter(
      note => note.Title === item.title && note.Note === item.data,
    );
    navigation.navigate('CreateNote', {
      editData: item,
      noteId: item.id,
      id: note[0].Id,
    });
  };
  const handleTogglingOfView = () => {
    dispatch(viewChange());
  };
  const handleSearchNotes = () => {
    navigation.navigate('SearchNotes');
  };
  return (
    <View style={styles.screen_container}>
      <View style={styles.notes_header}>
        <TouchableOpacity onPress={handleMenuPress}>
          <EntypoIcon name="menu" size={25} style={styles.notes_content} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSearchNotes}>
          <Text style={styles.notes_header_text}>
            {language === 'ENGLISH' ? Language[3].english : Language[3].hindi}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleTogglingOfView}>
          <MaterialIcon
            name="view-agenda-outline"
            size={25}
            style={styles.notes_content}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleProfilePress}>
          {user?.photoURL ? (
            <Image
              source={{uri: user?.photoURL}}
              style={styles.profile_image}
            />
          ) : (
            <Image
              source={
                userData?.profilePic
                  ? {uri: userData.profilePic}
                  : require('../assets/a.png')
              }
              style={styles.profile_image}
            />
          )}
        </TouchableOpacity>
      </View>
      <UserModal
        modalVisibility={showModal}
        handleProfileBackPress={handleProfileBackPress}
      />
      <View style={styles.notes_container}>
        <Text style={styles.note_type}>
          {language === 'ENGLISH' ? Language[2].english : Language[2].hindi}
        </Text>
        <FlatList
          data={pinnedNotes}
          numColumns={gridView ? 2 : 1}
          key={gridView ? 2 : 1}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                handleEditNote(item);
              }}>
              <NoteCard item={item} />
            </TouchableOpacity>
          )}
        />

        <Text style={styles.note_type}>
          {language === 'ENGLISH' ? Language[1].english : Language[1].hindi}
        </Text>
        <FlatList
          data={otherNotes}
          numColumns={gridView ? 2 : 1}
          key={gridView ? 3 : 4}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                handleEditNote(item);
              }}>
              <NoteCard item={item} />
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={styles.notes_footer}>
        <TouchableOpacity>
          <AntDesignIcon
            name="checksquareo"
            size={25}
            style={styles.notes_content}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesomeIcon
            name="paint-brush"
            size={25}
            style={styles.notes_content}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <FeatherIcon name="mic" size={25} style={styles.notes_content} />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesignIcon
            name="picture"
            size={25}
            style={styles.notes_content}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAddNote}>
          <IonIcon name="add" size={70} style={styles.notes_add_icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Notes;
