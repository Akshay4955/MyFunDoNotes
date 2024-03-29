import {View, TextInput, TouchableOpacity} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import GlobalStyleSheet from '../utilities/GlobalStyleSheet';
import {addNote, updateNote} from '../services/NotesServices';
import * as Constant from '../utilities/Constant';
import {AuthContext} from '../navigation/AuthenticationProvider';
import UserModal3 from '../components/UserModal3';
import {useRoute} from '@react-navigation/native';
import {Chip} from 'react-native-paper';
import UserModal5 from '../components/UserModal5';
import MomentTime from '../components/MomentTime';
import PushNotification from 'react-native-push-notification';
import {addNoteSQL, updateNoteSQL} from '../services/NoteSQLiteServices';
import {useNetInfo} from '@react-native-community/netinfo';
import {useSelector} from 'react-redux';

const CreateNote = ({navigation}) => {
  const route = useRoute();
  const editData = route?.params.editData;
  const theme = useSelector(state => state.ThemeReducer);
  const noteId = route?.params.noteId;
  const SqlNoteId = route?.params.id;
  const {user} = useContext(AuthContext);
  const netInfo = useNetInfo();
  const styles = GlobalStyleSheet();
  const [text, setText] = useState(editData.title || '');
  const [noteText, setNoteText] = useState(editData.data || '');
  const [pinnedData, setPinnedData] = useState(editData.pinnedData || false);
  const [archiveData, setArchiveData] = useState(editData.archiveData || false);
  const [deleteData, setDeleteData] = useState(editData.deleteData || false);
  const [labels, setLabels] = useState(editData.selectedLabels || []);
  const [sqlNoteId, setSqlNoteId] = useState(SqlNoteId || 0);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [date, setDate] = useState(editData.reminderDate || {});
  let newDate;
  {
    date === editData?.reminderDate && JSON.stringify(date) !== '{}'
      ? (newDate = date.toDate())
      : newDate;
  }
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
        labels,
        date,
      );
      updateNoteSQL(
        sqlNoteId,
        text,
        noteText,
        archiveData,
        pinnedData,
        deleteData,
        netInfo.isInternetReachable,
      );
    } else {
      if (text === '' && noteText === '') {
      } else {
        addNote(
          user?.uid,
          text,
          noteText,
          pinnedData,
          archiveData,
          deleteData,
          labels,
          date,
        );
        addNoteSQL(
          text,
          noteText,
          archiveData,
          pinnedData,
          deleteData,
          netInfo.isInternetReachable,
        );
      }
    }
    navigation.goBack();
    if (JSON.stringify(date) !== '{}') {
      PushNotification.localNotificationSchedule({
        channelId: 'notes-channel',
        title: 'You saved note',
        date: date === editData?.reminderDate ? newDate : date,
        message: 'message sent successfully',
      });
    }
  };
  const handleOptionPress = () => {
    setShowModal(true);
  };
  const handleOptionBackPress = () => {
    setShowModal(false);
  };
  const handleReminderPress = () => {
    setShowModal2(true);
  };

  useEffect(() => {
    navigation.addListener('focus', () => {
      setLabels(editData.selectedLabels || []);
    });
  }, [user]);
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
        <TouchableOpacity onPress={handleReminderPress}>
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
      <View>
        <TextInput
          style={styles.createNote_title_text}
          onChangeText={setText}
          placeholder="Title"
          placeholderTextColor={
            theme == 'DARK'
              ? Constant.Color.whiteColor
              : Constant.Color.backgroundColor
          }
          value={text}></TextInput>
      </View>
      <View>
        <TextInput
          style={styles.createNote_note_content}
          multiline
          onChangeText={setNoteText}
          placeholder="Note"
          placeholderTextColor={
            theme == 'DARK'
              ? Constant.Color.whiteColor
              : Constant.Color.backgroundColor
          }
          value={noteText}></TextInput>
      </View>
      <View style={styles.chipContainer}>
        {editData.selectedLabels?.map(item => (
          <Chip key={item.id} children={item.Label} style={styles.chip} />
        ))}
        {newDate ? (
          <Chip children={<MomentTime time={newDate} />} style={styles.chip} />
        ) : (
          <></>
        )}
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
          navigation={navigation}
          editData={editData}
          noteId={noteId}
        />
        <UserModal5
          modalVisibility={showModal2}
          setModal={setShowModal2}
          setDate={setDate}
        />
      </View>
    </View>
  );
};

export default CreateNote;
