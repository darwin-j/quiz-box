import { createContext, useState } from "react";
import { firebaseDB, firebaseTimeStamp } from "./inti";

export const firebaseContext = createContext();

export const FirebaseProvider = (props) => {
  const [number, setNumber] = useState();

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

  const getLastDocNum = (DBname) => {
    const docRef = firebaseDB.collection(DBname);
    docRef
      .orderBy("timeStamp", "desc")
      .limit(1)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          setNumber(data.quesNum);
        });
      });
  };

  const deleteData = (DBname, docID) => {
    const docRef = firebaseDB.collection(DBname).doc(docID);
    docRef.delete();
  };

  return (
    <firebaseContext.Provider
      value={{
        createDB,
        write,
        readAllData,
        readData,
        deleteData,
        firebaseTimeStamp,
        getLastDocNum,
        number,
      }}
    >
      {props.children}
    </firebaseContext.Provider>
  );
};
