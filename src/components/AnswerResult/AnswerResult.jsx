import styles from "./AnswerResult.module.css";

export default function AnswerResult({ isCorrect, correctAnswer }) {
  return (
    <div className={styles.resultContainer}>
      {isCorrect ? (
        <p className={styles.correct}>✅ 正解です！</p>
      ) : (
        <div className={styles.incorrect}>
          ❌ 不正解です！正解は：
          {Array.isArray(correctAnswer) ? (
            <ul>
              {correctAnswer.map((answer, index) => (
                <p key={index}>{answer}</p>
              ))}
            </ul>
          ) : (
            <p>{correctAnswer}</p>
          )}
        </div>
      )}
    </div>
  );
}
