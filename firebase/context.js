import { createContext } from "react";
import { firebaseDB } from "./inti";

export const firebaseContext = createContext();

export const FirebaseProvider = (props) => {
  const createDB = (DBname, docID, docData) => {
    firebaseDB.collection(DBname).doc(docID).set(docData);
  };

  const write = (DBname, docID, docData) => {
    firebaseDB.collection(DBname).doc(docID).set(docData);
  };

  const readAllData = (DBname) => {
    const DBref = firebaseDB.collection(DBname);
    DBref.onSnapshot((querySnapshot) => {
      const dataArray = [];
      querySnapshot.forEach((doc) => {
        dataArray.push(doc.data());
        console.log(dataArray);
      });
    });
  };

  const readData = (DBname, docID) => {
    const docRef = firebaseDB.collection(DBname).doc(docID);

    docRef
      .get()
      .then((doc) => {
        console.log(doc.data());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteData = (DBname, docID) => {
    const docRef = firebaseDB.collection(DBname).doc(docID);
    docRef.delete();
  };

  return (
    <firebaseContext.Provider
      value={{ createDB, write, readAllData, readData, deleteData }}
    >
      {props.children}
    </firebaseContext.Provider>
  );
};
