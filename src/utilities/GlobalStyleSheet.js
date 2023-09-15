import {StyleSheet} from 'react-native';
import * as Constant from '../utilities/Constant';

const GlobalStyleSheet = () => {
  return StyleSheet.create({
    auth_screen_button: {
      marginTop: Constant.margin.large,
    },
    auth_screen_error: {
      color: Constant.Color.error,
    },
    auth_screen_header: {
      fontSize: Constant.fontSize.extralarge,
    },
    create_note_footer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      height: Constant.height.small,
      width: Constant.width.full,
      marginLeft: Constant.margin.small,
    },
    create_note_header: {
      flexDirection: 'row',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'flex-start',
      marginHorizontal: Constant.margin.medium,
      marginVertical: Constant.margin.medium,
      padding: Constant.padding.small,
      height: Constant.height.small,
      width: Constant.width.extralarge,
    },
    createNote_note_content: {
      marginLeft: Constant.margin.large,
      fontSize: Constant.fontSize.small,
      width: Constant.width.full,
      paddingVertical: 10,
      paddingHorizontal: 10,
      position: 'relative',
      textAlignVertical: 'top',
    },

    createNote_title_text: {
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      width: Constant.width.extralarge,
      fontSize: Constant.fontSize.large,
      marginLeft: Constant.margin.medium,
    },
    notes_container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Constant.Color.backgroundColor,
    },
    note_type: {
      fontSize: Constant.fontSize.medium,
      textAlign: 'left',
      marginLeft: Constant.margin.small,
    },
    notes_add_icon: {
      marginLeft: Constant.margin.extralarge,
      marginBottom: Constant.margin.large,
    },
    notes_content: {
      height: Constant.height.verysmall,
      width: Constant.width.verySmall,
      margin: Constant.margin.medium,
      borderRadius: Constant.borderRadius.small,
    },
    notes_container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      backgroundColor: Constant.Color.backgroundColor,
    },
    notes_footer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      height: Constant.height.large,
      width: Constant.width.full,
      backgroundColor: Constant.Color.lightColor,
      marginLeft: Constant.margin.small,
    },
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
      marginLeft: Constant.margin.small,
    },
    screen_container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Constant.Color.backgroundColor,
    },
    label_text: {
      fontSize: Constant.fontSize.small,
      fontWeight: '300',
      color: Constant.Color.whiteColor,
      width: Constant.width.label,
      marginLeft: Constant.margin.medium,
    },
    chipContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignSelf: 'flex-start',
    },
    chip: {
      marginLeft: Constant.margin.verySmall,
      height: Constant.height.modalButton,
      backgroundColor: Constant.Color.activeTintColor,
    },
  });
};

export default GlobalStyleSheet;
