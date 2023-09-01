import {TextInput, View, Image, StyleSheet} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Constant from '../utilities/Constant';
import {AuthContext} from '../navigation/AuthenticationProvider';
import {fetchUser} from '../services/UserServices';

const NotesHeader = ({handleMenuPress, handleProfilePress}) => {
  const {user} = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const getUser = async () => {
    const userDetails = await fetchUser(user?.uid);
    console.log(userDetails);
    setUserData(userDetails);
  };
  useEffect(() => {
    getUser();
  }, [user, handleProfilePress]);
  const [text, onChangeText] = useState('');
  return (
    <View style={styles.notes_header}>
      <TouchableOpacity onPress={handleMenuPress}>
        <EntypoIcon name="menu" size={25} style={styles.header_Content} />
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
          style={styles.header_Content}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleProfilePress}>
        {user?.photoURL ? (
          <Image source={{uri: user?.photoURL}} style={styles.header_Content} />
        ) : (
          <Image
            source={
              userData?.profilePic
                ? {uri: userData.profilePic}
                : require('../assets/a.png')
            }
            style={styles.header_Content}
          />
        )}
        {/* <Image
          source={require('../assets/a.png')}
          style={styles.header_Content}
        /> */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  notes_header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: Constant.margin.medium,
    marginVertical: Constant.margin.medium,
    height: Constant.height.small,
    width: Constant.width.extralarge,
    borderRadius: Constant.borderRadius.large,
    backgroundColor: Constant.Color.lightColor,
  },
  notes_header_text: {
    fontSize: Constant.fontSize.small,
    fontWeight: '300',
    color: Constant.Color.whiteColor,
    width: Constant.width.large,
    marginLeft: Constant.margin.medium,
  },
  header_Content: {
    height: Constant.height.verysmall,
    width: Constant.width.verySmall,
    marginLeft: Constant.margin.medium,
    borderRadius: Constant.borderRadius.small,
  },
});

export default NotesHeader;
