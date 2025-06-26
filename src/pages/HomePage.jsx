import { Link } from "react-router-dom";
import { ROUTES } from "../const";
import Button from "../components/Button/Button";

export default function HomePage() {
  return (
    <>
      <h1>Ghibli Quiz</h1>
      <Link to={ROUTES.QUIZ}>
        <Button>Start!</Button>
      </Link>
    </>
  );
}
