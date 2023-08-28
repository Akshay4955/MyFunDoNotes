import {View, Text} from 'react-native';
import {createContext, useState} from 'react';
import {addUser} from '../services/UserServices';
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/firestore';

export const AuthContext = createContext('');
const AuthenticationProvider = ({children}) => {
  const [user, setUser] = useState({});
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        signUp: async (name, mobileNo, userName, password) => {
          try {
            await auth()
              .createUserWithEmailAndPassword(userName, password)
              .then(userDetails => {
                setUser(userDetails.user);
              });
            const loggedUser = auth().currentUser;
            addUser(name, mobileNo, userName, password, loggedUser.uid);
          } catch (error) {
            console.log(error);
          }
        },
        logOut: async () => {
          try {
            await auth().signOut();
            setUser({});
          } catch (error) {
            console.log(error);
          }
        },
        signIn: async (userName, password) => {
          try {
            await auth()
              .signInWithEmailAndPassword(userName, password)
              .then(userDetails => {
                setUser(userDetails.user);
              });
          } catch (error) {
            console.log(error);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthenticationProvider;
