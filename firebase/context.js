import { createContext, useState } from "react";
import { firebaseDB, firebaseTimeStamp } from "./inti";

export const firebaseContext = createContext();

export const FirebaseProvider = (props) => {
  const [number, setNumber] = useState(0);
  const [question, setQuestion] = useState();
  const [user, setUser] = useState();

  const createDB = (DBname, docID, docData) => {
    firebaseDB.collection(DBname).doc(docID).set(docData);
  };

  const write = (DBname, docID, docData) => {
    firebaseDB.collection(DBname).doc(docID).set(docData);
  };

  const getAllData = (DBname) => {
    const DBref = firebaseDB.collection(DBname);
    DBref.onSnapshot((querySnapshot) => {
      const dataArray = [];
      querySnapshot.forEach((doc) => {
        dataArray.push(doc.data());
        console.log(dataArray);
      });
    });
  };

  const getDataByDocId = (DBname, docID) => {
    const docRef = firebaseDB.collection(DBname).doc(docID);
    docRef
      .get()
      .then((data) => setUser(data.data()))
      .catch((err) => console.log(err));
  };

  const getDataByQuesNum = (DBname, quesNum) => {
    const docRef = firebaseDB.collection(DBname);
    docRef
      .where("quesNum", ">", quesNum)
      .limit(1)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setQuestion(doc.data());
        });
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
        getAllData,
        getDataByDocId,
        deleteData,
        firebaseTimeStamp,
        getLastDocNum,
        getDataByQuesNum,
        number,
        question,
        user,
      }}
    >
      {props.children}
    </firebaseContext.Provider>
  );
};
