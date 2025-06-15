import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../const";
import Result from "../components/Result/Result";
import Loading from "../components/Loading/Loading";
import { useEffect, useState } from "react";

export default function ResultPage() {
  const [active, setActive] = useState(false);
  // データの受け取りと表示
  const location = useLocation();
  const maxQuizLen = location.state.maxQuizLen;
  const correctNumLen = location.state.correctNumLen;

  // 時間をずらして実行
  useEffect(() => {
    setTimeout(() => setActive(true), 3000);
  }, []); /* []→ページがローディングされた最初にだけ実行 */

  return (
    <>
      <Loading active={active}/>
      <h1>Result</h1>
      <Result maxQuizLen={maxQuizLen} correctNumLen={correctNumLen} />
      <br />
      <Link to={ROUTES.HOME}>もう一度チャレンジ！</Link>
    </>
  );
}



