import {View, Text, TextInput, Image, TouchableOpacity} from 'react-native';
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

const Notes = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [text, onChangeText] = useState('');
  const styles = GlobalStyleSheet();
  const getNotes = async () => {
    const fetchedNotes = await fetchNotes(user?.uid);
    console.log(fetchedNotes);
  };
  const getUser = async () => {
    const userDetails = await fetchUser(user?.uid);
    setUserData(userDetails);
  };
  useEffect(() => {
    getNotes();
  }, [fetchNotes]);
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
  const onHandleAddNote = () => {
    navigation.navigate('CreateNote');
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
      <Text style={{flex: 1}}></Text>
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
        <TouchableOpacity onPress={onHandleAddNote}>
          <IonIcon name="add" size={70} style={styles.notes_add_icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Notes;
