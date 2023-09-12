import firestore from '@react-native-firebase/firestore';

const usersCollection = firestore().collection('Users');

export const addLabel = (uid, labelName) => {
  usersCollection.doc(uid).collection('Labels').add({
    Label: labelName,
  });
};

export const fetchLabels = async uid => {
  const labelsData = [];
  const querySnapshot = await usersCollection
    .doc(uid)
    .collection('Labels')
    .get();

  querySnapshot.forEach(documentSnapshot => {
    const data = documentSnapshot.data();
    data.id = documentSnapshot.id;
    labelsData.push(data);
  });
  return labelsData;
};

export const updateLabel = async (uid, labelId, labelName) => {
  await usersCollection.doc(uid).collection('Labels').doc(labelId).update({
    Label: labelName,
  });
};

export const deleteLabel = async (uid, labelId) => {
  await usersCollection.doc(uid).collection('Labels').doc(labelId).delete();
};
