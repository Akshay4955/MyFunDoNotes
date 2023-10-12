import SQLite from 'react-native-sqlite-storage';

const tableName = 'Notes';
const db = SQLite.openDatabase({name: 'FunDoNotes'});

export const createTable = () => {
  db.transaction(txn => {
    txn.executeSql(
      `CREATE TABLE IF NOT EXISTS ${tableName} (Id INTEGER PRIMARY KEY AUTOINCREMENT, Title TEXT, Note TEXT, ArchiveData INTEGER, PinnedData INTEGER, DeleteData INTEGER, NetInfo INTEGER);`,
      [],
      () => {
        console.log('Table created successfully');
      },
      () => {
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
  netInfo,
) => {
  try {
    await db.transaction(async txn => {
      (pinnedData = pinnedData ? 1 : 0),
        (deleteData = deleteData ? 1 : 0),
        (archiveData = archiveData ? 1 : 0),
        (netInfo = netInfo ? 1 : 0);
      await txn.executeSql(
        `INSERT INTO ${tableName} (Title, Note, ArchiveData, PinnedData, DeleteData, NetInfo) VALUES (?, ?, ?, ?, ?, ?)`,
        [title, note, archiveData, pinnedData, deleteData, netInfo],
        () => console.log('Data added successfully'),
        () => console.log('Error while adding data'),
      );
    });
  } catch (error) {
    console.log('Error in adding note', error);
  }
};

// export const fetchNoteSQL = () => {
//   let data;
//   db.transaction(tx => {
//     const temp = [];
//     tx.executeSql(`SELECT * FROM ${tableName} `, [], (tx, results, data) => {
//       for (let i = 0; i < results.rows.length; ++i) {
//         temp.push(results.rows.item(i));
//       }
//       console.log('Result ', temp);
//       data = temp;
//     });
//   });
//   return data;
// };

export const fetchNoteSQL = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      const temp = [];
      tx.executeSql(`SELECT * FROM ${tableName} `, [], (tx, results) => {
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        resolve(temp);
      });
    });
  });
};

export const updateNoteSQL = async (
  noteId,
  title,
  note,
  archiveData,
  pinnedData,
  deleteData,
  netInfo,
) => {
  try {
    await db.transaction(async txn => {
      (pinnedData = pinnedData ? 1 : 0),
        (deleteData = deleteData ? 1 : 0),
        (archiveData = archiveData ? 1 : 0),
        (netInfo = netInfo ? 1 : 0);
      await txn.executeSql(
        `UPDATE ${tableName} set Title = ?, Note = ?, ArchiveData = ?, PinnedData = ?, DeleteData = ?, NetInfo = ? where Id = ? `,
        [title, note, archiveData, pinnedData, deleteData, netInfo, noteId],
        () => console.log('Data updated successfully'),
        () => console.log('Error while updating data'),
      );
    });
  } catch (error) {
    console.log('Error in updating note', error);
  }
};
