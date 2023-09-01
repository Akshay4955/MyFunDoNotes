import firestore from '@react-native-firebase/firestore';

const usersCollection = firestore().collection('Users');
export const addNote = async (
  uid,
  title,
  data,
  pinnedData,
  archiveData,
  deleteData,
) => {
  usersCollection.doc(uid).collection('Notes').add({
    title: title,
    data: data,
    pinnedData: pinnedData,
    archiveData: archiveData,
    deleteData: deleteData,
  });
};
export const fetchNotes = async uid => {
  return await usersCollection
    .doc(uid)
    .collection('Notes')
    .get()
    .then(notesData => {
      const notes = notesData.docs;
      return notes;
    });
};
export const updateNotes = async (
  uid,
  title,
  data,
  pinnedData,
  archiveData,
  deleteData,
) => {
  usersCollection
    .doc(uid)
    .collection('Notes')
    .doc('')
    .update({title, data, pinnedData, archiveData, deleteData});
};
