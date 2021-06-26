import { useContext } from "react";
import { firebaseContext } from "../firebase/context";

export default function Home() {
  const [createDB, write, readAllData, readData, deleteData] =
    useContext(firebaseContext);

  return <></>;
}
