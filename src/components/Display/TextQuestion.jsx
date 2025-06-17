import { useState } from "react";
import Button from "./Button/Button";
import styles from "./TextQuestion.module.css";

export default function TextQuestion({ question, onSubmit }) {
  const [textAnswer, setTextAnswer] = useState("");

  const handleSubmit = () => {
    onSubmit(textAnswer); /* QuizPage側に回答を渡す */
    setTextAnswer(""); /* フォームをクリア */
  };

  return (
    <div>
      <p>{question.question}</p>
      <input
        type="text"
        className={styles.textInput}
        value={textAnswer}
        onChange={(e) => setTextAnswer(e.target.value)}
        placeholder="回答を入力してください"
      />
      <Button onClick={handleSubmit}>回答する</Button>
    </div>
  );
}
