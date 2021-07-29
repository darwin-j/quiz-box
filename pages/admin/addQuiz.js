import { useState, useContext } from "react";
import { storage } from "../../firebase/inti";
import { firebaseContext } from "../../firebase/context";
import { v4 as uuidv4 } from "uuid";
import {
  Input,
  FormControl,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Progress,
  Button,
} from "@chakra-ui/react";
import { AiFillFileImage } from "react-icons/ai";

const addQuiz = () => {
  const [question, setQuestion] = useState();
  const [urls, setUrls] = useState([]);
  const [progress, setProgress] = useState();
  const [quesId, setQuesId] = useState();
  const { write, firebaseTimeStamp, getLastDocNum, number } =
    useContext(firebaseContext);

  const handleImages = (imageFiles) => {
    getLastDocNum("quizQuestions");
    const selectedImages = [...imageFiles];
    const id = uuidv4();
    setQuesId(id);
    selectedImages.forEach(async (image) => {
      const storageRef = storage.ref(`images/${id}/${image.name}`);
      const uploadTask = storageRef.put(image);
      uploadTask.on("state_changed", function (snapshot) {
        const progressCal = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progressCal);
        if (progressCal == 100) {
          storageRef.getDownloadURL().then((url) => {
            setUrls((prevUrls) => [...prevUrls, url]);
          });
        }
      });
    });
  };

  if (urls.length == 4) {
  }

  const handleForm = () => {
    const uploadData = {
      quesNum: number + 1,
      quesId,
      question,
      option: [
        { url: urls[0], isCorrect: false },
        { url: urls[1], isCorrect: false },
        { url: urls[2], isCorrect: false },
        { url: urls[3], isCorrect: false },
      ],
      timeStamp: firebaseTimeStamp.seconds,
    };
    write("quizQuestions", quesId, uploadData);
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
      <Button onClick={handleForm} my="50px">
        Upload
      </Button>
      {console.log(progress)}
      <Progress maxW="200px" value={progress} />
      {/* {urls.length > 0 ? console.log(urls) : "no"} */}
    </>
  );
};

export default addQuiz;
