import firestore from '@react-native-firebase/firestore';

const usersCollection = firestore().collection('Users');
export const addUser = (name, mobileNo, userName, password, uid) => {
  usersCollection.doc(uid).set({
    name: name,
    mobileNo: mobileNo,
    userName: userName,
    password: password,
  });
};
export const fetchUser = async userUid => {
  return await usersCollection
    .doc(userUid)
    .get()
    .then(item => {
      const data = item.data();
      return data;
    });
};
