import {scaleHeight, scaleWidth, scaleSize} from './ScaleComponent';

export const Color = {
  backgroundColor: '#17181B',
  activeBackgorundColor: '#5A667D',
  activeTintColor: '#A0B0D0',
  inActiveTintColor: '#D6DCE6',
  mediumColor: '#27292E',
  lightColor: '#26292E',
  whiteColor: 'white',
  error: 'red',
};

export const borderWidth = {
  small: 0.9,
  medium: 2,
  large: 10,
  extralarge: 50,
};

export const margin = {
  verySmall: 5,
  small: 8,
  medium: 10,
  large: 15,
  modalMargin: 40,
  auth_screen: 25,
  extralarge: 140,
  headerMargin: 220,
  footerMargin: 320,
};
export const width = {
  verySmall: scaleWidth(25),
  small: scaleWidth(70),
  medium: scaleWidth(180),
  large: scaleWidth(240),
  label: scaleWidth(300),
  extralarge: scaleWidth(390),
  full: scaleWidth(410),
};
export const height = {
  verysmall: scaleHeight(25),
  modalButton: scaleHeight(35),
  small: scaleHeight(50),
  profilePic: scaleHeight(70),
  medium: scaleHeight(60),
  large: scaleHeight(90),
  noteHeight: scaleHeight(150),
  modal3Height: scaleHeight(250),
  modalHeight: scaleHeight(350),
  extralarge: scaleHeight(800),
};

export const borderRadius = {
  small: 12,
  large: 24,
  extralarge: 28,
};

export const fontSize = {
  verySmall: scaleSize(12),
  small: scaleSize(16),
  medium: scaleSize(20),
  large: scaleSize(24),
  extralarge: scaleSize(40),
};

export const padding = {
  small: 5,
  medium: 15,
};
