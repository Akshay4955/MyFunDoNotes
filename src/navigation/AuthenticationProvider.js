import {View, Text} from 'react-native';
import {createContext, useState} from 'react';
import {addUser} from '../services/UserServices';
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/firestore';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

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
        googleSignIn: async () => {
          try {
            const {idToken} = await GoogleSignin.signIn();
            const googleCredential =
              auth.GoogleAuthProvider.credential(idToken);
            await auth().signInWithCredential(googleCredential);
          } catch (error) {
            console.log(error);
          }
        },
        // googleSignIn: async () => {
        //   try {
        //     await GoogleSignin.hasPlayServices();
        //     const userInfo = await GoogleSignin.signIn();
        //     setUser(userInfo.user);
        //     addUser(
        //       userInfo.user.givenName,
        //       userInfo.user.familyName,
        //       userInfo.user.email,
        //       userInfo.user.id,
        //       userInfo.user.id,
        //     );
        //   } catch (error) {
        //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        //       console.log('user cancelled the login flow');
        //       // user cancelled the login flow
        //     } else if (error.code === statusCodes.IN_PROGRESS) {
        //       console.log('operation (e.g. sign in) is in progress already');
        //       // operation (e.g. sign in) is in progress already
        //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        //       console.log('play services not available or outdated');
        //       // play services not available or outdated
        //     } else {
        //       console.log('some other error happened');
        //       // some other error happened
        //     }
        //   }
        // },
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthenticationProvider;
