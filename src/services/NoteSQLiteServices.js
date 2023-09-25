import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({name: 'FunDoNotes'});

export const createTable = () => {
  db.transaction(txn => {
    txn.executeSql(
      `CREATE TABLE IF NOT EXISTS FunDoNotes (Title TEXT, Note TEXT, ArchiveData INTEGER, PinnedData INTEGER, DeleteData INTEGER);`,
      [],
      (tx, results) => {
        console.log('Table created successfully');
      },
      error => {
        console.log('Error while creating table');
      },
    );
  });
};

export const addNoteSQL = async (
  title,
  note,
  archiveData,
  pinnedData,
  deleteData,
) => {
  try {
    await db.transaction(async txn => {
      (pinnedData = pinnedData ? 1 : 0),
        (deleteData = deleteData ? 1 : 0),
        (archiveData = archiveData ? 1 : 0),
        await txn.executeSql(
          `INSERT INTO FunDoNotes (Title, Note, ArchiveData, PinnedData, DeleteData) VALUES (?, ?, ?, ?, ?)`,
          [title, note, archiveData, pinnedData, deleteData],
          () => console.log('Data added successfully'),
          () => console.log('Error while adding data'),
        );
    });
  } catch (error) {
    console.log('Error in adding note', error);
  }
};

export const fetchNoteSQL = () => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM FunDoNotes', [], (tx, results) => {
      var temp = [];
      for (let i = 0; i < results.rows.length; ++i) {
        temp.push(results.rows.item(i));
      }
      console.log('Result ', temp);
    });
  });
};
