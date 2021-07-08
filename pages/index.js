import { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { firebaseContext } from "../firebase/context";
import { v4 as uuidv4 } from "uuid";
////////////////////////////
import { Input, Text, Heading, Button } from "@chakra-ui/react";
////////////////////////////
export default function Home() {
  const [createDB, write, readAllData, readData, deleteData] =
    useContext(firebaseContext);
  const [name, setName] = useState();

  const userData = {
    id: uuidv4(),
    name: name,
  };

  const createUser = () => {
    write("userData", userData.id, userData);
  };

  return (
    <>
      <Heading size="lg">How Well Do Your Friends Know You?</Heading>
      <Text fontSize="lg">Enter your Name</Text>
      <Input
        placeholder="Name"
        size="lg"
        onChange={(e) => setName(e.target.value)}
      />
      <Link href={`/user/${userData.id}`}>
        <Button size="lg" onClick={createUser}>
          confirm
        </Button>
      </Link>
    </>
  );
}
