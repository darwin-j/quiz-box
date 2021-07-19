import { useState } from "react";
import { storage } from "../../firebase/inti";
import { v4 as uuidv4 } from "uuid";
import {
  Input,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  FormErrorMessage,
  Code,
  Icon,
  Text,
  InputRightElement,
} from "@chakra-ui/react";
import { AiFillFileImage } from "react-icons/ai";

const addQuiz = () => {
  const [question, setQuestion] = useState();
  const [urls, setUrls] = useState([]);

  const handleImages = (imageFiles) => {
    const selectedImages = [...imageFiles];
    const id = uuidv4();
    selectedImages.forEach(async (image) => {
      const storageRef = storage.ref(`images/${id}/${image.name}`);
      await storageRef.put(image);
      const url = await storageRef.getDownloadURL();
      setUrls((prevUrls) => [...prevUrls, url]);
    });
  };

  return (
    <>
      <FormControl>
        <Input
          placeholder="Enter Question"
          onChange={(e) => setQuestion(e.target.value)}
        />
        <InputGroup w="195px">
          <label>
            <InputLeftElement children={<AiFillFileImage size="30px" />} />
            <Input
              type="file"
              multiple
              accept=".png,.jpg,.jpeg"
              style={{ display: "none" }}
              onChange={(e) => handleImages(e.target.files)}
            />
            <InputRightElement children="select 4 images" w="200px" />
          </label>
        </InputGroup>
      </FormControl>
    </>
  );
};

export default addQuiz;
