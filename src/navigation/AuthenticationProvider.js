import {createContext, useState} from 'react';
import {addUser} from '../services/UserServices';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

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
            const userDetails = await auth().createUserWithEmailAndPassword(
              userName,
              password,
            );
            setUser(userDetails?.user);
            addUser(name, mobileNo, userName, password, userDetails.user?.uid);
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
            const userDetails = await auth().signInWithEmailAndPassword(
              userName,
              password,
            );
            setUser(userDetails?.user);
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
            const currentUser = auth()?.currentUser;
            setUser(currentUser);
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
