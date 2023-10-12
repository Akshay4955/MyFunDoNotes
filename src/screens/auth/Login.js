import {View, Text} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import UserInput from '../../components/UserInput';
import GlobalStyleSheet from '../../utilities/GlobalStyleSheet';
import UserButton from '../../components/UserButton';
import {AuthContext} from '../../navigation/AuthenticationProvider';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {Language} from '../../utilities/Language';
import {useSelector} from 'react-redux';

const Login = () => {
  const styles = GlobalStyleSheet();
  const language = useSelector(state => state.LanguageReducer);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const {signIn, googleSignIn} = useContext(AuthContext);
  const validateEmailAndPassword = () => {
    const EMAIL_PATTERN =
      /^[a-z]+([+_.-]?[a-zA-Z0-9])*[@][a-zA-Z0-9]+([.][a-z]{2,3}){1,2}$/;
    const PASSWORD_PATTERN =
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[~!@#$%&*-+])[A-Za-z0-9~!@#$%&*-+]{8,}$/;
    let isValidEmail = EMAIL_PATTERN.test(userName);
    let isValidPassword = PASSWORD_PATTERN.test(password);
    if (isValidEmail) setEmailError('');
    else setEmailError('Plz enter valid email');

    if (isValidPassword) setPasswordError('');
    else
      setPasswordError(
        'Password should 8 characters in length, 1 uppercase, 1 number and 1 special character.',
      );
    return isValidEmail && isValidPassword;
  };
  const handleLoginPress = () => {
    if (validateEmailAndPassword()) signIn(userName, password);
  };
  const handleGoogleSignIn = () => {
    googleSignIn();
  };
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '902227265527-li3q482upf349ivuh3e5ah95dcm06bhm.apps.googleusercontent.com',
    });
  }, []);
  return (
    <View style={styles.screen_container}>
      <Text style={styles.auth_screen_header}>
        {language === 'ENGLISH' ? Language[24].english : Language[24].hindi}
      </Text>
      <UserInput
        placeholder={
          language === 'ENGLISH' ? Language[22].english : Language[22].hindi
        }
        value={userName}
        setText={setUserName}
      />
      <Text style={styles.auth_screen_error}>{emailError}</Text>
      <UserInput
        placeholder={
          language === 'ENGLISH' ? Language[23].english : Language[23].hindi
        }
        value={password}
        setText={setPassword}
        secured={true}
      />
      <Text style={styles.auth_screen_error}>{passwordError}</Text>
      <UserButton
        name={
          language === 'ENGLISH' ? Language[24].english : Language[24].hindi
        }
        handleOnPress={handleLoginPress}
      />
      <GoogleSigninButton
        style={styles.auth_screen_button}
        onPress={handleGoogleSignIn}></GoogleSigninButton>
    </View>
  );
};

export default Login;
