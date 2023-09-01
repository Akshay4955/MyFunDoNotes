import {View, Text} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import UserInput from '../../components/UserInput';
import GlobalStyleSheet from '../../utilities/GlobalStyleSheet';
import UserButton from '../../components/UserButton';
import * as Constant from '../../utilities/Constant';
import {AuthContext} from '../../navigation/AuthenticationProvider';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const Login = () => {
  const styles = GlobalStyleSheet();
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
      <Text style={{fontSize: Constant.fontSize.extralarge}}>Welcome</Text>
      <UserInput
        placeholder="Enter UserName"
        value={userName}
        setText={setUserName}
      />
      <Text style={{color: 'red'}}>{emailError}</Text>
      <UserInput
        placeholder="Enter Password"
        value={password}
        setText={setPassword}
        secured={true}
      />
      <Text style={{color: 'red'}}>{passwordError}</Text>
      <UserButton name="Login" handleOnPress={handleLoginPress} />
      <GoogleSigninButton
        style={{marginTop: Constant.margin.medium}}
        onPress={handleGoogleSignIn}></GoogleSigninButton>
    </View>
  );
};

export default Login;
