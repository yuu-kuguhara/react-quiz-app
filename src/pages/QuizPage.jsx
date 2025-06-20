import Button from "../components/Button/Button";
import Display from "../components/Display/Display";
import quizData from "../data/quiz";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../const";
import { useEffect, useState } from "react";
import TextQuestion from "../components/TextQuestion/TextQuestion";

export default function QuizPage() {
  const [quizIndex, setQuizIndex] = useState(0);
  const [answerLogs, setAnswerLogs] = useState([]);
  const navigation = useNavigate();
  const MAX_QUIZ_LEN = quizData.length;

  // 4択問題のクリック処理
  const handleClick = (clickedIndex) => {
    // ユーザーの回答が正解かどうかをチェック
    if (clickedIndex === quizData[quizIndex].answerIndex) {
      // 配列にtrueを追加
      setAnswerLogs((prev) => [...prev, true]); /* ...→スプレッド構文 */
    } else {
      setAnswerLogs((prev) => [...prev, false]);
    }
    // quizIndexを引数として受け取る(Stateの値を取得)
    // 下記のコードを関数型更新と呼ぶ
    setQuizIndex((prev) => prev + 1); /* prev→previous(前の) */
  };

  // 記述式問題の解答送信処理
  const handleTextSubmit = (input) => {
    const correctAnswers = quizData[quizIndex].answerText.map((ans) =>
      ans.trim().toLowerCase()
    );
    const userAnswer = input.trim().toLowerCase();

    if (correctAnswers.includes(userAnswer)) {
      setAnswerLogs((prev) => [...prev, true]);
    } else {
      setAnswerLogs((prev) => [...prev, false]);
    }
    setQuizIndex((prev) => prev + 1);
  };

  // 問題の総数と正解数を表示
  useEffect(() => {
    if (answerLogs.length === MAX_QUIZ_LEN) {
      // 何問正解したのかを表示
      const correctNum = answerLogs.filter((answer) => answer === true);
      navigation(ROUTES.RESULT, {
        state: {
          maxQuizLen: MAX_QUIZ_LEN,
          correctNumLen: correctNum.length,
        },
      });
    }
  }, [answerLogs, MAX_QUIZ_LEN, navigation]);

  return (
    <>
      {quizData[quizIndex] && (
        <Display>{`Q${quizIndex + 1}. ${
          quizData[quizIndex].question
        }`}</Display>
      )}
      <br />
      {quizData[quizIndex] &&
        (quizData[quizIndex].options ? (
          quizData[quizIndex].options.map((option, index) => (
            <Button key={`option-${index}`} onClick={() => handleClick(index)}>
              {option}
            </Button>
          ))
        ) : (
          <TextQuestion
            onSubmit={handleTextSubmit}
            question={quizData[quizIndex]}
          />
        ))}
    </>
  );
}
