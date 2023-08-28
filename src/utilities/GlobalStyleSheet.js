import {StyleSheet} from 'react-native';
import React from 'react';
import * as Constant from '../utilities/Constant';

const GlobalStyleSheet = () => {
  return StyleSheet.create({
    screen_container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Constant.Color.backgroundColor,
    },
    notes_header: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      marginHorizontal: Constant.margin.medium,
      marginVertical: Constant.margin.medium,
      height: Constant.height.small,
      width: Constant.width.full,
      borderRadius: Constant.borderRadius.large,
      backgroundColor: Constant.Color.lightColor,
    },
    notes_header_text: {
      fontSize: Constant.fontSize.medium,
      fontWeight: '300',
      color: '#ffffff',
    },
    note_title_container: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      width: Constant.width.extralarge,
      height: Constant.height.small,
    },
    note_title_text: {
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      width: Constant.width.extralarge,
      fontSize: Constant.fontSize.large,
      marginLeft: Constant.margin.medium,
      fontWeight: 'bold',
    },
    note_container: {
      flex: 1, 
      justifyContent: 'flex-start',
      alignItems: 'flex-start'
    },
    note_content: {
      marginLeft: Constant.margin.large,
      fontSize: Constant.fontSize.small,
      width: Constant.width.full,
      height: Constant.height.extralarge,
      paddingVertical: 10,
      paddingHorizontal: 10,
      position: 'relative',
      textAlignVertical: 'top',
    },
  });
};

export default GlobalStyleSheet;
