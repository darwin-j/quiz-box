import { useRouter } from "next/router";
import { useEffect, useContext } from "react";
import { firebaseContext } from "../../firebase/context";
import { Text } from "@chakra-ui/react";
const user = () => {
  const router = useRouter();
  const userID = router.query.uid;
  const { readData, write } = useContext(firebaseContext);

  useEffect(() => {}, []);

  //write("userData", userID);

  return (
    <>
      <Text>Question</Text>
    </>
  );
};

export default user;
