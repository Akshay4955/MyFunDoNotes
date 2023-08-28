import {scaleHeight, scaleWidth, scaleSize} from './ScaleComponent';

export const Color = {
  backgroundColor: '#17181B',
  activeBackgorundColor: '#5A667D',
  activeTintColor: '#A0B0D0',
  inActiveTintColor: '#D6DCE6',
  mediumColor: '#27292E',
  lightColor: '#26292E',
  whiteColor: 'white',
};

export const borderWidth = {
  // small: 0.7,
  medium: 0.9,
  // large: 1.1,
  // extralarge: 1.3,
};

export const margin = {
  // verysmall: 2,
  // small: 8,
  medium: 10,
  large: 20,
  auth_screen: 25,
  extralarge: 140,
  headerMargin: 190,
};
export const width = {
  verySmall: scaleWidth(25),
  //   small: scaleWidth(100),
  medium: scaleWidth(180),
  large: scaleWidth(250),
  extralarge: scaleWidth(390),
  full: scaleWidth(410),
};
export const height = {
  verysmall: scaleHeight(25),
  small: scaleHeight(50),
  medium: scaleHeight(60),
  large: scaleHeight(90),
  extralarge: scaleHeight(800),
};

export const borderRadius = {
  small: 12,
  //   medium: 20,
  large: 24,
  //   extralarge: 26,
};

export const fontSize = {
  small: scaleSize(16),
  medium: scaleSize(20),
  large: scaleSize(24),
  extralarge: scaleSize(40),
};

export const padding = {
  small: 5,
  medium: 15,
  // large: 12,
  // extralarge: 14,
};
