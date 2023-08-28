import {View, Text} from 'react-native';
import React, {useContext, useState} from 'react';
import GlobalStyleSheet from '../../utilities/GlobalStyleSheet';
import * as Constant from '../../utilities/Constant';
import UserInput from '../../components/UserInput';
import UserButton from '../../components/UserButton';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AuthContext} from '../../navigation/AuthenticationProvider';

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
      signUp(name, mobileNo, userName, password)
    }
  };
  const handleHaveAccountPress = () => {
    navigation.navigate('Login');
  };
  return (
    <View style={styles.screen_container}>
      <Text style={{fontSize: Constant.fontSize.extralarge}}>SignUp</Text>
      <UserInput placeholder="Enter Name" value={name} setText={setName} />
      <Text style={{color: 'red'}}>{nameError}</Text>
      <UserInput
        placeholder="Enter Mobile No"
        value={mobileNo}
        setText={setMobileNo}
      />
      <Text style={{color: 'red'}}>{mobileNoError}</Text>
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
      />
      <Text style={{color: 'red'}}>{passwordError}</Text>
      <UserButton name="SignUp" handleOnPress={handleSignUpPress} />
      <TouchableOpacity onPress={handleHaveAccountPress}>
        <Text style={{marginTop: Constant.margin.medium}}>
          Have an account? Login here.
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;
