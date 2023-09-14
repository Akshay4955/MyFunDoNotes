import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
} from 'react-native';
import React from 'react';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import * as Constant from '../utilities/Constant';
import {useSelector} from 'react-redux';
import {FlatList} from 'react-native-gesture-handler';

const CustomDrawer = ({navigation}) => {
  receivedLabels = useSelector(data => data.LabelReducer);
  return (
    <ScrollView style={styles.container} nestedScrollEnabled={true}>
      <Text style={styles.header}>Fun Do Notes</Text>
      <TouchableOpacity
        style={styles.screen}
        onPress={() => {
          navigation.navigate('Notes');
        }}>
        <AntIcon
          name="bulb1"
          size={25}
          color={Constant.Color.inActiveTintColor}
        />
        <Text style={styles.screen_text}>Notes</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.screen}
        onPress={() => {
          navigation.navigate('Reminders');
        }}>
        <AntIcon
          name="bells"
          size={25}
          color={Constant.Color.inActiveTintColor}
        />
        <Text style={styles.screen_text}>Reminders</Text>
      </TouchableOpacity>
      {receivedLabels.length === 0 ? (
        <TouchableOpacity
          style={styles.screen}
          onPress={() => {
            navigation.navigate('Create New Label');
          }}>
          <AntIcon
            name="plus"
            size={25}
            color={Constant.Color.inActiveTintColor}
          />
          <Text style={styles.screen_text}>Create New Label</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.create_label_container}>
          <FlatList
            data={receivedLabels}
            renderItem={({item}) => (
              <View style={styles.screen}>
                <MaterialIcon name="label-outline" size={25} />
                <Text style={styles.screen_text}>{item.Label}</Text>
              </View>
            )}
          />
          <TouchableOpacity
            style={styles.screen}
            onPress={() => {
              navigation.navigate('Create New Label');
            }}>
            <AntIcon
              name="plus"
              size={25}
              color={Constant.Color.inActiveTintColor}
            />
            <Text style={styles.screen_text}>Create New Label</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        style={styles.screen}
        onPress={() => {
          navigation.navigate('Archive');
        }}>
        <FoundationIcon
          name="archive"
          size={25}
          color={Constant.Color.inActiveTintColor}
        />
        <Text style={styles.screen_text}>Archive</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.screen}
        onPress={() => {
          navigation.navigate('Deleted');
        }}>
        <AntIcon
          name="delete"
          size={25}
          color={Constant.Color.inActiveTintColor}
        />
        <Text style={styles.screen_text}>Deleted</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.screen}
        onPress={() => {
          navigation.navigate('Settings');
        }}>
        <AntIcon
          name="setting"
          size={25}
          color={Constant.Color.inActiveTintColor}
        />
        <Text style={styles.screen_text}>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.screen}
        onPress={() => {
          navigation.navigate('Help & Feedback');
        }}>
        <IonIcon
          name="help-circle"
          size={25}
          color={Constant.Color.inActiveTintColor}
        />
        <Text style={styles.screen_text}>Help & Feedback</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginLeft: Constant.margin.large,
    marginTop: Constant.margin.large,
    fontSize: Constant.fontSize.medium,
  },
  screen: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Constant.margin.medium,
    marginLeft: Constant.margin.medium,
    padding: Constant.padding.small,
    height: Constant.height.small,
    borderRadius: Constant.borderRadius.large,
  },
  screen_text: {
    marginLeft: Constant.margin.medium,
    fontSize: Constant.fontSize.small,
  },
  create_label_container: {
    borderColor: Constant.Color.activeTintColor,
    borderTopWidth: Constant.borderWidth.small,
    borderBottomWidth: Constant.borderWidth.small,
  },
});
