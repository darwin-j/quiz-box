import { useRouter } from "next/router";
import { useEffect, useContext, useState } from "react";
import { firebaseContext } from "../../firebase/context";
import { Button, Text, Input } from "@chakra-ui/react";

const frdsQuiz = () => {
  const router = useRouter();
  const id = router.query.uid;
  const [questions, setQuestions] = useState([]);
  const { getDataByQuesNum, getDataByDocId, question, write, user } =
    useContext(firebaseContext);
  const [questionNumber, setQuestionNumber] = useState(0);
  const totalQuesAsked = 3;

  const [friendName, setFriendName] = useState();
  const [score, setScore] = useState();
  const [nameEntered, setNameEntered] = useState(false);

  const scoreObject = {
    name: friendName,
    score,
  };

  useEffect(() => {
    id ? getDataByDocId("userData", id) : "";
    getDataByQuesNum("quizQuestions", questionNumber);
  }, [questionNumber]);

  const handleClick = (index) => {
    question.option[index].isCorrect == true ? score++ : "";
    questions.length == totalQuesAsked ? write("userData", id) : "";
    questions.length == totalQuesAsked
      ? () => {
          router.replace(`/share-link/${id}`);
        }
      : "";
    setQuestionNumber(questionNumber + 1);
  };
  return (
    <>
      {nameEntered ? (
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
      ) : (
        <>
          <Input
            placeholder="Enter Your Name"
            onChange={(e) => setFriendName(e.target.value)}
          />
          <Button onClick={() => setNameEntered(true)}>Submit</Button>
        </>
      )}
    </>
  );
};

export default frdsQuiz;
