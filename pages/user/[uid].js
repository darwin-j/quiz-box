import { useRouter } from "next/router";
import { useEffect, useContext } from "react";
import { firebaseContext } from "../../firebase/context";
const user = () => {
  const router = useRouter();
  const userID = router.query.uid;
  const { readData, write } = useContext(firebaseContext);

  //write("userData", userID);

  return <div></div>;
};

export default user;
