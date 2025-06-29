import Button from "../components/Button/Button";
import Display from "../components/Display/Display";
import quizData from "../data/quiz";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../const";
import { useEffect, useState } from "react";
import TextQuestion from "../components/TextQuestion/TextQuestion";
import { getLevelLabel } from "../data/quizLevel";
import AnswerResult from "../components/AnswerResult/AnswerResult";

export default function QuizPage() {
  const [quizIndex, setQuizIndex] =
    useState(0); /* quizIndex=問題(0番目なら1問目) */
  const [answerLogs, setAnswerLogs] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(
    getLevelLabel(quizIndex)
  ); /* useState(...) の初期値として現在のレベルを取得 */
  const [isCorrect, setIsCorrect] = useState(null); //正誤判定
  const [showResult, setShowResult] = useState(false); //結果表示フラグ
  const navigation = useNavigate();
  const MAX_QUIZ_LEN = quizData.length;
  const level = getLevelLabel(quizIndex);

  // 4択問題のクリック処理
  const handleClick = (clickedIndex) => {
    if (showResult) return; //既に解答済みなら何もしない
    // 正誤判定ロジック
    const correctIndex = quizData[quizIndex].answerIndex;
    const isAnswerCorrect =
      clickedIndex ===
      correctIndex; /* ユーザーが選択したインデックスと正解のインデックスを比較 */

    setIsCorrect(isAnswerCorrect);
    setShowResult(true); /* 結果表示フラグをtrueにする */

    setAnswerLogs((prev) => [
      ...prev,
      isAnswerCorrect,
    ]); /* prev→previous(前の) */
  };

  // 記述式問題の解答送信処理
  const handleTextSubmit = (input) => {
    if (showResult) return;
    const correctAnswers = quizData[quizIndex].answerText.map((ans) =>
      ans.trim()
    );
    const userAnswer = input.trim();

    const isAnswerCorrect =
      correctAnswers.includes(
        userAnswer
      ); /* ユーザーの入力が正解の配列に含まれているかを判定 */
    setIsCorrect(isAnswerCorrect); /* 正誤判定を更新 */
    setShowResult(true);

    setAnswerLogs((prev) => [...prev, isAnswerCorrect]);
  };

  // 次の問題へ進む処理
  const goNext = () => {
    setIsCorrect(null); // 正誤判定をリセット
    setShowResult(false); // 結果表示フラグをリセット
    setQuizIndex((prev) => prev + 1); /* quizIndexを1つ進める */
  };

  // レベル変更時の通知ロジック
  useEffect(() => {
    if (quizIndex >= MAX_QUIZ_LEN) {
      return; // すべての問題が終了した場合は何もしない
    }
    const newLevel = getLevelLabel(quizIndex);
    if (newLevel !== currentLevel) {
      alert(`レベルが「${newLevel}」に上がりました！`);
      setCurrentLevel(newLevel);
    }
  }, [quizIndex, currentLevel, MAX_QUIZ_LEN]);

  // 問題の総数と正解数を表示
  useEffect(() => {
    if (answerLogs.length === MAX_QUIZ_LEN) {
      // 何問正解したのかを表示
      const correctNum = answerLogs.filter((answer) => answer === true);

      // 数秒待ってから結果ページに遷移
      const timer = setTimeout(() => {
        navigation(ROUTES.RESULT, {
          state: {
            maxQuizLen: MAX_QUIZ_LEN,
            correctNumLen: correctNum.length,
          },
        });
      }, 5000);

      // クリーンアップ
      return () => clearTimeout(timer);
    }
  }, [answerLogs, MAX_QUIZ_LEN, navigation]);

  return (
    <>
      <h2>レベル: {level}</h2>
      {quizData[quizIndex] /* &&→条件がtrueの時だけ描画する */ && (
        <Display>{`Q${quizIndex + 1}. ${
          quizData[quizIndex].question
        }`}</Display>
      )}
      <br />
      {quizData[quizIndex] &&
        (quizData[quizIndex].options /* 条件 ? 真のときの値 : 偽の時の値 */ ? (
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

      {showResult && (
        <AnswerResult
          isCorrect={isCorrect}
          correctAnswer={
            quizData[quizIndex].answerText ||
            quizData[quizIndex].options[quizData[quizIndex].answerIndex]
          }
        />
      )}
      {/* 10問目の時のみボタンを非表示 */}
      {quizIndex < MAX_QUIZ_LEN - 1 && showResult && (
        <Button onClick={goNext}>次の問題へ</Button>
      )}
    </>
  );
}
