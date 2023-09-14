import firestore from '@react-native-firebase/firestore';

const usersCollection = firestore().collection('Users');
export const addNote = async (
  uid,
  title,
  data,
  pinnedData,
  archiveData,
  deleteData,
  selectedLabels,
) => {
  usersCollection.doc(uid).collection('Notes').add({
    title: title,
    data: data,
    pinnedData: pinnedData,
    archiveData: archiveData,
    deleteData: deleteData,
    selectedLabels: selectedLabels,
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
  selectedLabels,
) => {
  await usersCollection.doc(uid).collection('Notes').doc(noteId).update({
    title: title,
    data: data,
    pinnedData: pinnedData,
    archiveData: archiveData,
    deleteData: deleteData,
    selectedLabels: selectedLabels,
  });
};
export const deleteNote = async (uid, noteId) => {
  await usersCollection.doc(uid).collection('Notes').doc(noteId).delete();
};
