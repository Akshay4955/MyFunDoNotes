import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard,
  FlatList,
} from 'react-native';
import React, {useContext, useState, useRef, useEffect} from 'react';
import GlobalStyleSheet from '../utilities/GlobalStyleSheet';
import AntIcon from 'react-native-vector-icons/AntDesign';
import * as Constant from '../utilities/Constant';
import {addLabel, fetchLabels} from '../services/LabelServices';
import {AuthContext} from '../navigation/AuthenticationProvider';
import LabelCard from '../components/LabelCard';
import {useDispatch, useSelector} from 'react-redux';
import {fetchingLabels} from '../redux/Action';
import {Language} from '../utilities/Language';

const CreateNewLabel = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const [text, onChangeText] = useState('');
  const textInputRef = useRef(true);
  const [closeIcon, setCloseIcon] = useState(null);
  const [selectedLabelId, setSelectedLabelId] = useState(null);
  const dispatch = useDispatch();
  const styles = GlobalStyleSheet();
  receivedLabels = useSelector(data => data.LabelReducer);
  const language = useSelector(state => state.LanguageReducer);
  const theme = useSelector(state => state.ThemeReducer);
  const getLabels = async () => {
    const fetchedLabels = await fetchLabels(user?.uid);
    dispatch(fetchingLabels(fetchedLabels));
  };
  useEffect(() => {
    getLabels();
  }, [closeIcon]);
  const handleBackPress = () => {
    navigation.goBack();
  };
  const handleAddLabel = () => {
    addLabel(user?.uid, text);
    handleClosePress();
  };
  const handleClosePress = () => {
    onChangeText('');
    Keyboard.dismiss();
    setCloseIcon(false);
  };
  const handlePlusPress = () => {
    textInputRef.current.focus();
    setCloseIcon(true);
  };
  const handleLabelSelect = id => {
    setSelectedLabelId(id);
  };
  return (
    <View style={styles.screen_container}>
      <View style={styles.create_note_header}>
        <TouchableOpacity onPress={handleBackPress}>
          <AntIcon name="arrowleft" size={25} style={styles.notes_content} />
        </TouchableOpacity>
        <Text style={styles.note_type}>
          {language === 'ENGLISH' ? Language[10].english : Language[10].hindi}
        </Text>
      </View>
      <View style={styles.create_note_header}>
        {closeIcon ? (
          <TouchableOpacity onPress={handleClosePress}>
            <AntIcon name="close" size={25} style={styles.notes_content} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handlePlusPress}>
            <AntIcon name="plus" size={25} style={styles.notes_content} />
          </TouchableOpacity>
        )}
        <TextInput
          ref={textInputRef}
          onFocus={() => {
            setCloseIcon(true);
            setSelectedLabelId(null);
          }}
          style={styles.notes_header_text}
          onChangeText={onChangeText}
          placeholder={
            language === 'ENGLISH' ? Language[5].english : Language[5].hindi
          }
          placeholderTextColor={
            theme == 'DARK'
              ? Constant.Color.whiteColor
              : Constant.Color.backgroundColor
          }
          value={text}
        />
        {closeIcon ? (
          <TouchableOpacity
            style={{marginLeft: Constant.margin.modalMargin}}
            onPress={handleAddLabel}>
            <AntIcon name="check" size={25} style={styles.notes_content} />
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
      <FlatList
        data={receivedLabels}
        renderItem={({item}) => (
          <LabelCard
            title={item.Label}
            id={item.id}
            isSelected={item.id === selectedLabelId}
            onSelect={handleLabelSelect}
          />
        )}
      />
    </View>
  );
};

export default CreateNewLabel;
