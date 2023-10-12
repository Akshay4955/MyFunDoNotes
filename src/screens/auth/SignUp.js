import {View, Text} from 'react-native';
import React, {useContext, useState} from 'react';
import GlobalStyleSheet from '../../utilities/GlobalStyleSheet';
import UserInput from '../../components/UserInput';
import UserButton from '../../components/UserButton';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AuthContext} from '../../navigation/AuthenticationProvider';
import {useSelector} from 'react-redux';
import {Language} from '../../utilities/Language';

const SignUp = ({navigation}) => {
  const styles = GlobalStyleSheet();
  const [name, setName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [mobileNoError, setMobileNoError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const {signUp} = useContext(AuthContext);
  const language = useSelector(state => state.LanguageReducer);

  const validateInput = () => {
    const NAME_PATTERN = /^[A-Z][a-z]{2,}$/;
    const MOBILENO_PATTERN = /^(91)[\s][0-9]{10}$/;
    const EMAIL_PATTERN =
      /^[a-z]+([+_.-]?[a-zA-Z0-9])*[@][a-zA-Z0-9]+([.][a-z]{2,3}){1,2}$/;
    const PASSWORD_PATTERN =
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[~!@#$%&*-+])[A-Za-z0-9~!@#$%&*-+]{8,}$/;
    let isValidName = NAME_PATTERN.test(name);
    let isValidMobileNo = MOBILENO_PATTERN.test(mobileNo);
    let isValidEmail = EMAIL_PATTERN.test(userName);
    let isValidPassword = PASSWORD_PATTERN.test(password);
    if (isValidName) setNameError('');
    else
      setNameError(
        'Name should start with uppercase and more than 3 chars in length',
      );
    if (isValidMobileNo) setMobileNoError('');
    else setMobileNoError('Enter valid Mobile number');
    if (isValidEmail) setEmailError('');
    else setEmailError('Enter valid Email');
    if (isValidPassword) setPasswordError('');
    else
      setPasswordError(
        'Password should 8 characters in length, 1 uppercase, 1 number and 1 special character.',
      );
    return isValidName && isValidMobileNo && isValidEmail && isValidPassword;
  };
  const handleSignUpPress = () => {
    if (validateInput()) {
      signUp(name, mobileNo, userName, password);
    }
  };
  const handleHaveAccountPress = () => {
    navigation.navigate('Login');
  };
  return (
    <View style={styles.screen_container}>
      <Text style={styles.auth_screen_header}>
        {language === 'ENGLISH' ? Language[12].english : Language[12].hindi}
      </Text>
      <UserInput
        placeholder={
          language === 'ENGLISH' ? Language[20].english : Language[20].hindi
        }
        value={name}
        setText={setName}
      />
      <Text style={styles.auth_screen_error}>{nameError}</Text>
      <UserInput
        placeholder={
          language === 'ENGLISH' ? Language[21].english : Language[21].hindi
        }
        value={mobileNo}
        setText={setMobileNo}
      />
      <Text style={styles.auth_screen_error}>{mobileNoError}</Text>
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
          language === 'ENGLISH' ? Language[12].english : Language[12].hindi
        }
        handleOnPress={handleSignUpPress}
      />
      <TouchableOpacity onPress={handleHaveAccountPress}>
        <Text style={styles.auth_screen_button}>
          {language === 'ENGLISH' ? Language[13].english : Language[13].hindi}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;
