import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import React, {useContext, useState, useRef} from 'react';
import * as Constant from '../utilities/Constant';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {updateLabel, deleteLabel, fetchLabels} from '../services/LabelServices';
import {AuthContext} from '../navigation/AuthenticationProvider';
import {useDispatch} from 'react-redux';
import {fetchingLabels} from '../redux/Action';

const LabelCard = ({title, id, isSelected, onSelect}) => {
  const {user} = useContext(AuthContext);
  const textInputRef = useRef(true);
  const [text, setText] = useState(title);
  const dispatch = useDispatch();
  const getLabels = async () => {
    const fetchedLabels = await fetchLabels(user?.uid);
    dispatch(fetchingLabels(fetchedLabels));
  };
  const handleOnFocus = () => {
    onSelect(id);
  };
  const handleDeletePress = () => {
    deleteLabel(user?.uid, id);
    getLabels();
  };
  const handleUpdatePress = () => {
    updateLabel(user?.uid, id, text);
    getLabels();
  };
  const handleEditPress = () => {
    textInputRef.current.focus();
  };
  return (
    <View style={styles.label}>
      {isSelected ? (
        <TouchableOpacity onPress={handleDeletePress}>
          <AntIcon name="delete" size={25} />
        </TouchableOpacity>
      ) : (
        <MaterialIcon name="label-outline" size={25} />
      )}
      <TouchableOpacity onPress={handleOnFocus}>
        <TextInput
          ref={textInputRef}
          onFocus={handleOnFocus}
          onChangeText={setText}
          value={text}
          style={styles.name}></TextInput>
      </TouchableOpacity>

      {isSelected ? (
        <TouchableOpacity onPress={handleUpdatePress}>
          <AntIcon name="check" size={25} style={styles.editIcon} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handleEditPress}>
          <FontAwesomeIcon name="pencil" size={25} style={styles.editIcon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default LabelCard;

const styles = StyleSheet.create({
  label: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: Constant.margin.verySmall,
    marginVertical: Constant.margin.verySmall,
    padding: Constant.padding.small,
    height: Constant.height.small,
    width: Constant.width.extralarge,
  },
  name: {
    marginLeft: Constant.margin.small,
    width: Constant.width.label,
  },
  editIcon: {
    marginLeft: Constant.margin.small,
  },
});
