import { Link } from "react-router-dom";

const BackToHome = () => {
  return (
    <Link to="/">
      <h1 className="mb-4 text-black">Back to home</h1>
    </Link>
  );
};

export default BackToHome;
