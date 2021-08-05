import { useRouter } from "next/router";
import { useEffect, useContext, useState } from "react";
import { firebaseContext } from "../../firebase/context";
import { Button, Text } from "@chakra-ui/react";
const user = () => {
  const router = useRouter();
  const id = router.query.uid;
  const [questions, setQuestions] = useState([]);
  const { getDataByQuesNum, getDataByDocId, question, write, user } =
    useContext(firebaseContext);
  const [questionNumber, setQuestionNumber] = useState(0);

  const totalQuesAsked = 3;

  useEffect(() => {
    id ? getDataByDocId("userData", id) : "";
    getDataByQuesNum("quizQuestions", questionNumber);
  }, [questionNumber]);

  const handleClick = (index) => {
    question.option[index].isCorrect = true;
    setQuestions([...questions, question]);
    console.log(questions.length, totalQuesAsked);
    questions.length == totalQuesAsked
      ? write("userData", id, {
          id,
          name: user.name,
          questions,
          scores: [],
        })
      : "";
    questions.length == totalQuesAsked
      ? () => {
          router.replace(`/share-link/${id}`);
        }
      : "";
    setQuestionNumber(questionNumber + 1);
  };

  return (
    <>
      <Text>{question ? question.question : "loading"}</Text>
      <ul>
        {question
          ? question.option.map((chose, index) => (
              <li
                key={index}
                onClick={() =>
                  questions.length == totalQuesAsked - 1
                    ? router.replace(`/share-link/${id}`)
                    : ""
                }
              >
                <img src={chose.url} onClick={() => handleClick(index)} />
              </li>
            ))
          : "loading"}
      </ul>
    </>
  );
};

export default user;
