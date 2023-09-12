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
  const notesData = [];
  const querySnapshot = await usersCollection
    .doc(uid)
    .collection('Notes')
    .get();

  querySnapshot.forEach(documentSnapshot => {
    const data = documentSnapshot.data();
    data.id = documentSnapshot.id;
    notesData.push(data);
  });
  return notesData;
};
export const updateNote = async (
  uid,
  title,
  data,
  pinnedData,
  archiveData,
  deleteData,
  noteId,
) => {
  await usersCollection.doc(uid).collection('Notes').doc(noteId).update({
    title: title,
    data: data,
    pinnedData: pinnedData,
    archiveData: archiveData,
    deleteData: deleteData,
  });
};
export const deleteNote = async (uid, noteId) => {
  await usersCollection.doc(uid).collection('Notes').doc(noteId).delete();
};
