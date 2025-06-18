import { useState } from "react";
import Button from "../Button/Button";
import styles from "./TextQuestion.module.css";

export default function TextQuestion({ onSubmit }) {
  const [textAnswer, setTextAnswer] = useState("");

  const handleSubmit = () => {
    onSubmit(textAnswer); /* QuizPage側に回答を渡す */
    setTextAnswer(""); /* フォームをクリア */
  };

  return (
    <div>
      <input
        type="text"
        className={styles.textInput}
        value={textAnswer}
        /* onChange=...→input要素のイベントハンドラ属性、ユーザーが入力欄に何か入力した時に発火 */
        onChange={(e) => setTextAnswer(e.target.value)} /* e.target.value→input要素に今入力されている現在の文字列 */
        placeholder="回答を入力してください"
      />
      <Button onClick={handleSubmit}>回答する</Button>
    </div>
  );
}
