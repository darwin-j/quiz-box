import { useRouter } from "next/router";
import { useEffect, useContext, useState } from "react";
import { firebaseContext } from "../../firebase/context";
import { Text } from "@chakra-ui/react";
const user = () => {
  const router = useRouter();
  const id = router.query.uid;
  const [questions, setQuestions] = useState([]);
  const { getDataByQuesNum, getDataByDocId, question, write, user } =
    useContext(firebaseContext);
  const [questionNumber, setQuestionNumber] = useState(0);

  useEffect(() => {
    id ? getDataByDocId("userData", id) : "";
    getDataByQuesNum("quizQuestions", questionNumber);
  }, [questionNumber]);

  const handleClick = (index) => {
    question.option[index].isCorrect = true;
    setQuestions([...questions, question]);
    questions.length == 3
      ? write("userData", id, {
          id,
          name: user.name,
          questions,
        })
      : "";

    setQuestionNumber(questionNumber + 1);
  };

  return (
    <>
      {console.log(user)}
      <Text>{question ? question.question : "loading"}</Text>
      <ul>
        {question
          ? question.option.map((chose, index) => (
              <li key={index}>
                <img src={chose.url} onClick={() => handleClick(index)} />
              </li>
            ))
          : "loading"}
      </ul>
    </>
  );
};

export default user;
