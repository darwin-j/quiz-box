import { useRouter } from "next/router";
import { useEffect, useContext, useState } from "react";
import { firebaseContext } from "../../firebase/context";
import { Button, Text, Input } from "@chakra-ui/react";

const frdsQuiz = () => {
  const router = useRouter();
  const id = router.query.uid;
  const { getDataByDocId, write, user } = useContext(firebaseContext);
  const [questionNumber, setQuestionNumber] = useState(0);
  const totalQues = 3;
  const [totalQuesAsked, setTotalQuesAsked] = useState(0);
  const [friendName, setFriendName] = useState();
  const [score, setScore] = useState(0);
  const [nameEntered, setNameEntered] = useState(false);

  const scoreObject = {
    name: friendName,
    score,
  };

  useEffect(() => {
    id ? getDataByDocId("userData", id) : "";
  }, [id]);
  console.log(user);

  const question = user ? user.questions[questionNumber] : "";

  const handleClick = (index) => {
    question.option[index].isCorrect == true ? setScore(score + 1) : "";
    totalQuesAsked == totalQues
      ? write("userData", id, { score: [scoreObject] }, { merge: true })
      : "";
    totalQuesAsked == totalQuesAsked
      ? () => {
          router.replace(`/share-link/${id}`);
        }
      : "";
    setQuestionNumber(questionNumber + 1);
    setTotalQuesAsked(totalQuesAsked + 1);
    console.log(score, totalQuesAsked, totalQues);
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
                      totalQuesAsked == totalQues - 1
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
