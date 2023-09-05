import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
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

const Notes = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [text, onChangeText] = useState('');
  const [pinnedNotes, setPinnedNotes] = useState([]);
  const [otherNotes, setOtherNotes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const styles = GlobalStyleSheet();
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
    getNotes();
  }, [navigation]);
  useEffect(() => {
    getUser();
  }, [user, handleProfilePress]);
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
      <View style={styles.notes_header}>
        <TouchableOpacity onPress={handleMenuPress}>
          <EntypoIcon name="menu" size={25} style={styles.notes_content} />
        </TouchableOpacity>
        <TextInput
          style={styles.notes_header_text}
          onChangeText={onChangeText}
          placeholder="Search your notes"
          value={text}
        />
        <TouchableOpacity>
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
              style={styles.notes_content}
            />
          ) : (
            <Image
              source={
                userData?.profilePic
                  ? {uri: userData.profilePic}
                  : require('../assets/a.png')
              }
              style={styles.notes_content}
            />
          )}
        </TouchableOpacity>
      </View>
      <UserModal
        modalVisibility={showModal}
        handleProfileBackPress={handleProfileBackPress}
      />
      <View style={styles.notes_container}>
        <Text style={styles.note_type}>Pinned</Text>
        <FlatList
          data={pinnedNotes}
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
        <Text style={styles.note_type}>Other</Text>
        <FlatList
          data={otherNotes}
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
